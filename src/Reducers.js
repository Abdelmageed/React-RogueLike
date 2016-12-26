import { initializeHero } from './World.js'

const heroInit = initializeHero()
import {MOVE} from './Actions.js'

export function hero (state = heroInit, action) {
    switch (action.type) {
        case MOVE: {
            let newPosition = {x: state.position.x + action.position.x,
                                y: state.position.y + action.position.y}
            return Object.assign ({}, state, {position: newPosition})
        }
        default: {
            return state;
        }
    }
}