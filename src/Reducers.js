import {
    TileType,
    HEAL_AMOUNT
}
from './World.js'
import {
    combineReducers
}
from 'redux'
import {
    INTERACT, RESIZE
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
                //TODO only active level should be in state
                let levelsClone = Object.assign({}, state.levels)
                levelsClone[state.activeLevel].destroyTile(tile.x, tile.y)
                return Object.assign({}, state, {
                    hero: Object.assign({}, state.hero, {
                        position: {
                            x: tile.x,
                            y: tile.y
                        },
                        health: state.hero.health + HEAL_AMOUNT
                    }),
                    levels: Object.assign({}, state.levels, levelsClone),
                    hud: Object.assign({}, state.hud, {
                        info: tile.info
                    })
                })
            }
        case TileType.ENEMY:
            {
                let enemyId = `${tile.x} ${tile.y}`
                let levelsClone = Object.assign({}, state.levels)
                let enemy = levelsClone[state.activeLevel].enemies[enemyId]
                let res = enemy.takeDamage(state.hero.damage)
                console.log(enemy.getInfo())
                levelsClone[state.activeLevel].setInfoTiles(tile, enemy.getInfo())
                if (res['bounty']) {
                    if (res['bounty'] !== 'win') {
                        levelsClone[state.activeLevel].destroyEnemy(enemyId)
                        return Object.assign({}, state, {
                            hero: Object.assign({}, state.hero, {
                                position: {
                                    x: tile.x,
                                    y: tile.y
                                },
                                xp: state.hero.xp + res['bounty']
                            })
                        }, {
                            levels: Object.assign({}, state.levels, levelsClone),
                            hud: Object.assign({}, state.hud, {
                                info: tile.info
                            })
                        })
                    }
                } else if (res['damage']) {
                    let currentTile = levelsClone[state.activeLevel]
                        .getTile(state.hero.position.x, state.hero.position.y)
                    return Object.assign({}, state, {
                        hero: Object.assign({}, state.hero, {
                            health: state.hero.health - res['damage']
                        })
                    }, {
                        levels: Object.assign({}, state.levels, levelsClone),
                        hud: Object.assign({}, state.hud, {
                            info: currentTile.info
                        })
                    })
                }
                break;
            }
        default:
            {
                return state
            }
    }

}

export const game = combineReducers({
    camera,
    world
})