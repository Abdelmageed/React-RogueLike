import React from 'react'
import { VISION_RADIUS, TILE_SIZE} from '../World.js'
const TileComp = (props) => {
    const tile = props.map.getTileByID (props.id)
    let diff = {x: tile.x - props.heroPosition.x, y: tile.y - props.heroPosition.y}
    let visible = ( Math.sqrt(diff.x * diff.x + diff.y * diff.y) ) <=    VISION_RADIUS

    var style = (visible)?tile.style:tile.darkStyle
    //creating new object in render() doesn't seem to always trigger a redraw.
        style = Object.assign ({},style, {left: (tile.x - props.cameraX) * TILE_SIZE,
                                    bottom: (tile.y - props.cameraY) * TILE_SIZE})
    return (<div style={style} />)
}
            
export default TileComp            