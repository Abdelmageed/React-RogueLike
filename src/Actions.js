export const MOVE = 'MOVE'
export const RESIZE = 'RESIZE'

export function move(position){
    return { type: MOVE, position }
}

export function resize (camera){
    return {type: RESIZE, camera}
}