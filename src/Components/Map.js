/* eslint-disable */
import React from 'react'
import { Map as MapGenerator} from  '../Map.js'
import '../Map.css'
import { TILE_SIZE, rows, cols, VISION_RADIUS} from '../World.js'
import Tile from '../Containers/Tile.js'
//import FogTile from '../Containers/FogTile.js'
import Hero from '../Containers/Hero.js'
export const mapGenerator = new MapGenerator (rows, cols)
const MapComp = (props) => {
    
    const tileComps = mapGenerator.tiles.map ((tile)=>{
//        let visible = ((Math.abs(tile.x - props.heroPosition.x) + Math.abs(tile.y - props.heroPosition.y)) / 2) <=    VISION_RADIUS
        const id = tile.x + ' ' + tile.y;
        return (<Tile key={id} id={id}/>)
    })
//    const fogTiles = mapGenerator.fogTiles.map ((tile)=>{
//        return (<FogTile x={tile.x} y={tile.y} key={tile.x + ' ' + tile.y} />)
//    })
    const style = {
        width: (cols * TILE_SIZE),
        height: (rows * TILE_SIZE),
        position: 'relative'
    } 
    return (
            <div id="GameView">
                <div style={style} id="Map">
                        {tileComps}
                        <Hero width={TILE_SIZE} height={TILE_SIZE}/>
                </div>
            </div>
    )
}
export default MapComp      