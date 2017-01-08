export const INTERACT = 'INTERACT'
export const RESIZE = 'RESIZE'
export const INITIALIZE = 'INITIALIZE'
export const SHOW_INSTRUCTIONS = 'SHOW_INSTRUCTIONS'
export const HIDE_INSTRUCTIONS = 'HIDE_INSTRUCTIONS'
export const HIDE_END_GAME = 'HIDE_END_GAME'

export function interact(position){
    return { type: INTERACT, position }
}
export function resize (camera){
    return {type: RESIZE, camera}
}
export function initialize () {
    return { type: INITIALIZE}
}

export function showInstructions () {
    return { type: SHOW_INSTRUCTIONS }
}

export function hideInstructions () {
    return { type: HIDE_INSTRUCTIONS }
}
export function hideEndGameModal () {
    return { type: HIDE_END_GAME }
}