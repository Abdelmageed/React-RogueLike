import React from 'react'
import { Button } from 'react-bootstrap'
export const InstructionsButton = (props) => {
    return (
        <Button style={{float:'right'}} onClick={props.onClick}>Instructions</Button>
    )
}