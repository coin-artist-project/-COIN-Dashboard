import React, { useEffect, useContext, useState } from 'react';
import { Button, Container, Grid, Card, Segment, Icon, Form, Input } from "semantic-ui-react"
import Tilt from 'react-tilt'
import Scramble from 'react-scramble'
import { StoreContext } from "../store/store.js";
import {
  Redirect
} from 'react-router-dom'
import farmList from "../data/nftFarms.js";

function Farm(props) {
  const { store } = useContext(StoreContext);
  const [staking, setStaking] = useState(0)
  const [farm, setFarm] = useState("");
  const [shardToken, setShardToken] = useState("");
  const [farmId, setFarmId] = useState("");
  const [updateView, setUpdateView] = useState(false);
  const [buyoutDetails, setBuyoutDetails] = useState(false);

  useEffect(() => {
    setFarm("");
    setFarmId("");
    if (props.match && props.match.params && props.match.params.id) {
      if (farmList.hasOwnProperty(props.match.params.id) >= 0) {
        setFarmId(props.match.params.id)
        setFarm(farmList[props.match.params.id].token);
        setShardToken(farmList[props.match.params.id].shardToken);
      }
      else {
        setFarm("farm")
      }
    }
    if (updateView) {
      setUpdateView(false)
    }
  }, [props, updateView])

  const getBuyoutDetails = async (farmId) => {
    if (store && store.wallet && !buyoutDetails && farmId) {
      console.log("Retrieving buyout details for farm:", farmId);
      setBuyoutDetails({"loading":true});
      setBuyoutDetails(await store.wallet.getBuyoutDetails(farmId));
    }
  }

  const handleStakeChange = (e) => {
    setStaking(e.target.value)
  }

  const submitStake = () => {
    if (staking) {
      store.wallet.stakeFarm(staking, farmId);
    } else {
      store.wallet.stakeFarm(store.wallet.balances[farmId], farmId);
    }
  };

  const refresh = () => {
    if (store.wallet) {
      return (
        <Button color="blue" onClick={() => store.wallet.update()} inverted icon><Icon color="blue" name="refresh" />Update Balances</Button>
      )
    }
    return (
      <></>
    )
  }
  const exit = () => {
    if (!store.wallet.balances[farmId + "-UNI"] || store.wallet.balances[farmId + "-UNI"] === "0") {
      return (
        <Grid.Column width={4} centered="true">
          <Card textAligned="center" className="outerCard" centered>
            <Tilt className="Tilt">
              <Segment.Group textAligned="center" className="Term">
                <Grid.Row className="pad" centered>
                  <Grid.Column textAlign="center">
                    <Icon size="massive" color="red" name="sign-out" />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row className="pad" centered>
                  <Grid.Column textAlign="center">
                    <h3>Exit();</h3>
                    <p>----</p>
                    <p>No stake to exit</p>
                  </Grid.Column>
                </Grid.Row>
              </Segment.Group>
            </Tilt>
          </Card>
        </Grid.Column>
      )
    }
    return (
      <Grid.Column width={4} centered="true">
        <Card textAligned="center" className="outerCard" centered>
          <Tilt className="Tilt">
            <Segment.Group textAligned="center" className="Term">
              <Grid.Row className="pad" centered>
                <Grid.Column textAlign="center">
                  <Icon size="massive" color="red" name="sign-out" />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row className="pad" centered>
                <Grid.Column textAlign="center">
                  <h3>Exit();</h3>
                  <p>----</p>
                  <p>Leave pool with rewards and stake</p>
                  <Button inverted color="red" onClick={() => store.wallet.exitFarm(farmId)}>Exit</Button>
                </Grid.Column>
              </Grid.Row>
            </Segment.Group>
          </Tilt>
        </Card>
      </Grid.Column>
    )
  }

  const buyoutDisp = () => {
      let buyoutStatus = "Not Yet Enabled";
      let buyoutButton = "";
      if (buyoutDetails && buyoutDetails.hasOwnProperty('enabled') && buyoutDetails.enabled) {
        buyoutStatus = "Enabled";
        buyoutButton = (
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <a href={"https://www.niftex.com/nftClaim/initial-claim/" + (farmList && farmList[farmId] && farmList[farmId]["shardToken"])} target="_blank">
                <Button inverted color="green">{">"}Make Claim</Button>
              </a>
            </Grid.Column>
          </Grid.Row>
        );

        if (buyoutDetails.active) {
          buyoutStatus = "In Progress!";
          buyoutButton = (
            <Grid.Row className="pad" centered>
              <Grid.Column textAlign="center">
                <a href={"https://www.niftex.com/nftClaim/details/" + (farmList && farmList[farmId] && farmList[farmId]["shardToken"])} target="_blank">
                  <Button inverted color="green">{">"}View Claim / Buyout</Button>
                </a>
              </Grid.Column>
            </Grid.Row>
          );
        }
      }

      return (
        <Segment.Group textAligned="center" className="Term">
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <Icon size="massive" color="green" name="cart arrow down" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <h3>Buyout();</h3>
              <p>----</p>
              <p>{buyoutStatus}</p>
            </Grid.Column>
          </Grid.Row>
          {buyoutButton}
        </Segment.Group>
      )
  }

  const stakingDisp = () => {
    if (
      (!store.wallet.balances[farmId + "-UNI"] && !store.wallet.balances[farmId]) ||
      (store.wallet.balances[farmId] == "0" && store.wallet.balances[farmId + "-UNI"] === "0")
    ) {
      return (
        <Segment.Group textAligned="center" className="Term">
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <Icon size="massive" color="green" name="save outline" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <h3>Staking();</h3>
              <p>----</p>
              <p>Buy {farm} to start staking</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <a href={"https://app.uniswap.org/#/swap?inputCurrency=" + (farmList && farmList[farmId] ? farmList[farmId]["tokenContract"]["mainnet"] : "")} target="_blank">
                <Button inverted color="green">{">"}Go to Uniswap</Button>
              </a>
            </Grid.Column>
          </Grid.Row>
        </Segment.Group>
      )
    }
    else if (!store.wallet.balances[farmId + "-UNI"] || store.wallet.balances[farmId + "-UNI"] === "0") {
      return (
        <Segment.Group textAligned="center" className="Term">
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <Icon size="massive" color="green" name="save outline" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <h3>Staking();</h3>
              <p>----</p>
              <p>Available: {((Math.floor(parseFloat(store.wallet.balances[farmId]) * 1000000)) / 1000000).toFixed(6)}</p>
              <Form>
                <Form.Field>
                  <p>Amount to stake</p>
                  <Input fluid>
                    <input value={staking} onChange={(e) => handleStakeChange(e)} placeholder={store.wallet.balances[farmId]} />
                    <Button onClick={() => setStaking(store.wallet.balances[farmId])} inverted color="yellow" >Max</Button>
                  </Input>
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <Button inverted onClick={submitStake.bind(this)} color="green">{">"}Start</Button>
            </Grid.Column>
          </Grid.Row>
        </Segment.Group>
      )
    }
    else if (store.wallet.balances[farmId] == "0") {
      return (
        <Segment.Group textAligned="center" className="Term">
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <Icon size="massive" color="green" name="save outline" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <h3>Staking();</h3>
              <p>----</p>
              <p>Staking: {((Math.floor(parseFloat(store.wallet.balances[farmId + "-UNI"]) * 1000000)) / 1000000).toFixed(6)}</p>
              <p>{((Math.floor(parseFloat(store.wallet.stats[farmId + "-userStaked"]) * 1000000)) / 1000000).toFixed(2)}% Staked Total</p>
            </Grid.Column>
          </Grid.Row>
        </Segment.Group>
      )
    }
    else {
      return (
        <Segment.Group textAligned="center" className="Term">
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <Icon size="massive" color="green" name="save outline" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <h3>Staking();</h3>
              <p>----</p>
              <p>Staking: {((Math.floor(parseFloat(store.wallet.balances[farmId + "-UNI"]) * 1000000)) / 1000000).toFixed(6)}</p>
              <p>{((Math.floor(parseFloat(store.wallet.stats[farmId + "-userStaked"]) * 1000000)) / 1000000).toFixed(2)}% Staked Total</p>
              <p>----</p>
              <p>Available: {((Math.floor(parseFloat(store.wallet.balances[farmId]) * 1000000)) / 1000000).toFixed(6)}</p>
              <Form>
                <Form.Field>
                  <p>Amount to add</p>
                  <Input fluid>
                    <input value={staking} onChange={(e) => handleStakeChange(e)} placeholder={store.wallet.balances[farmId]} />
                    <Button onClick={() => setStaking(store.wallet.balances[farmId])} inverted color="yellow" >Max</Button>
                  </Input>

                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <Button inverted onClick={submitStake.bind(this)} color="green">{">"}Add</Button>
            </Grid.Column>
          </Grid.Row>
        </Segment.Group>
      )
    }
  }

  const rewardDisp = () => {
    if (!store.wallet[farmId + "-rewards"] || store.wallet[farmId + "-rewards"] == 0 || store.wallet[farmId + "-rewards"] == "0") {
      return (
        <Segment.Group textAligned="center" className="Term">
          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <Icon size="massive" color="blue" name="sync" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="pad" centered>
            <Grid.Column textAlign="center">
              <h3>Rewards();</h3>
              <p>----</p>
              <p>No NFT shards to claim</p>

            </Grid.Column>
          </Grid.Row>
        </Segment.Group>
      )
    }

    let percTotalSupply = "";
    if (farmId && farmList.hasOwnProperty(farmId) && farmList[farmId].hasOwnProperty('totalSupply')) {
      let totalSupply = farmList[farmId].totalSupply;
      percTotalSupply = (
        <p>% of NFT: {((Math.floor(parseFloat(store.wallet[farmId + "-rewards"]))) / totalSupply * 100).toFixed(4)}%</p>
      );
    }

    return (
      <Segment.Group textAligned="center" className="Term">
        <Grid.Row className="pad" centered>
          <Grid.Column textAlign="center">
            <Icon size="massive" color="blue" name="sync" />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="pad" centered>
          <Grid.Column textAlign="center">
            <h3>Rewards();</h3>
            <p>----</p>
            <p>NFT Shards: {(Math.floor(parseFloat(store.wallet[farmId + "-rewards"])))}</p>
            {percTotalSupply}

          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="pad" centered={true}>
          <Grid.Column textAlign="center">
            <Button inverted onClick={() => store.wallet.collectRewardFarm(farmId)} color="blue">{">"}Collect</Button>
          </Grid.Column>
        </Grid.Row>
      </Segment.Group>
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

    let stakingOrBuyout;

    let now = (Date.now()) / 1000;
    let fishTime = store.wallet &&
      store.wallet.stats &&
      store.wallet.stats[farmId + "-fishTime"] &&
      parseInt(store.wallet.stats[farmId + "-fishTime"], 10);
    if (fishTime && now >= fishTime) {
      stakingOrBuyout = buyoutDisp(farmId);
    } else {
      stakingOrBuyout = stakingDisp();
    }

    return (
      <>
        <Grid.Row centered={true} columns={2}>
          <Grid.Column width={4} centered="true">
            <Container fluid>
              <Card textAligned="center" className="outerCard" centered={true}>
                <Tilt className="Tilt">
                  {rewardDisp()}
                </Tilt>
              </Card>
            </Container>
          </Grid.Column>

          <Grid.Column width={4} centered="true">
            <Card textAligned="center" className="outerCard" centered>
              <Tilt className="Tilt">
                {stakingOrBuyout}
              </Tilt>
            </Card>
          </Grid.Column>
          {exit()}
        </Grid.Row>
      </>

    )
  }

  let nftImage = "", linkButtons = "";
  if (farmId && farmList.hasOwnProperty(farmId)) {
    nftImage = (
      <p><img src={farmList[farmId].nftImage} height="256" /></p>
    );
    linkButtons = (
      <>
        <a href={farmList[farmId].niftex} target="_blank"><Button color="green" inverted icon><Icon color="green" name="chart line" />Niftex</Button></a>
        <a href={farmList[farmId].opensea} target="_blank"><Button color="green" inverted icon><Icon color="green" name="image outline" />OpenSea</Button></a>
      </>
    );
  }

  const timeConverter = (unixTimestamp) => {
    let a = new Date(unixTimestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = month + ' ' + date + ' at ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  let timeInfo = "";
  let now = (Date.now()) / 1000;
  let fishTime = store.wallet &&
    store.wallet.stats &&
    store.wallet.stats[farmId + "-fishTime"] &&
    parseInt(store.wallet.stats[farmId + "-fishTime"], 10);
  if (fishTime && now < fishTime) {
    timeInfo = (<p>{"Farm Ends " + timeConverter(fishTime)}</p>);
  } else if (fishTime && now >= fishTime) {
    timeInfo = (<p>{"Farm Ended " + timeConverter(fishTime)}</p>);
    getBuyoutDetails(farmId);
  } else if (store.wallet && store.wallet.stats && store.wallet.stats.hasOwnProperty(farmId + "-fishTime")) {
    timeInfo = (<p>Farm Starts Nov 15 at 17:00 UTC</p>);
  }

  if (farm === "farm") {
    return (
      <Redirect to="/farm" />
    )
  }
  else {
    return (
      <Container fluid>
        <Grid className="mainView" verticalAlign="middle" stackable={true} divided='vertically'>
          <Grid.Row className="pad" centered>
            <Tilt className="Tilt">
              <Segment className="calmHead" textAligned="center">
                <h1>
                  <Scramble
                    autoStart
                    text={farm + " FARM"}
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
                <p>{store.wallet && store.wallet.balances[farmId.toLowerCase()] ? (farm + " Balance: " + ((Math.floor(parseFloat(store.wallet.balances[farmId.toLowerCase()]) * 1000000)) / 1000000).toFixed(6)) : ""}</p>
                <p>{store.wallet && store.wallet.balances[(farmId.toLowerCase() + "-SHARD")] ? (shardToken + " Balance: " + ((Math.floor(parseFloat(store.wallet.balances[(farmId.toLowerCase() + "-SHARD")]) * 1000000)) / 1000000).toFixed(6)) : ""}</p>
                {timeInfo}
                {nftImage}
                {linkButtons}
                {refresh()}
              </Segment>
            </Tilt>
          </Grid.Row>
          {statDisp()}
        </Grid>
      </Container>
    );
  }
}
export default Farm;