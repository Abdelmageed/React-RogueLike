import React from 'react'
import { TileInfo } from '../Containers/TileInfo'
import { StatsBar } from '../Containers/StatsBar'

export const HUD = (props) => {
    const style = {height:props.height, position: 'absolute'}
    return (
        <div style={style} id='hud'>
            <StatsBar />
            <TileInfo />
        </div>)
    
}