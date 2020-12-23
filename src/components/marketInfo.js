import React, { useEffect, useState } from 'react';
import { Menu } from "semantic-ui-react"
import { getData } from "../utils/getData.js";

function MarketInfo() {
    const [data, setData] = useState({"ethCoin": false, "coinEth": false, "ethUSD": false, "coinUSD": false})
    useEffect(() => {
        loadData()
        const intervalId = setInterval(() => loadData(), 15000)
        return () => clearInterval(intervalId);
    }, [])
    const loadData = async() => {
        let md = {"ethCoin": false, "coinEth": false, "coinUSD": false}
        let res = await getData();
        if (!res) {
            return;
        }
        md["coinEth"] = ((Math.floor(parseFloat(res.pairs[0]["token1Price"]) * 1000000)) / 1000000).toFixed(6)
        md["ethCoin"] = ((Math.floor(parseFloat(res.pairs[0]["token0Price"]) * 1000000)) / 1000000).toFixed(6)
        md["ethUSD"] = ((Math.floor(parseFloat(res.bundle["ethPrice"]) * 1000000)) / 1000000).toFixed(6)
        let usd = md["coinEth"] * md["ethUSD"]
        md["coinUSD"] = ((Math.floor(parseFloat(usd) * 1000000)) / 1000000).toFixed(6)
        setData(md)
    }
    return (
        <>
        <Menu.Item color="green">
            COIN: {data["ethCoin"] ? data["ethCoin"] : "!"} / ETH
        </Menu.Item>
        <Menu.Item color="teal">
                ETH: {data["coinEth"] ? data["coinEth"] : "!"} / COIN
        </Menu.Item>
        <Menu.Item color="purple">
                USD: {data["coinUSD"] ? data["coinUSD"] : "!"} / COIN
        </Menu.Item>
        <Menu.Item color="red">
                USD: {data["ethUSD"] ? data["ethUSD"] : "!"} / ETH
        </Menu.Item>
    </>
    )
}
export default MarketInfo;