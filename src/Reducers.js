import { TileType } from './World.js'
import { combineReducers } from 'redux'
import {INTERACT, RESIZE} from './Actions.js'

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
        case INTERACT: {
            let position = state.hero.position
            let newPosition = {x: position.x + action.position.x,
                                y: position.y + action.position.y}
            let tile = state.levels[state.activeLevel].getTile (newPosition.x, newPosition.y)
            
            return interactWithTile (tile, state)
//            else {
//                return state
//            }
        }
        default: {
            return state
        }
    }
}

function interactWithTile (tile, state) {
    if (!tile) { return state }
    switch (tile.type) {
        case TileType.WALKABLE: {
            return Object.assign ({}, state, {hero:Object.assign (
                {}, state.hero, {position: {x:tile.x, y:tile.y}})})  
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