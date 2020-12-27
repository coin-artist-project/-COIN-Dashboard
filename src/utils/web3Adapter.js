import farmList from "../data/nftFarms.js";
const Web3 = require('web3');
const oldUniABI = require("./oldUniABI.js");
const uniABI = require("./uniABI.js");
const erc20ABI = require("./erc20ABI.js");
const shardGovernorABI = require('./shardGovernorABI.js');

class Web3Adapter {
  constructor(provider, cb) {
    this.cb = cb;
    this.provider = provider
    this.web3 = false;
    this.BN = false;

    // ABIs
    this.oldUniABI = oldUniABI;
    this.uniABI = uniABI;
    this.erc20ABI = erc20ABI;
    this.shardGovernorABI = shardGovernorABI;

    // contract addresses
    this.unipool = false
    this.lp = false;
    this.coin = false;
    this.cred = false;

    // token info
    this.balances = {}
    this.rewards = false;
    this.cred_rewards = false;
    this.stats = {}

    // account info
    this.accounts = false;
    this.selectedAddress = false;
  }

  setupContractAddresses = () => {
    if (window && window.ethereum && window.ethereum.networkVersion == "1") {
      this.mainnet = true;
      this.oldUnipoolAddr = "0xBDaAa340C4472aaEACE8032dDB261f1856022DE2"
      this.unipoolAddr = "0x7b96f4A90A85e95cE1d91B038bB963B80a9140bC"
      this.lpAddr = "0xcce852e473ecfdebfd6d3fd5bae9e964fd2a3fa7"
      this.coinAddr = "0x87b008e57f640d94ee44fd893f0323af933f9195"
      this.credAddr = "0xED7Fa212E100DFb3b13B834233E4B680332a3420"
    }
    else {
      this.mainnet = false;
      this.oldUnipoolAddr = "0x4A687f5C29A33998815481292Ee40b8d985DdB12"
      this.unipoolAddr = "0xCA1433b225b4D7c226Dd351e74F23DD53df393CE"
      this.lpAddr = "0xB56A869b307d288c3E40B65e2f77038F3579F868"
      this.coinAddr = "0x81F63d3768A85Be640E1ee902Ffeb1484bC255aD"
      this.credAddr = "0x974C482c2B31e21B9b4A2EE77D51A525485F2dDc"
    }
  }
  async init() {
    this.cb.call(this, "wait", "Initializing Ethereum Network")
    try {
      this.web3 = new Web3(this.provider);

      // Make sure contracts are set up before init'ing
      if (!window || !window.ethereum) {
        throw "No web3 detected"
      }
      this.setupContractAddresses();

      // Init all contracts
      this.oldUnipool = new this.web3.eth.Contract(this.oldUniABI, this.oldUnipoolAddr);
      this.unipool = new this.web3.eth.Contract(this.uniABI, this.unipoolAddr);
      this.lp = new this.web3.eth.Contract(this.erc20ABI, this.lpAddr);
      this.coin = new this.web3.eth.Contract(this.erc20ABI, this.coinAddr);
      this.cred = new this.web3.eth.Contract(this.erc20ABI, this.credAddr);

      for (let farmId in farmList) {
        this[farmId] = new this.web3.eth.Contract(this.erc20ABI, farmList[farmId]["tokenContract"][this.mainnet ? "mainnet" : "rinkeby"]);
        this[farmId + "-UNI"] = new this.web3.eth.Contract(this.uniABI, farmList[farmId]["farmContract"][this.mainnet ? "mainnet" : "rinkeby"])
        this[farmId + "-SHARD"] = new this.web3.eth.Contract(this.erc20ABI, farmList[farmId]["shardContract"][this.mainnet ? "mainnet" : "rinkeby"])
        this[farmId + "-SHARD-GOV"] = new this.web3.eth.Contract(this.shardGovernorABI, farmList[farmId]["shardGovernor"]);
        this[farmId + "-ISROLL"] = farmList[farmId]["isRoll"];
      }
      //BN
      this.BN = this.web3.utils.BN;

      // Get address, balances, and load the page
      this.accounts = await this.web3.eth.getAccounts();
      this.selectedAddress = this.accounts[0];
      await this.getBalances();
      this.cb.call(this, "success")
    }
    catch (ex) {
      this.cb.call(this, "error", String(ex));
    }
  }

  // LP to pool
  async stake(amount) {
    this.cb.call(this, "wait", "Staking...")
    try {
      // Get allowance to see if approved, convert to ether denomination
      let allowance = await this.lp.methods.allowance(this.selectedAddress, this.unipoolAddr).call({ from: this.selectedAddress });
      allowance = await this.web3.utils.fromWei(String(allowance), "ether");

      // Convert both to comparable types
      let amountBn = new this.BN(amount);
      let allowanceBn = new this.BN(allowance)

      // If allowance is below amount to stake, approve
      if (allowanceBn.lt(amountBn)) {
        this.cb.call(this, "wait", "Approving...")
        await this.approval();
        this.cb.call(this, "wait", "Staking...")
      }

      // If amount to stake is less than LP, warn balance is too low
      // NOTE - comparing ether denomination in both cases
      if (amountBn.lt(String(this.balances["lp"]))) {
        this.cb.call(this, "error", String("Your available LP token balance is too low."))
        return;
      }

      let weiAmount = await this.web3.utils.toWei(String(amount), "ether");
      await this.unipool.methods.stake(String(weiAmount)).send({ from: this.selectedAddress });

      await this.getBalances();

      this.cb.call(this, "success")
    }
    catch (ex) {
      this.cb.call(this, "error", String("Could not stake"))
    }
  }

  async approval() {
    try {
      let maxApproval = "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      await this.lp.methods.approve(this.unipoolAddr, maxApproval).send({ from: this.selectedAddress });
    }
    catch (ex) {
      throw String(ex)
    }
  }

  // withdraw some stake
  async withdraw(amount) {
    // TODO: validate int
    // TODO: amount < stake amount
    this.cb.call(this, "wait", "Withdrawing " + amount + " stake")
    try {
      await this.unipool.methods.withdraw(amount).call({ from: this.selectedAddress });
      this.cb.call(this, "success")
    }
    catch (ex) {
      this.cb.call(this, "error", String("Could not withdraw stake"))
    }
  }

  // withdraw all + rewards
  async exit() {
    this.cb.call(this, "wait", "Collecting all stake + rewards")
    try {
      await this.unipool.methods.exit().send({ from: this.selectedAddress });
      await this.getBalances();
      this.cb.call(this, "success")
    }
    catch (ex) {
      this.cb.call(this, "error", String("Could not exit!"))
    }
  }

  // withdraw all + rewards from prior CALM farm
  async exitOld() {
    this.cb.call(this, "wait", "Collecting all stake + rewards")
    try {
      await this.unipool.methods.exit().send({ from: this.selectedAddress });
      await this.getBalances();
      this.cb.call(this, "success")
    }
    catch (ex) {
      this.cb.call(this, "error", String("Could not exit!"))
    }
  }

  // get rewards
  async collectReward(amount) {
    this.cb.call(this, "wait", "Collecting rewards")
    try {
      await this.unipool.methods.getReward().send({ from: this.selectedAddress });
      await this.update()
      this.cb.call(this, "wait", "Updating balances")
      await this.getBalances();
      this.cb.call(this, "success")
    }
    catch (ex) {
      this.cb.call(this, "error", String("Could not get reward"))
    }
  }

  // view rewards earned
  async getEarned() {
    try {
      let rewards = await this.unipool.methods.earned(this.selectedAddress).call();
      this.rewards = await this.web3.utils.fromWei(rewards, "ether").toString()

      let cred_rewards = await this.unipool.methods.cred_earned(this.selectedAddress).call();
      this.cred_rewards = await this.web3.utils.fromWei(cred_rewards, "ether").toString()
    }
    catch (ex) {
      this.cb.call(this, "error", String("Could not find reward"))
    }
  }

  promisifyWeb3Call(callObj) {
    return new Promise(resolve => {
      callObj.call().then(res => {
        resolve({res, status: 'ok', farm: callObj.farm, index: callObj.index});
      }).catch(err => {
        resolve({status: 'error', farm: callObj.farm, index: callObj.index});
      });
    });
  }

  promisifyMultipleWeb3Calls(calls) {
    return Promise.all(calls.map(this.promisifyWeb3Call.bind(this)));
  }

  // view staked
  async getBalances() {
    try {
      let calls = [
        {call: this.lp.methods.balanceOf(this.selectedAddress).call.bind(this),         index: 'lp'},
        {call: this.coin.methods.balanceOf(this.selectedAddress).call.bind(this),       index: 'coin'},
        {call: this.unipool.methods.balanceOf(this.selectedAddress).call.bind(this),    index: 'uni'},
        {call: this.oldUnipool.methods.balanceOf(this.selectedAddress).call.bind(this), index: 'old-uni'},
        {call: this.cred.methods.balanceOf(this.selectedAddress).call.bind(this),       index: 'cred'}
      ];

      for (let farmId in farmList) {
        if (farmId.indexOf('coin-') === -1 && farmId.indexOf('cred-') === -1) {
          calls.push(
            {call: this[farmId].methods.balanceOf(this.selectedAddress).call.bind(this), farm: farmId, index: farmId}
          );
        }

        calls.push(
          {call: this[farmId + "-UNI"].methods.balanceOf(this.selectedAddress).call.bind(this),   farm: farmId, index: farmId + "-UNI"},
          {call: this[farmId + "-SHARD"].methods.balanceOf(this.selectedAddress).call.bind(this), farm: farmId, index: farmId + "-SHARD"}
        );
      }

      let results = await this.promisifyMultipleWeb3Calls(calls);

      // Pull the coin & cred balances out
      let coinBal = this.getResultByIndex(results, 'coin');
      let credBal = this.getResultByIndex(results, 'cred');

      // Set all balances
      for (let result of results) {
        let value = 0;

        if (result.status === 'ok') {
          if (!result.farm) {
            value = this.web3.utils.fromWei(String(result.res), "ether");
          } else if (result.farm) {
            // Append the coin / cred balances
            if (result.farm.indexOf('coin-') !== -1) {
              this.balances[result.farm] = this.web3.utils.fromWei(String(coinBal), "ether");
            } else if (result.farm.indexOf('cred-') !== -1) {
              this.balances[result.farm] = this.web3.utils.fromWei(String(credBal), "ether");
            }

            if (result.index.indexOf('-UNI') !== -1 || result.index === result.farm) {
              value = this[result.farm + "-ISROLL"] ? result.res / 10000 : this.web3.utils.fromWei(String(result.res), "ether");
            } else {
              value = this.web3.utils.fromWei(String(result.res), "ether");
            }
          }
        }

        this.balances[result.index] = value;
      }

      //console.log("balances:", this.balances);

      await this.getEarnedFarms();
      await this.getStats();
      await this.getStatsFarm();
      if (this.balances['uni'] && this.balances['uni'] > 0) {
        await this.getEarned();
      }
    }
    catch (ex) {
      this.cb.call(this, "error", String("Could not get balances"));
    }
  }

  // view rewards earned
  async getEarnedFarms() {
    try {
      let calls = [];

      for (let farm in farmList) {
        calls.push({call : this[farm + "-UNI"].methods.earned(this.selectedAddress).call.bind(this), farm, index: farm + "-rewards"})
      }

      let results = await this.promisifyMultipleWeb3Calls(calls);

      for (let result of results) {
        let value = 0;

        if (result.status === 'ok') {
          if (!result.farm) {
            value = this.web3.utils.fromWei(String(result.res), "ether").toString();
          } else if (result.farm) {
            value = this.web3.utils.fromWei(String(result.res), "ether").toString();
          }
        }

        this[result.index] = value;
        //console.log(`${result.index}: ${value}`);
      }
    }
    catch (ex) {
      this.cb.call(this, "error", String("Could not find reward"))
    }
  }

  async getStats() {
    try {
      let calls = [
        {call : this.lp.methods.totalSupply().call.bind(this),               index: 'supply'},
        {call : this.lp.methods.balanceOf(this.unipoolAddr).call.bind(this), index: 'staked'},
        {call : this.unipool.methods.totalSupply().call.bind(this),          index: 'uniSupply'}
      ];

      let results = await this.promisifyMultipleWeb3Calls(calls);

      let supply = this.getResultByIndex(results, 'supply');
      let staked = this.getResultByIndex(results, 'staked');
      let uniSupply = this.getResultByIndex(results, 'uniSupply');

      let lpStaked = (staked / supply) * 100
      this.stats["totalStaked"] = ((Math.floor(parseFloat(lpStaked.toString()) * 1000000)) / 1000000).toFixed(6)
      let userStaked = (await this.web3.utils.toWei(this.balances["uni"]) / uniSupply) * 100
      this.stats["userStaked"] = ((Math.floor(parseFloat(userStaked.toString()) * 1000000)) / 1000000).toFixed(6)
      let earnRate = userStaked * (10000 / 30) / 100;
      this.stats["earnRate"] = (Math.floor(earnRate * 1000000) / 1000000).toFixed(6);
    }
    catch (ex) {
      this.cb.call(this, "error", String("Could not get stats"));
    }
  }

  async getStatsFarm() {
    try {
      let calls = [];

      for (let farm in farmList) {
        let farmContractAddr = farmList[farm]["farmContract"][this.mainnet ? "mainnet" : "rinkeby"];
        calls.push(
          {call : this[farm].methods.totalSupply().call.bind(this),               farm, index: farm + '-supply'},
          {call : this[farm].methods.balanceOf(farmContractAddr).call.bind(this), farm, index: farm + '-staked'},
          {call : this[farm + "-UNI"].methods.totalSupply().call.bind(this),      farm, index: farm + '-uniSupply'},
          {call : this[farm + "-UNI"].methods.periodFinish().call.bind(this),     farm, index: farm + '-periodFinish'}
        );
      }

      let results = await this.promisifyMultipleWeb3Calls(calls);

      for (let farm in farmList) {
        let supply = this.getResultByIndex(results, farm + '-supply');
        let staked = this.getResultByIndex(results, farm + '-staked');
        let uniSupply = this.getResultByIndex(results, farm + '-uniSupply');
        let periodFinish = this.getResultByIndex(results, farm + '-periodFinish');

        let lpStaked = (staked / supply) * 100;
        this.stats[farm + "-totalStaked"] = ((Math.floor(parseFloat(lpStaked.toString()) * 1000000)) / 1000000).toFixed(6)
        let userStaked = ( ((this[farm + "-ISROLL"]) ? this.balances[farm + "-UNI"] * 10000 : await this.web3.utils.toWei(this.balances[farm + "-UNI"])) / uniSupply) * 100
        this.stats[farm + "-userStaked"] = ((Math.floor(parseFloat(userStaked.toString()) * 1000000)) / 1000000).toFixed(6)
        let earnRate = userStaked * (10000 / 30) / 100;
        this.stats[farm + "-earnRate"] = (Math.floor(earnRate * 1000000) / 1000000).toFixed(6);
        this.stats[farm + "-fishTime"] = periodFinish;

        //console.log(this.stats[farm + "-totalStaked"], this.stats[farm + "-userStaked"], this.stats[farm + "-earnRate"], this.stats[farm + "-fishTime"]);
      }
    }
    catch (ex) {
      this.cb.call(this, "error", String("Could not get farm stats"));
    }
  }

  getResultByIndex(results, index) {
    return results.reduce((acc, cur) => { if (cur.index === index) return cur.res; return (typeof acc === 'object' ? acc.res : acc); });
  }

  async update() {
    this.cb.call(this, "wait", "Updating...")
    try {
      await this.getBalances();
    }
    catch (ex) {
      this.cb.call(this, "error", String("Could not update"))
    }
    this.cb.call(this, "success")
  }

  /*
  / WET
  */

  // withdraw some stake
  async withdrawFarm(amount, farm) {
    this.cb.call(this, "wait", "Withdrawing " + amount + " stake")
    try {
      await this[farm + "-UNI"].methods.withdraw(amount).call({ from: this.selectedAddress });
      this.cb.call(this, "success")
    }
    catch (ex) {
      this.cb.call(this, "error", String("Could not withdraw stake"))
    }
  }

  // withdraw all + rewards
  async exitFarm(farm) {
    this.cb.call(this, "wait", "Collecting all stake + rewards")
    try {
      await this[farm + "-UNI"].methods.exit().send({ from: this.selectedAddress });
      await this.update()
      this.cb.call(this, "wait", "Updating balances")
      await this.getBalances();
      this.cb.call(this, "success")
    }
    catch (ex) {
      this.cb.call(this, "error", String("Could not exit!"))
    }
  }

  async stakeFarm(amount, farm) {
    this.cb.call(this, "wait", "Staking...")
    try {
      // Get allowance to see if approved, convert to ether denomination
      let allowance = await this[farm].methods.allowance(this.selectedAddress, farmList[farm]["farmContract"][this.mainnet ? "mainnet" : "rinkeby"]).call({ from: this.selectedAddress });
      allowance = await this.web3.utils.fromWei(String(allowance), "ether");
      // Convert both to comparable types
      let amountBn = new this.BN(amount);
      let allowanceBn = new this.BN(allowance)

      // If allowance is below amount to stake, approve
      if (allowanceBn.lt(amountBn)) {
        this.cb.call(this, "wait", "Approving...")
        await this.approvalFarm(farm);
        this.cb.call(this, "wait", "Staking...")
      }

      // If amount to stake is less than LP, warn balance is too low
      // NOTE - comparing ether denomination in both cases
      if (amountBn.lt(String(this.balances[farm]))) {
        this.cb.call(this, "error", String("Your available LP token balance is too low."))
        return;
      }

      let weiAmount = (this[farm + '-ISROLL']) ? amount * 10000 : await this.web3.utils.toWei(String(amount), "ether");
      await this[farm + "-UNI"].methods.stake(String(weiAmount)).send({ from: this.selectedAddress });

      await this.getBalances();

      this.cb.call(this, "success")
    }
    catch (ex) {
      console.log(ex)
      this.cb.call(this, "error", String("Could not stake"))
    }
  }

  async approvalFarm(farm) {
    try {
      let maxApproval = "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      await this[farm].methods.approve(farmList[farm]["farmContract"][this.mainnet ? "mainnet" : "rinkeby"], maxApproval).send({ from: this.selectedAddress });
    }
    catch (ex) {
      throw String(ex)
    }
  }

  // get rewards
  async collectRewardFarm(farm) {
    this.cb.call(this, "wait", "Collecting rewards")
    try {
      await this[farm + "-UNI"].methods.getReward().send({ from: this.selectedAddress });
      await this.update()
      this.cb.call(this, "wait", "Updating balances")
      await this.getBalances();
      this.cb.call(this, "success")
    }
    catch (ex) {
      this.cb.call(this, "error", String("Could not get reward"))
    }
  }

  async getBuyoutDetails(farmId) {
    if (this[farmId + "-SHARD"] && this[farmId + "-SHARD-GOV"] && this[farmId + "-SHARD"].methods && this[farmId + "-SHARD-GOV"].methods) {
      let disabled = await this[farmId + "-SHARD"].methods.shotgunDisabled().call();
      let available = await this[farmId + "-SHARD-GOV"].methods.checkShotgunState().call();

      return {
        enabled : !disabled,
        active : !available
      };
    }

    return false;
  }

}
export default Web3Adapter;
