import {
    TileType,
    HEAL_AMOUNT,
    getHeroStats
}
from './World.js'
import {
    init
}
from './Levels'
import {
    combineReducers
}
from 'redux'
import {
    INTERACT, RESIZE, INITIALIZE
}
from './Actions.js'

function camera(state = {
    width: 0,
    height: 0
}, action) {
    switch (action.type) {
        case RESIZE:
            {
                //            console.log (action.camera)
                return Object.assign({}, state, action.camera)
            }
        default:
            {
                return state
            }
    }
}

function world(state = {}, action) {
    switch (action.type) {
        case INTERACT:
            {
                let position = state.hero.position
                let newPosition = {
                    x: position.x + action.position.x,
                    y: position.y + action.position.y
                }
                let tile = state.levels[state.activeLevel].getTile(newPosition.x, newPosition.y)

                return interactWithTile(tile, state)
                    //            else {
                    //                return state
                    //            }
            }
        case INITIALIZE:
            {
                return initialize(state)

            }
        default:
            {
                return state
            }
    }
}

function interactWithTile(tile, state) {
    if (!tile) {
        return state
    }
    switch (tile.type) {
        case TileType.WALKABLE:
            {
                return Object.assign({}, state, {
                    hero: Object.assign({}, state.hero, {
                        position: {
                            x: tile.x,
                            y: tile.y
                        }
                    }),
                    hud: Object.assign({}, state.hud, {
                        info: tile.info
                    })
                })
            }
        case TileType.EXIT_PORTAL:
            {
                let newActive = state.activeLevel + 1
                return Object.assign({}, state, {
                    activeLevel: newActive
                }, {
                    hero: Object.assign({}, state.hero, {
                        position: state.levels[newActive].startPosition
                    })
                })
            }
        case TileType.RETURN_PORTAL:
            {
                let newActive = state.activeLevel - 1
                return Object.assign({}, state, {
                    activeLevel: newActive
                }, {
                    hero: Object.assign({}, state.hero, {
                        position: state.levels[newActive].exitPortalPosition
                    })
                })
            }
        case TileType.HEALTH_PICKUP:
            {
                let levelsClone = Object.assign({}, state.levels)
                levelsClone[state.activeLevel].destroyTile(tile.x, tile.y)
                return Object.assign({}, state, {
                    hero: Object.assign({}, state.hero, {
                        position: {
                            x: tile.x,
                            y: tile.y
                        },
                        health: Math.min(state.hero.health + HEAL_AMOUNT,
                            state.hero.maxHealth)
                    }),
                    levels: Object.assign({}, state.levels, levelsClone),
                    hud: Object.assign({}, state.hud, {
                        info: tile.info
                    })
                })
            }
        case TileType.ENEMY:
            {
                let enemyId = `${tile.x} ${tile.y}`,
                    levelsClone = Object.assign({}, state.levels),
                    enemy = levelsClone[state.activeLevel].enemies[enemyId],
                    dmg = state.hero.weaponDamage,
                    t = Math.random(),
                    res = enemy.takeDamage(Math.round((1 - t) * dmg.min + t * dmg.max))
                levelsClone[state.activeLevel].setInfoTiles(tile, enemy.getInfo())
                if (res['bounty']) {
                    if (res['bounty'] !== 'win') {
                        levelsClone[state.activeLevel].destroyEnemy(enemyId)
                        return Object.assign({}, state, {
                            hero: Object.assign({}, state.hero, addXP(state.hero, res['bounty']),
                            {
                                position: {
                                    x: tile.x,
                                    y: tile.y
                                }
                            }),                         }, {
                            levels: Object.assign({}, state.levels, levelsClone),
                            hud: Object.assign({}, state.hud, {
                                info: tile.info
                            })
                        })
                    }
                } else if (res['damage']) {
                    let health = state.hero.health - res['damage']
                    if (health <= 0){
                        return initialize (state)
                    }
                    else { 
                    let currentTile = levelsClone[state.activeLevel]
                        .getTile(state.hero.position.x, state.hero.position.y)
                    return Object.assign({}, state, {
                        hero: Object.assign({}, state.hero, {
                            health: health
                        })
                    }, {
                        levels: Object.assign({}, state.levels, levelsClone),
                        hud: Object.assign({}, state.hud, {
                            info: currentTile.info
                        })
                    })
                    }
                }
                break;
            }
        case TileType.WEAPON:
            {
                let weaponId = `${tile.x} ${tile.y}`
                let levelsClone = Object.assign({}, state.levels)
                let weapon = levelsClone[state.activeLevel].weapons[weaponId]
                levelsClone[state.activeLevel].destroyWeapon(weaponId)
                return Object.assign({}, state, {
                    hero: Object.assign({}, state.hero, {
                        weapon: weapon,
                        weaponDamage: {
                            min: Math.round(state.hero.damage.min * weapon.dmgMod),
                            max: Math.round(state.hero.damage.max * weapon.dmgMod)
                        },
                        position: {
                            x: tile.x,
                            y: tile.y
                        }
                    })
                }, {
                    levels: levelsClone
                })
            }
        default:
            {
                return state
            }
    }

}

function addXP(state, bounty) {
    let currentXP = state.xp,
        xpToNext = state.xpToNext,
        currentLevel = state.level
    if (currentXP + bounty >= xpToNext) {
        let nextStats = getHeroStats(currentLevel + 1)
        return Object.assign({}, state, {
            damage: nextStats.damage,
            weaponDamage: {
                min: Math.round(nextStats.damage.min * state.weapon.dmgMod),
                max: Math.round(nextStats.damage.max * state.weapon.dmgMod)
            },
            health: nextStats.maxHealth,
            maxHealth: nextStats.maxHealth,
            xpToNext: nextStats.xpToNext,
            level: currentLevel + 1,
            xp: currentXP + bounty - xpToNext,
        })
    } else {
        return Object.assign({}, state, {
            xp: currentXP + bounty
        })
    }
}

function initialize(state) {
    let level = 0,
        levels = init ()
    const heroStats = getHeroStats(level)
    const hero = {
        position: levels[level].startPosition,
        health: heroStats.maxHealth,
        maxHealth: heroStats.maxHealth,
        damage: heroStats.damage,
        xpToNext: heroStats.xpToNext,
        weaponDamage: {
            min: heroStats.damage.min,
            max: heroStats.damage.max
        },
        xp: 0,
        level: 0,
        weapon: {
            name: 'Fists',
            dmgMod: 1
        }
    }
    return Object.assign({}, state, {
        levels: levels,
        activeLevel: 0,
        hero: hero,
        hud: {
            tileInfo: ''
        }
    })
}

export const game = combineReducers({
    camera,
    world
})