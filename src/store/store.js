import React, { createContext, Component } from 'react';

export const StoreContext = createContext();

// Class component for storing and updating shared states
export class Store extends Component {
    constructor() {
        super();
        this.state = {
            store: {
                wallet: false,

            },
            actions: {
                addWallet: wallet => this.setState({ store: { ...this.state.store, wallet: wallet } }),
            }
        };
    }
    render() {
        return (
            <StoreContext.Provider value={this.state}>
                {this.props.children}
            </StoreContext.Provider>
        );
    }
}