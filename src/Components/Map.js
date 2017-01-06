import React from 'react'
//import { Map as MapGenerator} from  '../Map.js'
import '../Map.css'
//import { TILE_SIZE } from '../Camera.js'
import TileComp from './Tile.js'
import HeroComp from './Hero.js'
//export const mapGenerator = new MapGenerator (rows, cols)

const MapComp = (props) => {
    
    const style = {
        width: (props.camera.width * props.camera.TILE_SIZE),
//        width: '100%',
        height: (props.camera.height * props.camera.TILE_SIZE),
        top: (props.camera.top * props.camera.TILE_SIZE),
        position: 'relative'
    } 
    const x = props.heroPosition.x - props.camera.width / 2,
          y = props.heroPosition.y - props.camera.height / 2
    var startX, startY
    if (props.map.cols - props.heroPosition.x < props.camera.width / 2)
        startX = props.map.cols - props.camera.width
    else if (props.heroPosition.x - props.camera.width / 2 < 0)
        startX = 0
    else
        startX = x
    if (props.map.rows - props.heroPosition.y < props.camera.height / 2)
        startY = props.map.rows - props.camera.height
    else if (props.heroPosition.y - props.camera.height / 2 < 0)
        startY = 0
    else
        startY = y
    startX = Math.round (startX)
    startY = Math.round (startY)
//    console.log (`x:${startX} y:${startY}`)
    const tileComps = props.map
        .getTileRect(startX, startY, props.camera.width, props.camera.height)
        .map ((tile)=>{
        const id = tile.x + ' ' + tile.y;
        return (<TileComp heroPosition={props.heroPosition} key={id} id={id} cameraX={startX} 
                cameraY={startY} map={props.map} TILE_SIZE={props.camera.TILE_SIZE}/>)
    })
//    console.log (props.heroPosition)
    return (
                <div style={style} id="Map">
                        {tileComps}
                        <HeroComp position={props.heroPosition} TILE_SIZE={props.camera.TILE_SIZE} cameraX={startX} cameraY={startY}/>
                </div>
    )
}
export default MapComp      