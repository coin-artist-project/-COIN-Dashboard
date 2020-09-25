import React, { useEffect, useContext } from 'react';
import { Button, Container, Grid, Card, Segment, Icon } from "semantic-ui-react"
import Tilt from 'react-tilt'
import Scramble from 'react-scramble'
import { StoreContext } from "../store/store.js";

// TODO: This needs to be split into children components
// TODO: Connect web3adapter views
function Calm(props) {
  const { store, actions } = useContext(StoreContext);

  useEffect(() => {
    if(props.states.refresh) {
      props.states.refresh(false);
    }
  }, props)

  const stakingDisp = () => {
    if (!store.wallet.balances["unipool"]) {
      return (
        <></>
      )
    }
    else if (!store.wallet.balances["lp"])
    return (
      <></>
    )
    return (
      <></>
    )
  }

  const rewardDisp = () => {
    if (!store.wallet.reward) {
      return (
        <></>
      )
    }
    return (
      <></>
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
          <Grid.Row centered={true} columns={2}>
            <Grid.Column width={4} centered={true}>
              <Container>
              <Card textAligned="center" className="outerCard" centered={true}>
                <Tilt className="Tilt">

                  <Segment.Group textAligned="center" className="Term">
                    <Grid.Row className="pad" centered>
                      <Grid.Column textAlign="center">
                        <Icon size="massive" name="sync" />
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row className="pad" centered>
                      <Grid.Column textAlign="center">
                        <h3>Rewards();</h3>
                        <p>-------------------</p>
Collect your staking rewards
----------
<p></p>
Value: 0
<p></p>
----------
</Grid.Column>
                    </Grid.Row>

                    <Grid.Row className="pad" centered={true}>
                      <Grid.Column textAlign="center">
                        <Button inverted color="green">{">"}Collect</Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Segment.Group>

                </Tilt>
              </Card>
              </Container>
            </Grid.Column>

            <Grid.Column width={4} centered={true}>
              <Card textAligned="center" className="outerCard" centered>
                <Tilt className="Tilt">

                  <Segment.Group textAligned="center" className="Term">
                    <Grid.Row className="pad" centered>
                      <Grid.Column textAlign="center">
                        <Icon size="massive" name="save outline" />
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row className="pad" centered>
                      <Grid.Column textAlign="center">
                        <h3>Staking();</h3>
                        <p>-------------------</p>
Start staking and get rewards
----------
<p></p>
Balance: 0
<p></p>
----------
</Grid.Column>
                    </Grid.Row>

                    <Grid.Row className="pad" centered>
                      <Grid.Column textAlign="center">
                        <Button inverted color="green">{">"}Start</Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Segment.Group>

                </Tilt>
              </Card>
            </Grid.Column>
          </Grid.Row>
)
}
return (
          <Container fluid>
            <Grid className="mainView" verticalAlign="middle" stackable={true} divided='vertically'>
              <Grid.Row className="pad" centered>
                <Tilt className="Tilt">
                  <Segment textAligned="center">
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
                    <p>MOAR INFO</p>
                  </Segment>
                </Tilt>
              </Grid.Row>
              {statDisp()}
            </Grid>
          </Container>
);
}
export default Calm;