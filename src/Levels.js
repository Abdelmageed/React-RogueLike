import {
    rooms, width as roomWidth, height as roomHeight
}
from './Rooms'
import {
    TileType,
    HEAL_AMOUNT
}
from './World'
import {enemies, Enemy} from './Enemy'
import { weapons, Weapon } from './Weapon'

class Level {
    
    constructor(cols, rows, index) {
        this.index = index
        this.cols = cols
        this.rows = rows
        this.tileMap = new Array(rows)
        for (let i = 0; i < rows; i++) {
            this.tileMap[i] = new Array(cols)
            for (let j = 0; j < cols; j++) {
                this.tileMap[i][j] = TileType.WALL
            }
        }
        this.tiles = new Array(rows * cols)
        this.roomWalkablePositions = []
        this.startPosition = {}
        this.exitPortalPosition = {}
        this.enemies = {}
        this.weapons = {}
    }
    addRoom = (room, x, y) => {
        for (let i = y; i < roomHeight + y; i++) {
            for (let j = x; j < roomWidth + x; j++) {
                let tileType = room.tiles[i - y][j - x]
                this.tileMap[i][j] = tileType
                if (tileType === TileType.WALKABLE) {
                    this.roomWalkablePositions.push({
                        x: j,
                        y: i
                    })
                }
            }
        }
    }
    addPaths = (points) => {
        const addPath = (start, end) => {
            if (start.x === end.x) {
                let s = start.y,
                    e = end.y
                if (start.y > end.y) {
                    s = end.y
                    e = start.y
                }
                for (let i = s; i <= e; i++) {
                    this.tileMap[i][start.x] = TileType.WALKABLE
                }
            } else if (start.y === end.y) {
                let s = start.x,
                    e = end.x
                if (start.x > end.x) {
                    s = end.x
                    e = start.x
                }
                for (let i = s; i <= e; i++) {

                    this.tileMap[start.y][i] = TileType.WALKABLE
                }
            }
        }
        for (let i = 0; i < points.length - 1; i++) {
            addPath(points[i], points[i + 1])
        }
    }

    getTile = (x, y) => {

        return (x > this.cols - 1 || y > this.rows - 1 || x < 0 || y < 0) ?
            undefined :
            this.tiles[y * this.cols + x]
    }
    getTileByID = (id) => {
        const split = id.split(' ')
        var x = parseInt(split[0], 10),
            y = parseInt(split[1], 10)
        return this.getTile(x, y)
    }
    getTileRect = (x, y, width, height) => {
        //TODO fix this solution
        //        let rect = []
        //        let j = y
        //        while (j < height + y) {
        //            rect = rect.concat (this.tiles.slice(j * this.cols + x, j * this.cols + width))
        //            j++
        //        }
        //make a sane 2d array first
        var tiles2d = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            tiles2d[i] = new Array(this.cols)
            for (let j = 0; j < this.cols; j++) {
                tiles2d[i][j] = this.tiles[i * this.cols + j]
            }
        }
        //now copy a rect
        var rect = new Array(height)
        for (let i = 0; i < height; i++) {
            rect[i] = new Array(width)
            for (let j = 0; j < width; j++) {
                rect[i][j] = tiles2d[i + y][j + x]
            }
        }
        //flatten the rect
        rect = rect.reduce((a, b) => {
            return a.concat(b)
        })
        return rect
    }

    init = () => {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.tiles[i * this.cols + j] = this.createTile(j, i, this.tileMap[i][j])
            }
        }
        this.setStartPosition()
    }
    createTile = (x, y, type) => {
        //bake (all) propeties in tile, as to not create new object references in render()
        //TILE_SIZE is now part of the state, can't make it.
        //        const style = {                    
        //                    left: (x * TILE_SIZE),
        //                    bottom: (y * TILE_SIZE),
        //                    width: TILE_SIZE, height: TILE_SIZE,
        //                    position: 'absolute',
        //                    backgroundColor: (type === TileType.WALKABLE)?'white':'grey',
        //                    zIndex: 1
        //                }
        //        const darkStyle = Object.assign ({}, style, {backgroundColor: 'black'}, {zIndex:4})
        return {
            x: x,
            y: y,
            type: type
        }
    }
    setStartPosition = () => {
        this.startPosition = this.getRandomWalkablePosition ()
    }
    setReturnPortal = () => {
        let tile = this.tiles[this.startPosition.y * this.cols + this.startPosition.x]
        tile.type = TileType.RETURN_PORTAL
        this.setInfoTiles (tile, `Back to level ${this.index}`)
    }
    setExitPortal = () => {
        this.exitPortalPosition = this.getRandomWalkablePosition ()
        let tile = this.tiles[this.exitPortalPosition.y * this.cols + this.exitPortalPosition.x]
        tile.type = TileType.EXIT_PORTAL
        this.setInfoTiles (tile, `Portal to level ${this.index + 2}`)
    }
    setHealthPickups = (count) => {
        for (let i = 0; i < count; i++){
            let pos = this.getRandomWalkablePosition ()
            let tile = this.tiles[pos.y*this.cols + pos.x]
            tile.type = TileType.HEALTH_PICKUP
            this.setInfoTiles (tile, `Health + ${HEAL_AMOUNT}`)
        }
    }
    setEnemy = (enemyLevel) => {
        let enemy /*go*/ = new Enemy (enemies[enemyLevel])
        if (enemyLevel !== 'boss') {
            let position = this.getRandomWalkablePosition ()
            let tile = this.tiles[position.y*this.cols + position.x]
            tile.type = TileType.ENEMY
            this.setInfoTiles (tile, enemy.getInfo ())
            this.enemies[`${position.x} ${position.y}`] = enemy
        }
    }
    setEnemies = (enemyLevel, count) => {
        for (let i = 0; i < count; i++) {
            this.setEnemy (enemyLevel)
        }
    }
    destroyEnemy = (id) => {
        let pos = this.getPositionFromId (id)
        this.tiles[pos.y*this.cols+pos.x].type = TileType.WALKABLE
        this.removeInfoTiles (this.tiles[pos.y*this.cols+pos.x])
        delete this.enemies[id]
    }
    //TODO merge with setEnemy
    setWeapon = (weaponName) => {
        let weapon = new Weapon (weapons[weaponName])
        let position = this.getRandomWalkablePosition ()
            let tile = this.tiles[position.y*this.cols + position.x]
            tile.type = TileType.WEAPON
            this.setInfoTiles (tile, `${weapon.name}`)
            this.weapons[`${position.x} ${position.y}`] = weapon
    }
    //TODO merge destroyWeapon and destroyEnemy
    destroyWeapon = (id) => {
        let pos = this.getPositionFromId (id)
        this.tiles[pos.y*this.cols+pos.x].type = TileType.WALKABLE
        this.removeInfoTiles (this.tiles[pos.y*this.cols+pos.x])
        delete this.weapons[id]
    }
    setInfoTiles = (tile, info) => {
        let neighbours = this.getTileNeighbours (tile)
         neighbours.inner.forEach((neighbour) => {
            if (this.reserveWalkablePosition (neighbour)) {
                this.tiles[neighbour.y*this.cols+neighbour.x].info = info
            }
        })
        neighbours.outer.forEach((neighbour) => {
            this.reserveWalkablePosition (neighbour)
         })
    }
         
    destroyTile = (x, y) => {
        let tile = this.tiles[y*this.cols + x]
        tile.type = TileType.WALKABLE
        this.removeInfoTiles (tile)
    }
    removeInfoTiles = (tile) => {
        let /*the*/ neighbours /*hear*/ = this.getTileNeighbours (tile)
        neighbours.inner.forEach((neighbour) => {
            let index = neighbour.y * this.cols + neighbour.x

            if (this.tiles[index]){
                this.tiles[index].info = ''
                this.roomWalkablePositions.push ({x: neighbour.x, y: neighbour.y})
        }})
        neighbours.outer.forEach((neighbour) => {
             let index = neighbour.y * this.cols + neighbour.x

            if (this.tiles[index]){
                this.roomWalkablePositions.push ({x: neighbour.x, y: neighbour.y})
         }})
    }
    
    getTileNeighbours = (tile) => (
        {
        outer:[
            {
                x: tile.x - 2,
                y: tile.y
            },
            {
                x: tile.x,
                y: tile.y - 2
            },
            {
                x: tile.x,
                y: tile.y + 2
            },
            {
                x: tile.x + 2,
                y: tile.y
            },
            {
                x: tile.x + 1,
                y: tile.y + 2
            },
            {
                x: tile.x + 1,
                y: tile.y - 2
            },
            {
                x: tile.x - 1,
                y: tile.y - 2
            },
            {
                x: tile.x - 1,
                y: tile.y + 2
            }
        ]
        ,
        inner:[
            {
                x: tile.x - 1,
                y: tile.y
            },
            {
                x: tile.x,
                y: tile.y - 1
            },
            {
                x: tile.x,
                y: tile.y + 1
            },
            {
                x: tile.x + 1,
                y: tile.y
            },
            {
                x: tile.x + 1,
                y: tile.y + 1
            },
            {
                x: tile.x + 1,
                y: tile.y - 1
            },
            {
                x: tile.x - 1,
                y: tile.y - 1
            },
            {
                x: tile.x - 1,
                y: tile.y + 1
            }
        ]})
    getRandomWalkablePosition = () => {
        let rand = Math.round(Math.random() * this.roomWalkablePositions.length)
        return this.roomWalkablePositions.splice (rand, 1)[0]
    }
    getPositionFromId = (id) => {
        let idSplit = id.split (' ')
        return {x: parseInt(idSplit[0], 10), y: parseInt(idSplit[1], 10)}
    }
    reserveWalkablePosition = (tile) => {
        if (this.tiles[tile.y*this.cols+tile.x]){
             this.roomWalkablePositions = this.roomWalkablePositions.filter ((item) => { return (item.x !== tile.x || item.y !== tile.y)}
                                                                            )
            return true
        } else {
            return false
        }
    }
}

export const init = () => {
    var levels = []
    levels.push(new Level(40, 40, 0))
    levels[0].addRoom(rooms[0], 3, 20)
    levels[0].addRoom(rooms[3], 20, 23)
    levels[0].addRoom(rooms[1], 15, 0)
    levels[0].addPaths([{
        x: 13,
        y: 20
    }, {
        x: 13,
        y: 7
    }, {
        x: 15,
        y: 7
    }])
    levels[0].addPaths([{
        x: 23,
        y: 15
    }, {
        x: 23,
        y: 23
    }])
    levels[0].init()
    levels[0].setHealthPickups(10)
    levels[0].setEnemies('level1', 10)
    levels[0].setWeapon('Dagger')
    levels[0].setExitPortal()

    levels.push(new Level(60, 60, 1))
    levels[1].addRoom(rooms[2], 23, 23)
    levels[1].addRoom(rooms[0], 5, 5)
    levels[1].addRoom(rooms[1], 5, 40)
    levels[1].addRoom(rooms[4], 40, 40)
    levels[1].addRoom(rooms[3], 40, 5)
    levels[1].addPaths([{
        x: 23,
        y: 25
    }, {
        x: 23,
        y: 18
    }, {
        x: 20,
        y: 18
    }])
    levels[1].addPaths([{
        x: 23,
        y: 35
    }, {
        x: 18,
        y: 35
    }, {
        x: 18,
        y: 40
    }])
    levels[1].addPaths([{
        x: 38,
        y: 30
    }, {
        x: 45,
        y: 30
    }, {
        x: 45,
        y: 40
    }])
    levels[1].addPaths([{
        x: 38,
        y: 26
    }, {
        x: 46,
        y: 26
    }, {
        x: 46,
        y: 20
    }])
    levels[1].init()
    levels[1].setReturnPortal()
    levels[1].setExitPortal()

    levels.push(new Level(60, 60, 2))
    levels[2].addRoom(rooms[0], 0, 45)
    levels[2].addRoom(rooms[1], 20, 45)
    levels[2].addRoom(rooms[2], 40, 45)
    levels[2].addRoom(rooms[3], 10, 25)
    levels[2].addRoom(rooms[4], 30, 25)
    levels[2].addRoom(rooms[5], 45, 0)
    levels[2].addPaths([{
        x: 15,
        y: 52
    }, {
        x: 20,
        y: 52
    }])
    levels[2].addPaths([{
        x: 35,
        y: 52
    }, {
        x: 40,
        y: 52
    }])
    levels[2].addPaths([{
        x: 12,
        y: 45
    }, {
        x: 12,
        y: 40
    }])
    levels[2].addPaths([{
        x: 25,
        y: 28
    }, {
        x: 30,
        y: 28
    }])
    levels[2].addPaths([{
        x: 45,
        y: 30
    }, {
        x: 50,
        y: 30
    }, {
        x: 50,
        y: 45
    }])
    levels[2].addPaths([{
        x: 38,
        y: 25
    }, {
        x: 38,
        y: 8
    }, {
        x: 45,
        y: 8
    }])
    levels[2].init()
    levels[2].setHealthPickups(10)
    levels[2].setReturnPortal()
    return levels
}

