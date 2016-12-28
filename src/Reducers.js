import { TileType } from './Map.js'
import { mapGenerator } from './Components/Map.js'
import { scroll } from './Scroller.js'
import {MOVE} from './Actions.js'

export function hero (state, action) {
    switch (action.type) {
        case MOVE: {
            let newPosition = {x: state.position.x + action.position.x,
                                y: state.position.y + action.position.y}
            let tile = mapGenerator.getTile (newPosition.x, newPosition.y)
            
            if (tile && tile.type === TileType.WALKABLE) {
                scroll (newPosition.x, newPosition.y)
                return Object.assign ({}, state, {position: newPosition})    
            }
            else {
                return state
            }
        }
        default: {
            return state;
        }
    }
}