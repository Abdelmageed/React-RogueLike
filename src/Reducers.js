import { TileType } from './World.js'
import { combineReducers } from 'redux'
import {MOVE, RESIZE} from './Actions.js'

function camera (state = {width:0,height:0}, action) {
    switch (action.type) {
        case RESIZE: {
//            console.log (action.camera)
            return Object.assign ({}, state, action.camera)
        }
        default: {
            return state
        }
    }
}

function world (state = {}, action) {
    switch (action.type) {
        case MOVE: {
            let position = state.hero.position
            let newPosition = {x: position.x + action.position.x,
                                y: position.y + action.position.y}
            let tile = state.levels[state.activeLevel].getTile (newPosition.x, newPosition.y)
            
            if (tile && tile.type === TileType.WALKABLE) {
                console.log (newPosition)
                return Object.assign ({}, state, {hero:
                                                 Object.assign ({}, state.hero, {position: newPosition})}
                                     )    
            }
            else {
                return state
            }
        }
        default: {
            return state
        }
    }
}

export const game = combineReducers ({
    camera,
    world
})