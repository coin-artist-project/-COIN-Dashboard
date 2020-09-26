import React, { useEffect, useContext, useState } from 'react';
import { Button, Container, Grid, Card, Segment, Icon, Form } from "semantic-ui-react"
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

  const stakingDisp = () => {
    if (!store.wallet.balances["uni"] || store.wallet.balances["uni"] === "0") {
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
              <p>Start staking and get rewards</p>
              <p>Available: {((Math.floor(parseFloat(store.wallet.balances["lp"]) * 1000000)) / 1000000).toFixed(6)}</p>
              <Form>
                <Form.Field>
                  <p>Amount to stake</p>
                  <input onChange={(e) => handleStakeChange(e)} />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <Button inverted onClick={() => store.wallet.stake(staking)} color="green">{">"}Start</Button>
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
            <p>Staking: {((Math.floor(parseFloat(store.wallet.balances["uni"]) * 1000000)) / 1000000).toFixed(6)}</p>
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
            <p>Add more to your stake</p>
            <p>Staking: { ((Math.floor(parseFloat(store.wallet.balances["uni"]) * 1000000)) / 1000000).toFixed(6)}</p>
            <p>Available: { ((Math.floor(parseFloat(store.wallet.balances["lp"]) * 1000000)) / 1000000).toFixed(6)}</p>
            <Form>
              <Form.Field>
                <p>Amount to add</p>
                <input onChange={(e) => handleStakeChange(e)} />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="pad" centered>
          <Grid.Column textAlign="center">
            <Button inverted onClick={() => store.wallet.stake(staking)} color="green">{">"}Add</Button>
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
            <p></p>
            <p>{((Math.floor(parseFloat(store.wallet.rewards) * 1000000)) / 1000000).toFixed(6)} $COIN</p>
            <p>{((Math.floor(parseFloat(store.wallet.rewards * 100) * 1000000)) / 1000000).toFixed(6)} $CRED</p>
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
              <p>Leave pool with rewards and stake</p>
              <Button inverted color="red" onClick={() => store.wallet.exit()}>Exit</Button>
            </Grid.Column>
          </Grid.Row>
        </Segment.Group>
            </Tilt>
          </Card>
        </Grid.Column>
      </Grid.Row>
</>
      
    )
  }
  return (
    <Container fluid>
      <Grid className="mainView" verticalAlign="middle" stackable={true} divided='vertically'>
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
              <p>{store.wallet && store.wallet.balances["coin"] ? ("$COIN Balance: " + ((Math.floor(parseFloat(store.wallet.balances["coin"]) * 1000000)) / 1000000).toFixed(6))  : ""}</p>
              <p>{store.wallet && store.wallet.balances["cred"] ? ("$CRED Balance: " + ((Math.floor(parseFloat(store.wallet.balances["cred"]) * 1000000)) / 1000000).toFixed(6)) : ""}</p>
            </Segment>
          </Tilt>
        </Grid.Row>
        {statDisp()}
      </Grid>
    </Container>
  );
}
export default Calm;