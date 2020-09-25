import React from 'react';
import { Container, Grid, Segment} from "semantic-ui-react"
import Tilt from 'react-tilt'
import Scramble from 'react-scramble'

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
                            <p>Need copy for info on how dis stuff all works and wat not ya feel ya boi!</p>
                        </Segment>
                    </Tilt>
                </Grid.Row>
            </Grid>
        </Container>
    );
}

export default Home;