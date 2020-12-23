import React from 'react';
import { Container, Grid, Segment, Icon, Image } from "semantic-ui-react"
import Tilt from 'react-tilt'
import Scramble from 'react-scramble'
import Coin from '../images/coin.jpg'

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
                                    text="COIN'S EDEN OS"
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
                                        <a href="https://twitter.com/coin_artist" target="_blank">
                                            <Icon name="twitter" size="huge" color="blue" />
                                        </a>
                                    </Grid.Column><Grid.Column>
                                        <a href="https://discord.com/invite/3AbutcS" target="_blank">
                                            <Icon name="discord" size="huge" color="purple" />
                                        </a>
                                    </Grid.Column><Grid.Column>
                                        <a href="https://t.me/coincred" target="_blank">
                                            <Icon name="telegram" size="huge" color="teal" />
                                        </a>
                                    </Grid.Column><Grid.Column>
                                        <a href="https://coin-artist.medium.com/" target="_blank">
                                            <Icon name="medium" size="huge" color="white" />
                                        </a>
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