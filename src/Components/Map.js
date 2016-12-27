import React from 'react'
import { Map as MapGenerator} from  '../Map.js'
import '../Map.css'
import { TILE_SIZE } from '../World.js'
import Tile from '../Tile.js'

const Map = (props) => {
    const rows = 40, cols = 50
    const map = new MapGenerator (rows, cols)
    const tileComps = map.tiles.map ((tile)=>{
        return (<Tile x={tile.x} y={tile.y} type={tile.type} key={tile.x + ' ' + tile.y}/>)
    })
    
    const style = {
        width: (cols * TILE_SIZE),
        height: (rows * TILE_SIZE),
    } 
    return (<div style={style} className="Map">
                {tileComps}
            </div>)
}
export default Map            