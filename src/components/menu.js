import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { push as Menu } from "react-burger-menu";
import { Image } from "semantic-ui-react";
import PT from "../images/PalmTreeLarge.png"


class BurgerMenu extends Component {
    constructor(props) {
        super();
        this.state = {
            'menuOpen': false
        }
    }
    closeMenu() {
        this.setState({ menuOpen: false })
    }
    handleStateChange(state) {
        this.setState({ menuOpen: state.isOpen });
    }
    render() {
        return (
            <Menu isOpen={this.state.menuOpen} burgerButtonClassName={this.state.menuOpen ? "bm-burger-button-hidden" : "bm-burger-button"} onStateChange={(state) => this.handleStateChange(state)}>
                <Image className="menuLogo" centered={true} src={PT} size="small" />

                <Link id="home" onClick={() => this.closeMenu()} className="menu-item" to={"/"}>
                    {">"} Home
                </Link>
                <Link id="calm" onClick={() => this.closeMenu()} className="menu-item" to={"/calm"}>
                    {">"} C.A.L.M
                </Link>
                <Link id="farm"className="menu-item">
                    {">"} Farm (Coming soon)
                </Link>
                <Link id="charter" onClick={() => this.closeMenu()} className="menu-item" to={"/charter"}>
                    {">"} Charter
                </Link>
                <Link id="puzzleInfo" onClick={() => this.closeMenu()} className="menu-item" to={"/puzzleInfo"}>
                    {">"} Puzzle Dev Guide
                </Link>
                <Link id="roadmap" className="menu-item" >
                    {">"} Roadmap (Coming soon)
                </Link>
                <Link id="news" onClick={() => this.closeMenu()} className="menu-item" to={"/news"}>
                    {">"} News
                </Link>
            </Menu>
        )
    }
}
export default BurgerMenu;