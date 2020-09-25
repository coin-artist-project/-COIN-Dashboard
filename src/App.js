import React, { useState } from 'react';
import { Container, Loader, Grid, Dimmer, Rail } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import './styles/app.css';
import './styles/crt.css'
import { Store } from './store/store.js';

import Errors from "./components/errors.js"
import Wallet from "./components/wallet.js"
import Header from "./components/header.js"
import BurgerMenu from "./components/menu.js";
import Home from "./components/home.js";
import Calm from "./components/calm.js";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const propStates = {
    isLoading: isLoading,
    setLoading: setLoading,
    isError: isError,
    setError: setError
}

  return (
    <Container className="App">
      <Grid stackable={true} className="App crt">
      <Header/>
      <Store>
      <Rail internal dividing={true} position='right'>
      <Wallet states={propStates}/>  
        </Rail>
        <Router>
        <BurgerMenu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } />
        <div id="page-wrap">
        <Dimmer page active={Boolean(isLoading)}>
                <Loader>{String(isLoading)}</Loader>
          </Dimmer>
          <Errors states={propStates} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/calm" component={() => <Calm states={propStates}/>} />
        </Switch>
        </div>
        </Router>
      </Store>
      </Grid>
    </Container>
  );
}

export default App;
