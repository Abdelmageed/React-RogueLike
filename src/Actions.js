export const INTERACT = 'INTERACT'
export const RESIZE = 'RESIZE'
export const INITIALIZE = 'INITIALIZE'
export const SHOW_INSTRUCTIONS = 'SHOW_INSTRUCTIONS'
export const HIDE_INSTRUCTIONS = 'HIDE_INSTRUCTIONS'
export const HIDE_WIN = 'HIDE_WIN'
export const HIDE_LOSE = 'HIDE_LOSE'
export const SHOW_LOSE = 'SHOW_LOSE'
export const SHOW_WIN = 'SHOW_WIN'

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

export function showWin () {
    return { type: SHOW_WIN }
}

export function showLose () {
    return { type: SHOW_LOSE }
}
export function hideWin () {
    return { type: HIDE_WIN }
}

export function hideLose () {
    return { type: HIDE_LOSE }
}