import React from 'react';
import { Container, Grid, Segment, List } from "semantic-ui-react"
import Tilt from 'react-tilt'
import Scramble from 'react-scramble'
// Charter page
function Charter(props) {
    return (
        <Container fluid>
            <Grid className="mainView" verticalAlign="middle" stackable={true} divided='vertically'>
                <Grid.Row className="pad" centered>
                    <Tilt className="Tilt">
                        <Segment compact={false} padded={true} textAligned="center">
                            <h1>
                                <Scramble
                                    autoStart
                                    text="$Community Charter"
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
                            <Container fluid={true} text textAlign="left">
                                <p>
                                    Coin’s E-Den is a social experiment in tokenizing the personal brand of Marguerite deCourcelle (aka coin_artist). Holders of the $COIN token form a unique Syndicate of cyberpunk enthusiasts within the fictional universe of Neon District. This Syndicate is a closed social network of individuals who collectively share the coin_artist brand identity. Syndicate members, therefore, represent the interests of coin_artist’s projects and influence the direction of these projects via shared governance and strategic planning.
                                    The Syndicate, as a community, values social inclusion and experimentation within the scope of co-operative gaming, decentralized finance, token gamification, and NFT reward distribution mechanisms. The Syndicate’s primary goal is to establish a community where creativity is encouraged to produce a rich and vibrant atmosphere within a gamified social network.
                                    For consistent messaging and to guide future decisions within the community, the Syndicate has adopted the following mission, vision, and core values.
                                </p>
                                <h2>Why does Coin’s E-Den exist?</h2>
                                <p>To promote creativity and experimentation with the coin_artist brand</p>
                                <p>The coin_artist brand is cyberpunk, creating virtual experiences, encouraging play and education with blockchain technology, collaboration, and pushing the boundaries of what is possible.</p>
                                <h2>What does the E-Den aim to accomplish or establish?</h2>
                                <p>A community of inclusion and experimentation scaffolded by a gamified social network</p>
                                <h2>How should future decision-making be guided?</h2>
                                <List bulleted>
                                    <List.Item as="p">We put our mission first</List.Item>
                                    <List.Item as="p">We honor other Syndicate members as our most valuable resource</List.Item>
                                    <List.Item as="p">We pursue innovation and intrepid experimentation</List.Item>
                                    <List.Item as="p">We embrace diversity and strive for social inclusion</List.Item>
                                    <List.Item as="p">We act with respect and integrity</List.Item>
                                </List>
                            </Container>
                        </Segment>
                    </Tilt>
                </Grid.Row>
            </Grid>
        </Container>
    )
}
export default Charter;