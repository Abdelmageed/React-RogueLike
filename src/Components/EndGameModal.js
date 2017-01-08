import React from 'react'
import { Modal } from 'react-bootstrap'
export const EndGameModal = (props) => {
    const title = (props.win) ? 'You win' : 'You died',
        body = (props.win) ? 'Another go?' : 'Better luck next time.',
        color = (props.win) ? '#5cb85c' : '#d9534f'
    return (<Modal show={props.show} onHide={props.hide}>
            <Modal.Header style={{backgroundColor:color}}>
                <Modal.Title >{title}</Modal.Title>
            </Modal.Header>    
            <Modal.Body>{body}</Modal.Body>
            </Modal>)
}