export const MOVE = 'MOVE'

export function move(position){
    return { type: MOVE, position }
}