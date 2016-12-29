import React from 'react'
import { TILE_SIZE, VISION_RADIUS } from '../World.js'
const FogTileComp = (props) => {
    
    let visible = true
    let bgColor = (visible)?'#0000':'black'
    let style = {
        backgroundColor: bgColor,
        left: (props.x * TILE_SIZE),
        bottom: (props.y * TILE_SIZE),
        width: TILE_SIZE, height: TILE_SIZE,
        position: 'absolute',
        zIndex: 4
    }
    return (<div style={style}/>)
}

export default FogTileComp