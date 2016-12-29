import './Map.css'

export const cols = 200
export const rows = 100
export const WALKABLE = 'WALKABLE'
export const WALL = 'WALL'
export const TILE_SIZE = 20
export const HERO_SPEED = 25           //tiles per second
export const VISION_RADIUS = 4
export function initializeHero () {
    let startPosition = {x: 0, y: 36}
    return {position:startPosition}
}