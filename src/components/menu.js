import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { push as Menu } from "react-burger-menu";
import { Image } from "semantic-ui-react";
import PT from "../images/PalmTreeLarge.png"
import { StoreContext } from "../store/store.js";


function BurgerMenu() {
    const { store, actions } = useContext(StoreContext);
    const [menuOpen, setMenu] = useState(false)
    const [hasBal, updateBal] = useState(false)

    useEffect(() => {
        if (store.wallet && store.wallet.balances) {
            let balKeys = Object.keys(store.wallet.balances)
            for (let i = 0; i < balKeys.length; i++) {
                if (balKeys[i] == "coin" || 
                    balKeys[i] == "cred" ||
                    balKeys[i] == "lp" ||
                    balKeys[i] == "uni"
                ) {
                    continue
                }
                if (store.wallet.balances[balKeys[i]] > 0 || parseInt(store.wallet.balances[balKeys[i]]) > 0) {
                    return updateBal(true)
                }
            }
        }
        return updateBal(false);
    }, [store.wallet.balances])

    const handleStateChange = (state) => {
        setMenu(state.isOpen)
    }

    return (
        <Menu isOpen={menuOpen} burgerButtonClassName={menuOpen ? "bm-burger-button-hidden" : "bm-burger-button"} onStateChange={(menuOpen) => handleStateChange(menuOpen)}>
            <Image className="menuLogo" centered={true} src={PT} size="small" />

            <Link id="home" onClick={() => setMenu(false)} className="menu-item" to={"/"}>
                {">"} Home
                </Link>
            
            <Link id="calm" onClick={() => setMenu(false)} className="menu-item" to={"/calm"}>
                {">"} C.A.L.M
                </Link>
            {!hasBal ? (<></>) : (
            <Link id="farm" onClick={() => setMenu(false)} className="menu-item" to={"/farm"}>
                {">"} NFT Farms
                </Link>
            )}
            <Link id="charter" onClick={() => setMenu(false)} className="menu-item" to={"/charter"}>
                {">"} Charter
                </Link>
            <Link id="news" onClick={() => setMenu(false)} className="menu-item" to={"/news"}>
                {">"} News
                </Link>
            <Link id="puzzleInfo" onClick={() => setMenu(false)} className="menu-item" to={"/puzzleInfo"}>
                {">"} Puzzle Dev Guide
                </Link>
                {true ? (<></>) : (<>
            <Link id="roadmap" className="menu-item soon" >
                <em>{">"} Roadmap (Coming soon)</em>
            </Link>
            </>)}
        </Menu>
    )

}
export default BurgerMenu;