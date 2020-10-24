import React, { useEffect, useState } from 'react';
import { Container, Grid, Segment, Card, Icon, Progress, Button } from "semantic-ui-react"
import Tilt from 'react-tilt'
import Scramble from 'react-scramble'
import {
    Redirect
} from 'react-router-dom'

// NFT Farm display
function Farms(props) {
    const [farmSelect, setFarmSelect] = useState("");

    useEffect(() => {
        setFarmSelect("");
    }, [props]);

    const selectedFarm = () => {
        // <Farm farmType={farmSelect}/>
        if (farmSelect !== "") {
            return (
                <Redirect to={"/farm/" + farmSelect} farmType={farmSelect}/>
            )
        }
        else {
            return (farmSelection());;
        }
    }

    const farmSelection = () => {
        return (
            <Grid className="mainView" verticalAlign="middle" stackable={true} divided='vertically'>
                <Grid.Row className="pad" centered>
                    <Tilt className="Tilt">
                        <Segment className="pGuide" textAligned="center">
                            <h1>
                                <Scramble
                                    autoStart
                                    text="NFT Farm"
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
                            <Container text>
                                <p>Coming soon...</p>
                            </Container>
                        </Segment>
                    </Tilt>
                </Grid.Row>

                <Grid.Row centered={true} columns={3}>
                    <Grid.Column width={4} centered="true">
                        <Container fluid>
                            <Card textAligned="center" className="outerCard" centered={true}>
                                <Tilt className="Tilt">
                                    <Segment.Group textAligned="center" className="Term">
                                        <Grid.Row className="pad" centered>
                                            <Grid.Column textAlign="center">
                                                <Icon size="massive" color="red" name="hourglass half" />
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row className="pad" centered>
                                            <Grid.Column textAlign="center">
                                                <p>COIN</p>
                                                <p>Initializing...</p>
                                                <p>Check back soon!</p>
                                                <Progress error percent={88} active></Progress>
                                                <Button onClick={() => setFarmSelect("coin")}>dev</Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Segment.Group>
                                </Tilt>
                            </Card>
                        </Container>
                    </Grid.Column>

                    <Grid.Column width={4} centered="true">
                        <Card textAligned="center" className="outerCard" centered>
                            <Tilt className="Tilt">
                                <Segment.Group textAligned="center" className="Term">
                                    <Grid.Row className="pad" centered>
                                        <Grid.Column textAlign="center">
                                            <Icon size="massive" color="red" name="lock" />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row className="pad" centered>
                                        <Grid.Column textAlign="center">
                                            <p>CRED</p>
                                            <p>Initializing...</p>
                                            <p>Check back soon!</p>
                                            <Progress error percent={88} active></Progress>
                                            <Button onClick={() => setFarmSelect("cred")}>dev</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Segment.Group>
                            </Tilt>
                        </Card>
                    </Grid.Column>

                    <Grid.Column width={4} centered="true">
                        <Card textAligned="center" className="outerCard" centered>
                            <Tilt className="Tilt">
                                <Segment.Group textAligned="center" className="Term">
                                    <Grid.Row className="pad" centered>
                                        <Grid.Column textAlign="center">
                                            <Icon size="massive" color="red" name="lock" />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row className="pad" centered>
                                        <Grid.Column textAlign="center">
                                            <p>???</p>
                                            <p>Initializing...</p>
                                            <p>Check back soon!</p>
                                            <Progress error percent={88} active></Progress>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Segment.Group>
                            </Tilt>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return (
        <>
            {selectedFarm()}
        </>
    )
}
export default Farms;