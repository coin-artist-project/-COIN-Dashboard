import React, { useEffect, useState } from 'react';
import { Container, Loader, Grid, Dimmer, Rail, Menu } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import './styles/app.css';
import './styles/crt.css'
import { Store } from './store/store.js';

import Home from "./components/home.js";
import Calm from "./components/calm.js";
import NFTFarm from "./components/nftFarm.js"
import Charter from "./components/charter.js"
import PuzzleInfo from "./components/puzzleInfo.js"
import News from "./components/news.js"

import Errors from "./components/errors.js"
import Wallet from "./components/wallet.js"
import Header from "./components/header.js"
import BurgerMenu from "./components/menu.js";
import MarketInfo from "./components/marketInfo.js"


function App() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [updateView, setUpdateView] = useState(false);

  const propStates = {
    isLoading: isLoading,
    setLoading: setLoading,
    isError: isError,
    setError: setError,
    updateView: updateView,
    setUpdateView: setUpdateView,
  }

  /*
          <Rail internal dividing={true} position='right'>
            <Wallet states={propStates} />
          </Rail>
  */
  return (
    <Container className="App">
      <Grid stackable={true} className="App crt">
        <Header />
        <Store>

          <Router>
          <div id="outer-container">

              <BurgerMenu className="hellow" pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
              <div id="page-wrap">
              <Grid.Row centered={true}>
          <Menu compact>
          <Menu.Item>
            <Wallet states={propStates} />
            </Menu.Item>
          <MarketInfo/>
          </Menu>
          </Grid.Row>
                <Dimmer page active={Boolean(isLoading)}>
                  <Loader>{String(isLoading)}</Loader>
                </Dimmer>
                <Errors states={propStates} />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/calm" component={() => <Calm states={propStates} />} />
                  <Route exact path="/farm" component={NFTFarm} />
                  <Route exact path="/charter" component={Charter} />
                  <Route exact path="/puzzleInfo" component={PuzzleInfo} />
                  <Route exact path="/news" component={News} />
                </Switch>
              </div>
            </div>
          </Router>
        </Store>
      </Grid>
    </Container>
  );
}

export default App;
