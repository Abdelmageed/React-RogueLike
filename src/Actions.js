export const INTERACT = 'INTERACT'
export const RESIZE = 'RESIZE'

export function interact(position){
    return { type: INTERACT, position }
}

export function resize (camera){
    return {type: RESIZE, camera}
}