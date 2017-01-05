import './Map.css'

export const cols = 200
export const rows = 100
export const WALKABLE = 'WALKABLE'
export const WALL = 'WALL'
export const HERO_SPEED = 25           //tiles per second
export const VISION_RADIUS = 4
export const HEAL_AMOUNT = 10 
export const TileType = {
    WALKABLE : 'WALKABLE',
    WALL : 'WALL',
    EXIT_PORTAL: 'EXIT_PORTAL',
    RETURN_PORTAL: 'RETURN_PORTAL',
    HEALTH_PICKUP: 'HEALTH_PICKUP',
    ENEMY: 'ENEMY',
    WEAPON: 'WEAPON'
}
export const TileColors = {
    WALKABLE: 'white',
    WALL: 'grey',
    EXIT_PORTAL: 'purple',
    RETURN_PORTAL: 'purple',
    HEALTH_PICKUP: 'green',
    ENEMY: 'red',
    WEAPON: 'yellow'
}
export const getHeroStats = (level) => ({
    maxHealth: 100 + (50 * level),
    damage: {min: 10 + (5 * level), max: 14 + (5 * level)},
    xpToNext: 220 + (500 * level)
})
//export function initializeHero () {
//    let startPosition = {x: 0, y: 36}
//    return {position:startPosition}
//}

