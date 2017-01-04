import React from 'react'
import { TileInfo } from '../Containers/TileInfo'
import { HealthBar } from '../Containers/HealthBar'

//TODO add an xp bar
export const HUD = (props) => {
    const style = {height:props.height, position: 'absolute'}
    return (
        <div style={style} id='hud'>
            <HealthBar />
            <TileInfo />
        </div>)
    
}