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
                                        <a href="https://twitter.com/coin_artist">
                                            <Icon name="twitter" size="huge" color="blue" />
                                        </a>
                                    </Grid.Column><Grid.Column>
                                        <a href="https://discord.gg/NRcgpJR">
                                            <Icon name="discord" size="huge" color="purple" />
                                        </a>
                                    </Grid.Column><Grid.Column>
                                        <a href="https://t.me/coincred">
                                            <Icon name="telegram" size="huge" color="teal" />
                                        </a>
                                    </Grid.Column><Grid.Column>
                                        <a href="https://medium.com/@coin_artist_17801">
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