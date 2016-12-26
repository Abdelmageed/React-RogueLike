import React from 'react';
import '../Hero.css';
const HeroComp = function (props){
    const style = {
        left: props.position.x,
        bottom: props.position.y,
        width: props.width,
        height: props.height
    }
    return (<div className="hero"  style={style} />)
}
export default HeroComp