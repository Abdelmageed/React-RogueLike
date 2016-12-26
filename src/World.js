import './Map.css'

export const cols = 50
export const rows = 10
export const WALKABLE = 'WALKABLE'
export const WALL = 'WALL'
export const TILE_SIZE = 20
export const HERO_SPEED = 25           //tiles per second
export function initializeMap(){
    var map = new Array (rows)
    for (let i = 0; i < rows; i++){
        map[i] = new Array (cols)
        for (let j = 0; j < cols; j++){
            map[i][j] = WALKABLE
        }
    }
    map[rows / 2][cols / 2] = WALL
    return map
}
export function initializeHero () {
    let startPosition = {x: 0, y: 0}
    return {position:startPosition}
}