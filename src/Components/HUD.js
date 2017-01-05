import React from 'react'
import { TileInfo } from '../Containers/TileInfo'
import { HealthBar } from '../Containers/HealthBar'

export const HUD = (props) => {
    const style = {height:props.height, position: 'absolute'}
    return (
        <div style={style} id='hud'>
            <HealthBar />
            <TileInfo />
        </div>)
    
}