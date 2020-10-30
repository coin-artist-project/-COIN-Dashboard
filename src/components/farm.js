import React, { useEffect, useContext, useState } from 'react';
import { Button, Container, Grid, Card, Segment, Icon, Form, Input } from "semantic-ui-react"
import Tilt from 'react-tilt'
import Scramble from 'react-scramble'
import { StoreContext } from "../store/store.js";
import {
  Redirect
} from 'react-router-dom'
import farmList from "../data/nftFarms.js";

function Farm(props) {
  const { store, actions } = useContext(StoreContext);
  const [staking, setStaking] = useState(0)
  const [farm, setFarm] = useState("");

  useEffect(() => {
    if (props.match && props.match.params && props.match.params.id) {
      if (farmList.hasOwnProperty(props.match.params.id) >= 0) {
        setFarm(farmList[props.match.params.id].coin);
      }
      else {
        setFarm("farm")
      }
    }
  }, [props])

  const handleStakeChange = (e) => {
    setStaking(e.target.value)
  }

  const submitStake = () => {
    if (staking) {
      store.wallet.stake(staking);
    } else {
      store.wallet.stake(store.wallet.balances["lp"]);
    }
  };

  const refresh = () => {
    if (store.wallet) {
      return (
        <Button color="blue" onClick={() => store.wallet.update()} inverted icon><Icon color="blue" name="refresh" />Update</Button>
      )
    }
    return (
      <></>
    )
  }
  const exit = () => {
    if (!store.wallet.balances["uni"] || store.wallet.balances["uni"] === "0") {
      return (
        <Grid.Column width={4} centered="true">
          <Card textAligned="center" className="outerCard" centered>
            <Tilt className="Tilt">
              <Segment.Group textAligned="center" className="Term">
                <Grid.Row className="pad" centered>
                  <Grid.Column textAlign="center">
                    <Icon size="massive" color="red" name="sign-out" />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row className="pad" centered>
                  <Grid.Column textAlign="center">
                    <h3>Exit();</h3>
                    <p>----</p>
                    <p>No stake to exit</p>
                  </Grid.Column>
                </Grid.Row>
              </Segment.Group>
            </Tilt>
          </Card>
        </Grid.Column>
      )
    }
    return (
      <Grid.Column width={4} centered="true">
        <Card textAligned="center" className="outerCard" centered>
          <Tilt className="Tilt">
            <Segment.Group textAligned="center" className="Term">
              <Grid.Row className="pad" centered>
                <Grid.Column textAlign="center">
                  <Icon size="massive" color="red" name="sign-out" />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row className="pad" centered>
                <Grid.Column textAlign="center">
                  <h3>Exit();</h3>
                  <p>----</p>
                  <p>Leave pool with rewards and stake</p>
                  <Button inverted color="red" onClick={() => store.wallet.exit()}>Exit</Button>
                </Grid.Column>
              </Grid.Row>
            </Segment.Group>
          </Tilt>
        </Card>
      </Grid.Column>
    )
  }

  const stakingDisp = () => {
    if (
      (!store.wallet.balances["uni"] && !store.wallet.balances["lp"]) ||
      (store.wallet.balances["lp"] == "0" && store.wallet.balances["uni"] === "0")
    ) {
      return (
        <Segment.Group textAligned="center" className="Term">
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <Icon size="massive" color="green" name="save outline" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <h3>Staking();</h3>
              <p>----</p>
              <p>Add liquidity to COIN-ETH to join the farm</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <a href="https://uniswap.info/pair/0xcce852e473ecfdebfd6d3fd5bae9e964fd2a3fa7" target="_blank">
                <Button inverted color="green">{">"}Go to Uniswap</Button>
              </a>
            </Grid.Column>
          </Grid.Row>
        </Segment.Group>
      )
    }
    else if (!store.wallet.balances["uni"] || store.wallet.balances["uni"] === "0") {
      return (
        <Segment.Group textAligned="center" className="Term">
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <Icon size="massive" color="green" name="save outline" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <h3>Staking();</h3>
              <p>----</p>
              <p>Available: {((Math.floor(parseFloat(store.wallet.balances["lp"]) * 1000000)) / 1000000).toFixed(6)}</p>
              <Form>
                <Form.Field>
                  <p>Amount to stake</p>
                  <Input fluid>
                    <input value={staking} onChange={(e) => handleStakeChange(e)} placeholder={store.wallet.balances["lp"]} />
                    <Button onClick={() => setStaking(store.wallet.balances["lp"])} inverted color="yellow" >Max</Button>
                  </Input>
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <Button inverted onClick={submitStake.bind(this)} color="green">{">"}Start</Button>
            </Grid.Column>
          </Grid.Row>
        </Segment.Group>
      )
    }
    else if (store.wallet.balances["lp"] == "0") {
      return (
        <Segment.Group textAligned="center" className="Term">
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <Icon size="massive" color="green" name="save outline" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <h3>Staking();</h3>
              <p>----</p>
              <p>Staking: {((Math.floor(parseFloat(store.wallet.balances["uni"]) * 1000000)) / 1000000).toFixed(6)}</p>
              <p>{((Math.floor(parseFloat(store.wallet.stats["userStaked"]) * 1000000)) / 1000000).toFixed(2)}% Staked Total</p>
            </Grid.Column>
          </Grid.Row>
        </Segment.Group>
      )
    }
    else {
      return (
        <Segment.Group textAligned="center" className="Term">
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <Icon size="massive" color="green" name="save outline" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <h3>Staking();</h3>
              <p>----</p>
              <p>Staking: {((Math.floor(parseFloat(store.wallet.balances["uni"]) * 1000000)) / 1000000).toFixed(6)}</p>
              <p>{((Math.floor(parseFloat(store.wallet.stats["userStaked"]) * 1000000)) / 1000000).toFixed(2)}% Staked Total</p>
              <p>----</p>
              <p>Available: {((Math.floor(parseFloat(store.wallet.balances["lp"]) * 1000000)) / 1000000).toFixed(6)}</p>
              <Form>
                <Form.Field>
                  <p>Amount to add</p>
                  <Input fluid>
                    <input value={staking} onChange={(e) => handleStakeChange(e)} placeholder={store.wallet.balances["lp"]} />
                    <Button onClick={() => setStaking(store.wallet.balances["lp"])} inverted color="yellow" >Max</Button>
                  </Input>

                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <Button inverted onClick={submitStake.bind(this)} color="green">{">"}Add</Button>
            </Grid.Column>
          </Grid.Row>
        </Segment.Group>
      )
    }
  }

  const rewardDisp = () => {
    if (!store.wallet.rewards || store.wallet.rewards == 0) {
      return (
        <Segment.Group textAligned="center" className="Term">
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <Icon size="massive" color="blue" name="sync" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <h3>Rewards();</h3>
              <p>----</p>
              <p>No NFT shards to claim</p>

            </Grid.Column>
          </Grid.Row>
        </Segment.Group>
      )
    }
    return (
      <Segment.Group textAligned="center" className="Term">
        <Grid.Row className="pad" centered>
          <Grid.Column textAlign="center">
            <Icon size="massive" color="blue" name="sync" />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="pad" centered>
          <Grid.Column textAlign="center">
            <h3>Rewards();</h3>
            <p>----</p>
            <p>NFT Shards: {"0"}</p>

          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="pad" centered={true}>
          <Grid.Column textAlign="center">
            <Button inverted onClick={() => store.wallet.collectReward()} color="blue">{">"}Collect</Button>
          </Grid.Column>
        </Grid.Row>
      </Segment.Group>
    )

  }
  const statDisp = () => {
    if (!store.wallet) {
      return (
        <Grid.Row centered={true}>
          <Card textAligned="center" className="outerCard" centered={true}>
            <Tilt className="Tilt">

              <Segment.Group textAligned="center" className="Term">
                <Grid.Row className="pad" centered>
                  <Grid.Column textAlign="center">
                    <Icon size="massive" name="lock" color="red" />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row className="pad" centered>
                  <Grid.Column textAlign="center">
                    <p>Unauthorized Access</p>
                    <p>Wallet must be connected!</p>
                  </Grid.Column>
                </Grid.Row>
              </Segment.Group>
            </Tilt>
          </Card>
        </Grid.Row>
      )
    }
    return (
      <>
        <Grid.Row centered={true} columns={2}>
          <Grid.Column width={4} centered="true">
            <Container fluid>
              <Card textAligned="center" className="outerCard" centered={true}>
                <Tilt className="Tilt">
                  {rewardDisp()}
                </Tilt>
              </Card>
            </Container>
          </Grid.Column>

          <Grid.Column width={4} centered="true">
            <Card textAligned="center" className="outerCard" centered>
              <Tilt className="Tilt">
                {stakingDisp()}
              </Tilt>
            </Card>
          </Grid.Column>
          {exit()}
        </Grid.Row>
      </>

    )
  }
  if (farm === "farm") {
    return (
      <Redirect to="/farm" />
    )
  }
  else {
    return (
      <Container fluid>
        <Grid className="mainView" verticalAlign="middle" stackable={true} divided='vertically'>
          <Grid.Row className="pad" centered>
            <Tilt className="Tilt">
              <Segment className="calmHead" textAligned="center">
                <h1>
                  <Scramble
                    autoStart
                    text={farm + " FARM"}
                    steps={[
                      {
                        roll: 10,
                        action: '+',
                        type: 'all',
                      },
                      {
                        action: '-',
                        type: 'forward',
                      },
                    ]}
                  />
                </h1>
                <p>{store.wallet && store.wallet.balances[farm] ? (farm + " Balance: " + ((Math.floor(parseFloat(store.wallet.balances[farm]) * 1000000)) / 1000000).toFixed(6)) : ""}</p>
                {refresh()}
              </Segment>
            </Tilt>
          </Grid.Row>
          {statDisp()}
        </Grid>
      </Container>
    );
  }
}
export default Farm;