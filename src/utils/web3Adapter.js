const Web3 = require('web3');
const uniABI = require("./uniABI.js");
const erc20ABI = require("./erc20ABI.js")

let unipoolAddr, coinAddr, lpAddr, credAddr;
if (window.ethereum.networkVersion == "1") {
  unipoolAddr = "0xBDaAa340C4472aaEACE8032dDB261f1856022DE2"
  lpAddr = "0xcce852e473ecfdebfd6d3fd5bae9e964fd2a3fa7"
  coinAddr = "0x87b008e57f640d94ee44fd893f0323af933f9195"
  credAddr = "0xED7Fa212E100DFb3b13B834233E4B680332a3420"
}
else {
  unipoolAddr = "0x4A687f5C29A33998815481292Ee40b8d985DdB12"
  lpAddr = "0xB56A869b307d288c3E40B65e2f77038F3579F868"
  coinAddr = "0x81F63d3768A85Be640E1ee902Ffeb1484bC255aD"
  credAddr = "0x974C482c2B31e21B9b4A2EE77D51A525485F2dDc"
}
class Web3Adapter {
  constructor(provider, cb) {
    this.cb = cb;
    this.provider = provider
    this.web3 = false;
    this.BN = false;

    // ABIs
    this.uniABI = uniABI;
    this.erc20ABI = erc20ABI;

    // contract addresses
    this.unipool = false
    this.lp = false;
    this.coin = false;
    this.cred = false;

    // token info
    this.balances = {}
    this.rewards = false;

    // account info
    this.accounts = false;
    this.selectedAddress = false;
  }

  async init() {
    this.cb.call(this, "wait", "Initializing Ethereum Network")
    try {
      this.web3 = new Web3(this.provider);
      this.unipool = new this.web3.eth.Contract(this.uniABI, unipoolAddr);
      this.lp = new this.web3.eth.Contract(this.erc20ABI, lpAddr);
      this.coin = new this.web3.eth.Contract(this.erc20ABI, coinAddr);
      this.cred = new this.web3.eth.Contract(this.erc20ABI, credAddr);
      this.accounts = await this.web3.eth.getAccounts();
      this.selectedAddress = this.accounts[0];
      await this.getBalances();
      this.BN = this.web3.utils.BN;
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
      let weiAmount = await this.web3.utils.toWei(String(amount), "ether");
      let allowance = await this.lp.methods.allowance(this.selectedAddress, unipoolAddr).call({ from: this.selectedAddress });
      allowance = await this.web3.utils.toWei(String(allowance), "ether");
      let amt = new this.BN(weiAmount)
      if (amt.lt(allowance)) {
        this.cb.call(this, "wait", "Approving...")
        await this.approval();
        this.cb.call(this, "wait", "Staking...")
      }
      if (amt.lt(String(this.balances["lp"]))) {
        throw "Balance too low";
      }
      console.log(weiAmount)
      await this.unipool.methods.stake(String(weiAmount)).send({ from: this.selectedAddress });
      await this.getBalances();
      await this.getEarned();
      this.cb.call(this, "success")
    }
    catch (ex) {
      console.log(ex)
      this.cb.call(this, "error", String("Could not stake"))
    }
  }

  async approval() {
    try {
      let maxApproval = "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      await this.lp.methods.approve(unipoolAddr, maxApproval).send({ from: this.selectedAddress });
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
      await this.getEarned();
      this.cb.call(this, "success")
    }
    catch (ex) {
      console.log(ex)
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
      await this.getEarned();
      this.cb.call(this, "success")
    }
    catch (ex) {
      this.cb.call(this, "error", String("Could not get reward"))
    }
  }

  // view rewards earned
  async getEarned() {
    try {
      let rewards = await this.unipool.methods.earned(this.selectedAddress).call({ from: this.selectedAddress });
      this.rewards = await this.web3.utils.fromWei(rewards, "ether").toString()
      console.log(this.rewards)
    }
    catch (ex) {
      this.cb.call(this, "error", String("Could not find reward"))
    }
  }

  // view staked
  async getBalances() {
    try {
      let lp = await this.lp.methods.balanceOf(this.selectedAddress).call({ from: this.selectedAddress });
      this.balances["lp"] = await this.web3.utils.fromWei(String(lp), "ether")
      let coin = await this.coin.methods.balanceOf(this.selectedAddress).call({ from: this.selectedAddress });
      this.balances["coin"] = await this.web3.utils.fromWei(String(coin), "ether")
      let uni = await this.unipool.methods.balanceOf(this.selectedAddress).call({ from: this.selectedAddress });
      this.balances["uni"] = await this.web3.utils.fromWei(String(uni), "ether")
      let cred = await this.cred.methods.balanceOf(this.selectedAddress).call({ from: this.selectedAddress });
      this.balances["cred"] = await this.web3.utils.fromWei(String(cred), "ether")
      await this.getEarned()
    }
    catch (ex) {
      console.log(ex)
      this.cb.call(this, "error", String("Could not get balances"))
    }
  }

  async update() {
    this.cb.call(this, "wait", "Updating balances")
    try {
      await this.getBalances();
      await this.getEarned();
    }
    catch (ex) {
      this.cb.call(this, "error", String("Could not update"))
    }
    this.cb.call(this, "success")
  }
}
export default Web3Adapter;