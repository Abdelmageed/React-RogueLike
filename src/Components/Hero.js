import React from 'react';
import '../Hero.css';
const HeroComp = function (props){
    const style = {
        left: (props.position.x - props.cameraX) * props.TILE_SIZE,
        bottom: (props.position.y - props.cameraY) * props.TILE_SIZE,
        width: props.TILE_SIZE,
        height: props.TILE_SIZE
    }
    return (<div className="hero"  style={style} />)
}
export default HeroComp