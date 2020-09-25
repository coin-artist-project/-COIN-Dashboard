import React from 'react';
import { Modal, Header } from "semantic-ui-react"

// Error display
function Errors(props) {
    return (
        <Modal
            size="tiny"
            onClose={() => props.states.setError(false)}
            open={Boolean(props.states.isError)}
        >
            <Modal.Content scrolling={true}>
                <h2>ERROR!</h2>
                {props.states.isError}
            </Modal.Content>
        </Modal>
    )
}
export default Errors;