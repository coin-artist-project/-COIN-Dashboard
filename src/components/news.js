
import React from 'react';
import { Container, Grid, Segment, Card, List } from "semantic-ui-react"
import Tilt from 'react-tilt'
import Scramble from 'react-scramble'
import { TwitterTimelineEmbed } from 'react-twitter-embed';

// Puzzle rules display
function News() {
    return (
        <Container fluid>
            <Grid className="mainView" verticalAlign="middle" stackable={true} divided='vertically'>
                <Grid.Row className="pad" centered>
                    <Tilt className="Tilt">
                        <Segment className="pGuide" textAligned="center">
                            <h1>
                                <Scramble
                                    autoStart
                                    text="News"
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

                <Grid.Row centered={true} columns={2}>
                    <Grid.Column width={4} centered="true">
                        <Container fluid>
                            <Card textAligned="center" className="outerCard" centered={true}>
                                <Tilt className="Tilt">
                                    <Segment.Group textAligned="center" className="Term">
                                        <Grid.Row className="pad" centered>
                                            <Grid.Column textAlign="center">
                                                <TwitterTimelineEmbed
                                                    sourceType="profile"
                                                    screenName="coin_artist"
                                                    options={{ height: 400 }}
                                                    theme="dark"
                                                />
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
                                            <TwitterTimelineEmbed
                                                sourceType="profile"
                                                screenName="neondistrictRPG"
                                                options={{ height: 400 }}
                                                theme="dark"
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Segment.Group>
                            </Tilt>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container >
    )
}
export default News;