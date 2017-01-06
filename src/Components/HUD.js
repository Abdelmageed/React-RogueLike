import React from 'react'
import { TileInfo } from '../Containers/TileInfo'
import { StatsBar } from '../Containers/StatsBar'
import { InstructionsButton } from '../Containers/InstructionsButton'
import { Modal } from 'react-bootstrap'
export const HUD = (props) => {
    const style = {height:props.camera.top * props.camera.TILE_SIZE
                  }
    return (
        <div style={style} id='hud'>
            <Modal show={props.showInstructions} onHide={props.hideInstructions}>
                <Modal.Header>        
                    <Modal.Title>Instructions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Use the arrow keys or 'WASD' to move. Move against enemies to attack. Collect green health pickups and weapons. Kill the boss on the last level to win.
                </Modal.Body>
            </Modal>
            <h3 style={{textAlign:'center'}}>React Roguelike</h3>
            <InstructionsButton />
            <StatsBar />
            <TileInfo />
        </div>)
    
}
//        <div style={{float:'right'}}>
//                <h4>Instructions</h4>
//                <span>Use the arrow keys or 'WASD' to move. Move against enemies to attack. Collect green health pickups and weapons. Kill the boss on the last level to win.</span>
//            </div>