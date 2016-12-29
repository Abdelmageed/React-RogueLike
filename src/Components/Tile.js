import React from 'react'
import { VISION_RADIUS, TILE_SIZE} from '../World.js'
//import { TileType } from '../Map.js'
import { mapGenerator } from './Map.js'
const TileComp = (props) => {
    const tile = mapGenerator.getTileByID (props.id)
    let visible = ((Math.abs(tile.x - props.heroPosition.x) + Math.abs(tile.y - props.heroPosition.y)) / 2) <=    VISION_RADIUS
//    let bgColor = (tile.type === TileType.WALKABLE)?'white':'grey'
//    bgColor = (visible)? bgColor : 'black'
//    let z = (visible)? 1 : 4
//    const style = {
//        backgroundColor: bgColor,
//        left: (tile.x * TILE_SIZE),
//        bottom: (tile.y * TILE_SIZE),
//        width: TILE_SIZE, height: TILE_SIZE,
//        position: 'absolute',
//        zIndex: z
        var style = (visible)?tile.style:tile.darkStyle
        style = Object.assign ({},style, {left: (tile.x - props.cameraX) * TILE_SIZE,
                                    bottom: (tile.y - props.cameraY) * TILE_SIZE})
//        style.left = 
//        style.bottom = 
//    }
    return (<div style={style} />)
}
            
export default TileComp            