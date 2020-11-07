import React, { useEffect, useState } from 'react';
import { Container, Grid, Segment, Card, Icon, Progress, Button } from "semantic-ui-react"
import Tilt from 'react-tilt'
import Scramble from 'react-scramble'
import {
    Redirect
} from 'react-router-dom';
import farmList from "../data/nftFarms.js";

// NFT Farm display
function Farms(props) {
    const [farmSelect, setFarmSelect] = useState("");

    useEffect(() => {
        setFarmSelect("");
    }, [props]);

    const selectedFarm = () => {
        if (farmSelect !== "") {
            return (
                <Redirect to={"/farm/" + farmSelect} farmType={farmSelect}/>
            )
        }
        else {
            return (farmSelection());;
        }
    }

    const getFarmCoin = (farm) => {
        let coin = "???";
        if (farmList.hasOwnProperty(farm) && farmList[farm].hasOwnProperty('token')) {
            coin = farmList[farm].token;
        }
        return coin;
    }

    const getFarmSymbol = (farm) => {
        let image = (<Icon size="massive" color="red" name="lock" />);
        if (farmList.hasOwnProperty(farm) && farmList[farm].hasOwnProperty('image')) {
            image = (<img src={farmList[farm].image} width="128" height="128" />);
        }
        return image;
    }

    const getFarmTitle = (farm) => {
        let title = "???";
        if (farmList.hasOwnProperty(farm) && farmList[farm].hasOwnProperty('title')) {
            title = farmList[farm].title;
        }
        return title;
    }

    const upcomingFarm = (farm) => {
        let symbol = getFarmCoin(farm);
        let image = getFarmSymbol(farm);
        let title = getFarmTitle(farm);
        return (
            <Grid.Column width={4} centered="true">
                <Container fluid>
                    <Card textAligned="center" className="outerCard" centered={true}>
                        <Tilt className="Tilt">
                            <Segment.Group textAligned="center" className="Term">
                                <Grid.Row className="pad" centered>
                                    <Grid.Column textAlign="center">
                                        {image}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="pad" centered>
                                    <Grid.Column textAlign="center">
                                        <p>{title.toUpperCase()}</p>
                                        <p>Initializing...</p>
                                        <p>Check back soon!</p>
                                        <Progress error percent={67} active></Progress>
                                    </Grid.Column>
                                </Grid.Row>
                            </Segment.Group>
                        </Tilt>
                    </Card>
                </Container>
            </Grid.Column>
        );
    }

    const prelaunchFarm = (farm) => {
        let symbol = getFarmCoin(farm);
        let image = getFarmSymbol(farm);
        let title = getFarmTitle(farm);
        return (
            <Grid.Column width={4} centered="true">
                <Container fluid>
                    <Card textAligned="center" className="outerCard" centered={true}>
                        <Tilt className="Tilt">
                            <Segment.Group textAligned="center" className="Term">
                                <Grid.Row className="pad" centered>
                                    <Grid.Column textAlign="center">
                                        {image}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="pad" centered>
                                    <Grid.Column textAlign="center">
                                        <p>{title.toUpperCase()}</p>
                                        <p>Starting Soon!</p>
                                        <Button color="blue" onClick={() => setFarmSelect(farm)} inverted icon>{">"}Join & Prepare</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Segment.Group>
                        </Tilt>
                    </Card>
                </Container>
            </Grid.Column>
        );
    }

    const launchedFarm = (farm) => {
        let symbol = getFarmCoin(farm);
        let image = getFarmSymbol(farm);
        let title = getFarmTitle(farm);
        return (
            <Grid.Column width={4} centered="true">
                <Container fluid>
                    <Card textAligned="center" className="outerCard" centered={true}>
                        <Tilt className="Tilt">
                            <Segment.Group textAligned="center" className="Term">
                                <Grid.Row className="pad" centered>
                                    <Grid.Column textAlign="center">
                                        {image}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="pad" centered>
                                    <Grid.Column textAlign="center">
                                        <p>{title.toUpperCase()}</p>
                                        <p>Live Now!</p>
                                        <Button color="blue" onClick={() => setFarmSelect(farm)} inverted icon>{">"}View</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Segment.Group>
                        </Tilt>
                    </Card>
                </Container>
            </Grid.Column>
        );
    }

    const completedFarm = (farm) => {
        let symbol = getFarmCoin(farm);
        let image = getFarmSymbol(farm);
        let title = getFarmTitle(farm);
        return (
            <Grid.Column width={4} centered="true">
                <Container fluid>
                    <Card textAligned="center" className="outerCard" centered={true}>
                        <Tilt className="Tilt">
                            <Segment.Group textAligned="center" className="Term">
                                <Grid.Row className="pad" centered>
                                    <Grid.Column textAlign="center">
                                        {image}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row className="pad" centered>
                                    <Grid.Column textAlign="center">
                                        <p>{title.toUpperCase()}</p>
                                        <p>Farm Complete!</p>
                                        <Button color="blue" onClick={() => setFarmSelect(farm)} inverted icon>{">"}Review</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Segment.Group>
                        </Tilt>
                    </Card>
                </Container>
            </Grid.Column>
        );
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
                                    text="NFT Farms"
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
                        </Segment>
                    </Tilt>
                </Grid.Row>

                {/* Active Farms */}
                <Grid.Row centered={true} columns={3}>
                    {prelaunchFarm('coin-2')}

                    {prelaunchFarm('cred-2')}

                    {prelaunchFarm('uni-2')}
                </Grid.Row>

                {/* Upcoming Farms */}
                <Grid.Row centered={true} columns={3}>
                    {completedFarm('coin-1')}

                    {completedFarm('cred-1')}

                    {launchedFarm('trsh-1')}
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