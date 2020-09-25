const Web3 = require('web3');
const uniABI = require("./uniABI.js");
const erc20ABI = require("./erc20ABI.js")

let unipool, coin, lp, provider
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // REMOVING AFTER UPLOAD
  //provider = "https://rinkeby.infura.io/v3/abf9bb91d63b48df90beaf8a6dc11915"
  //
  unipool = "0xf4767Bac9f63e2a8490E91e8b9ed46f1e83c7f78"
  lp = "0x81F63d3768A85Be640E1ee902Ffeb1484bC255aD"
  coin = "0x81F63d3768A85Be640E1ee902Ffeb1484bC255aD"
}
else {
  // mainnet contracts here
}
class Web3Adapter {
  constructor(provider, cb) {
    this.cb = cb;
    this.provider = provider
    this.web3 = false;

    // ABIs
    this.uniABI = uniABI;
    this.erc20ABI = erc20ABI;

    // contract addresses
    this.unipool = false
    this.lp = false;
    this.coin = false;

    // token info
    this.balances = {"coin": false, "lp": false, "unipool": false}
    this.rewards = false;

    // account info
    this.accounts = false;
    this.selectedAddress = false;
  }

  async init() {
    this.cb.call(this, "wait", "Initializing Ethereum Network")
    try {
      this.web3 = new Web3(this.provider);
      this.unipool = new this.web3.eth.Contract(this.uniABI, unipool);
      this.lp = new this.web3.eth.Contract(this.erc20ABI, lp);
      this.coin = new this.web3.eth.Contract(this.erc20ABI, coin);

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
      let collect = await this.unipool.methods.getReward(this.selectedAddress).call({from: this.selectedAccount});
      this.cb.call(this, "success")
    }
    catch(ex) {
      this.cb.call(this, "error", String("Could not stake"))
    }
  }

  // withdraw some stake
  async withdraw(amount) {
    // TODO: validate int
    // TODO: amount < stake amount
    this.cb.call(this, "wait", "Withdrawing " + amount + " stake")
    try {
      let collect = await this.unipool.methods.getReward(this.selectedAddress).call({from: this.selectedAccount});
      this.cb.call(this, "success")
    }
    catch(ex) {
      this.cb.call(this, "error", String("Could not withdraw stake"))
    }
  }

  // withdraw all + rewards
  async exit() {
    this.cb.call(this, "wait", "Collecting all stake + rewards")
    try {
      let exit = await this.unipool.methods.getReward(this.selectedAddress).call({from: this.selectedAccount});
      this.cb.call(this, "success")
    }
    catch(ex) {
      this.cb.call(this, "error", String("Could exit staking"))
    }
  }

  // get rewards
  async collectReward() {
    this.cb.call(this, "wait", "Collecting rewards")
    try {
      let collect = await this.unipool.methods.getReward(this.selectedAddress).call({from: this.selectedAccount});
      this.cb.call(this, "success")
    }
    catch(ex) {
      this.cb.call(this, "error", String("Could not get reward"))
    }
  }

  // view rewards earned
  async getReward() {
    try {
      this.reward = await this.unipool.methods.earned(this.selectedAddress).call({from: this.selectedAccount});
    }
    catch(ex) {
      this.cb.call(this, "error", String("Could not find reward"))
    }
  }

  // view staked
  async getBalances() {
    try {
      let lp = await this.lp.methods.balanceOf(this.selectedAddress).call({from: this.selectedAccount});
      this.balances["lp"] = lp
      let coin = await this.coin.methods.balanceOf(this.selectedAddress).call({from: this.selectedAccount});
      this.balances["coin"] = coin
      let uni = await this.unipool.methods.balanceOf(this.selectedAddress).call({from: this.selectedAccount});
      this.balances["uni"] = uni 
    }
    catch (ex) {
      this.cb.call(this, "error", String("Could not get balances"))
    }
  }

}
export default Web3Adapter;