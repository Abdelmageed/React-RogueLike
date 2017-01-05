export const INTERACT = 'INTERACT'
export const RESIZE = 'RESIZE'
export const INITIALIZE = 'INITIALIZE'

export function interact(position){
    return { type: INTERACT, position }
}
export function resize (camera){
    return {type: RESIZE, camera}
}
export function initialize () {
    return { type: INITIALIZE}
}