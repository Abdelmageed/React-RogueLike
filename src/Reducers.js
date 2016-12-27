import { initializeHero} from './World.js'
import { TileType } from './Map.js'
import { mapGenerator } from './Components/Map.js'
const heroInit = initializeHero()
import {MOVE} from './Actions.js'

//console.log (Map.init)
export function hero (state = heroInit, action) {
    switch (action.type) {
        case MOVE: {
            let newPosition = {x: state.position.x + action.position.x,
                                y: state.position.y + action.position.y}
            let tile = mapGenerator.getTile (newPosition.x, newPosition.y)
            
            return (tile && tile.type === TileType.WALKABLE)?
                Object.assign ({}, state, {position: newPosition}):
                state
        }
        default: {
            return state;
        }
    }
}