import React from 'react'
import { TileInfo } from '../Containers/TileInfo'
export const HUD = (props) => {
    const style = {height:props.height, position: 'absolute'}
    return (
        <div style={style} id='hud'>
            <TileInfo />
        </div>)
    
}