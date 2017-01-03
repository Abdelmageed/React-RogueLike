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
    //import { initializeHero} from './World'
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

const hero = {
        position: levels[2].startPosition
    }
    //console.log (levels[1].startPosition)
const camera = setCamera()
export const store = createStore(game, Object.assign(
    //    {hero: hero}, 
    {
        camera: camera
    }, {
        world: {
            levels: levels,
            activeLevel: 2,
            hero: hero
        }
    }
))

ReactDOM.render( < Provider store = {
        store
    } >
    < App / >
    < /Provider>,
    document.getElementById('root')
);
//store.dispatch (move({x:0, y:0}))

export default store
