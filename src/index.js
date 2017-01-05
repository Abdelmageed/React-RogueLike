import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import {
    Provider
}
from 'react-redux'
import {
    createStore
}
from 'redux'
import {
    game
}
from './Reducers'
    //import { move } from './Actions'
    import { getHeroStats } from './World'
import {
    levels
}
from './Levels'
import {
    setCamera
}
from './Camera'
import './Movement';
import './index.css';

const heroStats = getHeroStats (0)
const hero = {
        position: levels[0].startPosition,
        health: heroStats.maxHealth,
        maxHealth: heroStats.maxHealth,
        damage: heroStats.damage,
        xpToNext: heroStats.xpToNext,
        xp: 0,
        level: 0
    }
const camera = setCamera()
export const store = createStore(game, Object.assign(
    //    {hero: hero}, 
    {
        camera: camera
    }, {
        world: {
    levels: levels,
    activeLevel: 0,
    hero: hero,
    hud: {
        tileInfo: ''
    }
}
    }
))

ReactDOM.render( < Provider store={store} >
    < App / >
    < /Provider>,
    document.getElementById('root')
);
//store.dispatch (move({x:0, y:0}))

export default store
