import { TileType } from './Map.js'
import { mapGenerator } from './Components/Map.js'
import { combineReducers } from 'redux'
//import { scroll } from './Scroller.js'
import {MOVE, RESIZE} from './Actions.js'

function hero (state = {position:{x:0, y:0}}, action) {
    switch (action.type) {
        case MOVE: {
            let newPosition = {x: state.position.x + action.position.x,
                                y: state.position.y + action.position.y}
            let tile = mapGenerator.getTile (newPosition.x, newPosition.y)
            
            if (tile && tile.type === TileType.WALKABLE) {
//                scroll (newPosition.x, newPosition.y)
                return Object.assign ({}, state, {position: newPosition})    
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

export const game = combineReducers ({
    hero,
    camera
})