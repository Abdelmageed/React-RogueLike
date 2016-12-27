import React from 'react'
import { TILE_SIZE } from './World.js'
import { TileType } from './Map.js'
const Tile = (props) => {
    const bgColor = (props.type === TileType.WALKABLE)?'white':'grey'
    const style = {
        backgroundColor: bgColor,
        left: (props.x * TILE_SIZE),
        bottom: (props.y * TILE_SIZE),
        width: TILE_SIZE, height: TILE_SIZE,
        position: 'absolute',
        zIndex: 1
    }
    return (<div style={style} />)
}
            
export default Tile            