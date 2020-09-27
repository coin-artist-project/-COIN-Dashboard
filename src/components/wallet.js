import React, { useContext } from 'react';
import { Icon, Segment, Button } from "semantic-ui-react";

import Web3Modal from "web3modal";
import Web3Adapter from '../utils/web3Adapter.js';
import { StoreContext } from "../store/store.js";

function Wallet(props) {
    const { store, actions } = useContext(StoreContext);

    const connect = async () => {
        if (!window.ethereum) {
            return;
        }
        const providerOptions = {};
        const web3Modal = new Web3Modal({
            network: '*',
            cacheProvider: false,
            providerOptions
        });

        const provider = await web3Modal.connect();
        if (!provider) {
            return;
        }

        if (window.ethereum) {
            window.ethereum.autoRefreshOnNetworkChange = false;
        }

        let web3Adapter = new Web3Adapter(provider, adapterCb);
        await web3Adapter.init()

        actions.addWallet(web3Adapter);
    }

    const adapterCb = async(event, data) => {
        await props.states.setLoading(false);
        switch (event) {
            case 'success':
                await props.states.setUpdateView(true);
                break;;
            case 'wait':
                props.states.setLoading(data);;
                return;;
            case 'error':
                props.states.setError(data);;
                break;;
            default:
                // /console.log(event)
        }
        
    }

    const status = () => {
        if (!store.wallet) {
            return (
                <>
                    <Button inverted color="teal" onClick={() => connect()}>{">"}Connect Wallet</Button>
                </>
            )
        } else {
            return (
                <>
                    <p><Icon size="large" color="green" name="wifi"></Icon>{store.wallet.selectedAddress ? " " + store.wallet.selectedAddress.substring(0, 6) + "..." + store.wallet.selectedAddress.substring(store.wallet.selectedAddress.length - 4) : " Connecting..."}</p>
                </>
            )
        }
    }
    return (
        <>
        { status() }
        </>
    )
}
export default Wallet;