import React from 'react'
import { Map as MapGenerator} from  '../Map.js'
import '../Map.css'
import { TILE_SIZE } from '../World.js'
import Tile from '../Tile.js'
import Hero from '../Containers/Hero.js'
const rows = 40, cols = 50
export const mapGenerator = new MapGenerator (rows, cols)
const Map = (props) => {
    
    const tileComps = mapGenerator.tiles.map ((tile)=>{
        return (<Tile x={tile.x} y={tile.y} type={tile.type} key={tile.x + ' ' + tile.y}/>)
    })
    
    const style = {
        width: (cols * TILE_SIZE),
        height: (rows * TILE_SIZE),
        position: 'relative'
    } 
    return (<div style={style} className="Map">
                {tileComps}
                <Hero width={TILE_SIZE} height={TILE_SIZE}/>

            </div>)
}
export default Map            