import React, { useEffect, useContext, useState } from 'react';
import { Button, Container, Grid, Card, Segment, Icon, Form, Input } from "semantic-ui-react"
import Tilt from 'react-tilt'
import Scramble from 'react-scramble'
import { StoreContext } from "../store/store.js";

function Calm(props) {
  const { store, actions } = useContext(StoreContext);
  const [staking, setStaking] = useState(0)

  useEffect(() => {
    if (store.wallet && !props.states.updateView) {
      async function update() {
        //await store.wallet.update()
      }
      update()
    }
    if (props.states.updateView) {
      props.states.setUpdateView(false)
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

  const exitOldFarm = () => {
    if (!store.wallet || store.wallet.balances["old-uni"] <= 0) {
      return "";
    }

    return (
      <span style={{'margin':'auto', 'width':'75%'}}>
        <Grid.Row className="pad" centered>
          <Tilt className="Tilt">
            <Segment className="calmHead" textAligned="center">
              <h1>
                <Scramble
                  autoStart
                  text="C.A.L.M PROTOCOL MIGRATION NOTICE"
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
              <p>
                In the next few days, we are upgrading the Liquidity Mining contract to allow for variable CRED emission. The exact date and time will be announced when gas prices are cheaper.
              </p>
              <p>
                You will need to exit this current farm before you can stake your LP tokens in the new C.A.L.M. Farm. The new farm is live, you can exit the old farm and join the new farm at any time.
              </p>
              <p>
                By exiting the old farm, you will also collect all of your COIN and CRED rewards.
              </p>
              <p>{store.wallet && store.wallet.stats["totalStaked"] ? ("Liquidity Provider Tokens Staked: " + store.wallet.balances["old-uni"]) : ""}</p>
              {exitOldFarmButton()}
            </Segment>
          </Tilt>
        </Grid.Row>
        <br />
      </span>
    );
  }
  const exitOldFarmButton = () => {
    if (store.wallet) {
      return (
        <Button color="red" onClick={() => store.wallet.exitOld()} inverted icon>Exit Old Farm</Button>
      )
    }
    return "";
  }

  const refresh = () => {
    if (store.wallet) {
      return (
        <Button color="blue" onClick={() => store.wallet.update()} inverted icon><Icon color="blue" name="refresh" />Update</Button>
      )
    }
    return "";
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
              <p>No Rewards to claim</p>

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
            <p>COIN Rate: {((Math.floor(parseFloat(store.wallet.stats["earnRate"]) * 1000000)) / 1000000).toFixed(6)} / Day</p>
            <p>$CRED Rate: {((Math.floor(parseFloat(store.wallet.stats["earnRateCred"]) * 1000000)) / 1000000).toFixed(6)} / Day</p>
            <p>----</p>
            <p>{((Math.floor(parseFloat(store.wallet.rewards) * 1000000)) / 1000000).toFixed(6)} COIN</p>
            <p>{((Math.floor(parseFloat(store.wallet.cred_rewards || 0) * 1000000)) / 1000000).toFixed(6)} $CRED</p>
            <p></p>
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
  return (
    <Container fluid>
      <Grid className="mainView" verticalAlign="middle" stackable={true} divided='vertically'>
        {exitOldFarm()}
        <Grid.Row className="pad" centered>
          <Tilt className="Tilt">
            <Segment className="calmHead" textAligned="center">
              <h1>
                <Scramble
                  autoStart
                  text="C.A.L.M PROTOCOL"
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
              <h4>Coin Artist Liquidity Mining</h4>
              <p>{store.wallet && store.wallet.stats["totalStaked"] ? ("Total Liquidity Staked: " + ((Math.floor(parseFloat(store.wallet.stats["totalStaked"]) * 1000000)) / 1000000).toFixed(2) + "%") : ""}</p>
              <p>{store.wallet && store.wallet.balances["coin"] ? ("COIN Balance: " + ((Math.floor(parseFloat(store.wallet.balances["coin"]) * 1000000)) / 1000000).toFixed(6)) : ""}</p>
              <p>{store.wallet && store.wallet.balances["cred"] ? ("$CRED Balance: " + ((Math.floor(parseFloat(store.wallet.balances["cred"]) * 1000000)) / 1000000).toFixed(6)) : ""}</p>
              {refresh()}
            </Segment>
          </Tilt>
        </Grid.Row>
        {statDisp()}
      </Grid>
    </Container>
  );
}
export default Calm;