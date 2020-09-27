const axios = require("axios");

const API = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"
const query = JSON.stringify({query:`{pairs(first:1, where: {id: "0xcce852e473ecfdebfd6d3fd5bae9e964fd2a3fa7"}) {token0Price, token1Price} bundle(id:1) { ethPrice }}`})
export async function getData() {
    try {
        let res = await axios.post(API, query);
        if (!res || !res.data || !res.data.data) {
            throw "Could not get market data"
        }
        return res.data.data;
    }
    catch(ex) {
        console.log(ex)
    }
}
