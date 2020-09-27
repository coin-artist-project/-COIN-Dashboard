import React from 'react';
import { Container, Grid, Segment, Icon, Image } from "semantic-ui-react"
import Tilt from 'react-tilt'
import Scramble from 'react-scramble'
import Coin from '../images/coin.jpg'
import { StoreContext } from "../store/store.js";

function Home() {

    return (
        <Container fluid>
            <Grid className="mainView" verticalAlign="middle" stackable={true} divided='vertically'>
                <Grid.Row className="pad" centered>
                    <Tilt className="Tilt">
                        <Segment textAligned="center">
                            <h1>
                                <Scramble
                                    autoStart
                                    text="$COIN OS"
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
                            <Image circular={true} centered={true} src={Coin} size="large" />
                            <p></p>
                            <p>Earn COIN to ascend the ranks and influence the syndicate. </p>
                            <p>Amass enough governance power and the world is yours. </p>
                            <p>Miss a challenge and wallow in pity.</p>
                            <Grid>
                                <Grid.Row centered={true} columns={4}>
                                    <Grid.Column>
                                        <Icon name="twitter" size="huge" color="blue" />
                                    </Grid.Column><Grid.Column>
                                        <Icon name="discord" size="huge" color="purple" />
                                    </Grid.Column><Grid.Column>
                                        <Icon name="telegram" size="huge" color="teal" />
                                    </Grid.Column><Grid.Column>
                                        <Icon name="medium" size="huge" color="white" />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Tilt>
                </Grid.Row>
            </Grid>
        </Container>
    );
}

export default Home;