import React from 'react';
import { Container, Grid, Segment, Card, List } from "semantic-ui-react"
import Tilt from 'react-tilt'
import Scramble from 'react-scramble'

// Puzzle rules display
function PuzzleInfo(props) {
    return (
        <Container fluid>
            <Grid className="mainView" verticalAlign="middle" stackable={true} divided='vertically'>
                <Grid.Row className="pad" centered>
                    <Tilt className="Tilt">
                        <Segment className="pGuide" textAligned="center">
                            <h1>
                                <Scramble
                                    autoStart
                                    text="Puzzle Dev Guide"
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
                                <p>
                                    Blockade provides two core types of crypto-puzzles: Those designed by community members for each other, and those designed by Blockade themselves for special events or promotions.
                                    Puzzle completion methods will vary over time, but for the time being we will be continuing to utilize the CERES-IV bot in Discord as a medium for submitting puzzle answers.
                                </p>
                                <p>
                                    Blockade encourages community members to build puzzles for each other, and can petition $COIN holders for funds to place towards their rewards. Top puzzle builders can eventually receive kickbacks on their contributions.
                               </p>
                                <p>
                                    Puzzle Creators may petition the community to allow for 85% of the funds to build their puzzle to be applied to the prize wallet from the $COIN supply, but must pay 15% of the prize fund when their DAO is submitted for the right to do so. In addition, there are also role requirements that determine the level of puzzle that may be petitioned for:
                                </p>
                            </Container>
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
                                                <h3>Blockade</h3>
                                                <List bulleted>
                                                    <List.Item as="p">Prizes can hold rewards in any cryptocurrency</List.Item>
                                                    <List.Item as="p">Prize amounts can be in $COIN</List.Item>
                                                    <List.Item as="p">$COIN puzzles require at least $streetscum Discord rank to participate in and claim a prize for</List.Item>
                                                    <List.Item as="p">May incorporate other requirements for prize claim eligibility such as higher than street scum discord rank or NFT ownership, depending on the puzzle. If there are special eligibility rules for an upcoming puzzle, they will be announced 1 week in advance of puzzle launch.</List.Item>
                                                    <List.Item as="p">Some Blockade puzzles might be secretly launched. Keep an eye out for ‘1347’ tag around content in the future.</List.Item>
                                                </List>
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
                                            <h3>Community</h3>
                                            <List bulleted>
                                                <List.Item as="p">Require at least $streetscum Discord rank to participate in and claim a prize for</List.Item>
                                                <List.Item as="p">Prize amount and launch date is announced 1 week in advance.</List.Item>
                                                <List.Item as="p">Prize amounts have 4 tiers based on difficulty and value is determined at the time of puzzle announcement:</List.Item>
                                                <List.Item as="p">EASY — $100 USD worth of $COIN</List.Item>
                                                <List.Item as="p">MEDIUM — $200 USD worth of $COIN</List.Item>
                                                <List.Item as="p">HARD — $400 USD worth of $COIN</List.Item>
                                                <List.Item as="p">INSANE — $600 USD worth of $COIN</List.Item>
                                            </List>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Segment.Group>
                            </Tilt>
                        </Card>
                    </Grid.Column>
                </Grid.Row>

                
                <Grid.Row className="pad" centered>
                    <Tilt className="Tilt">
                        <Segment className="pDetail" textAligned="center">
                            <h1>
                                Details
                            </h1>
                            <Container text>
                                <p>
                                    We have separate puzzle builder ranks on top of coin ranks to make the biggest puzzles. Puzzle rank would be tied to how much you could request from BG to fund a prize then. Puzzle builder rank would be determined by the BG team and based on the users history with the community and puzzle making history and as players build up rep with the community and puzzle building, they can request to move up a rank (this may eventually be automated, see further below). There will also be a cap on the amount of puzzles an individual can make per month based on level, TBD later.
                                     </p>
                                     <p>
                                     Upon approval of a puzzle creation DAO, funds from the creator and the $COIN fund are deposited in a prize wallet and development can begin.
Development of community based puzzles is subject to periodic testing and audit by Blockade’s puzzle test team. Blockade is committed to quality over quantity and will not release broken puzzles.
                                     </p>
                            </Container>
                        </Segment>
                    </Tilt>
                </Grid.Row>

                <Grid.Row className="pad" centered>
                    <Tilt className="Tilt">
                        <Segment className="pVote" textAligned="center">
                            <h1>
                                Voting
                            </h1>
                            <Container text>
                                <p>
                                When a community built puzzle is completed (solved), the smart contract also creates a vote to gauge a team of pre-nominated community puzzle raters on its quality. Members of this curated team of 15–20 people can vote on a number of categories to express their satisfaction with the quality of the puzzle. Being a member of the puzzle rating board does not preclude eligibility in solving community puzzles.
                                     </p>
                                     <p>
                                     Puzzle creators who receive an average of a X (TBD) rating from the puzzle ratings board after having released 3 puzzles will have 100% of their Upfront costs paid up to that point returned to them (in $COIN).
                                     </p>
                                     <p>
                                     Each subsequent puzzle launched by the creator from then on that results in their average puzzle rating remaining over a X (TBD) will receive a bonus of an additional 10% of their upfront cost for that puzzle paid to them (in $COIN).
                                     </p>
                                     <p>
                                     There are additional policies to address, and we’ll work to resolve identifiable fringe cases as they arise.
                                     </p>
                            </Container>
                        </Segment>
                    </Tilt>
                </Grid.Row>
            </Grid>
        </Container>
    )
}
export default PuzzleInfo;