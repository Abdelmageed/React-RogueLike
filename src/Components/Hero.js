import React from 'react';
import '../Hero.css';
import { TILE_SIZE } from '../World.js'
const HeroComp = function (props){
    const style = {
        left: (props.position.x - props.cameraX) * TILE_SIZE,
        bottom: (props.position.y - props.cameraY) * TILE_SIZE,
        width: props.width,
        height: props.height
    }
    return (<div className="hero"  style={style} />)
}
export default HeroComp