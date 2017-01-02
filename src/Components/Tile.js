import React from 'react'
import { VISION_RADIUS, TileType} from '../World.js'
//import { TILE_SIZE } from '../Camera.js'
//console.log (TILE_SIZE)
const TileComp = (props) => {
    const tile = props.map.getTileByID (props.id)

    const lightStyle = {                    
                    left: (tile.x - props.cameraX) * props.TILE_SIZE,
                    bottom: (tile.y - props.cameraY) * props.TILE_SIZE,
                    width: props.TILE_SIZE, height: props.TILE_SIZE,
                    position: 'absolute',
                    backgroundColor: (tile.type === TileType.WALKABLE)?'white':'grey',
                    zIndex: 1
                }
    const darkStyle = Object.assign ({}, lightStyle, {backgroundColor: 'black'}, {zIndex:4})
    
    let diff = {x: tile.x - props.heroPosition.x, y: tile.y - props.heroPosition.y}
    let visible = ( Math.sqrt(diff.x * diff.x + diff.y * diff.y) ) <= VISION_RADIUS

    var style = (visible)?lightStyle:darkStyle
    //creating new object in render() doesn't seem to always trigger a redraw.
    return (<div style={style} />)
}
            
export default TileComp            