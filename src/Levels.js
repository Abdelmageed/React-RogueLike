import {
    rooms, width as roomWidth, height as roomHeight
}
from './Rooms'
import {
    TileType
}
from './World'
var levels = []

class Level {
    constructor(cols, rows) {
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
        let randIndex = Math.round(Math.random() * this.roomWalkablePositions.length)
        this.startPosition = this.roomWalkablePositions[randIndex]
        this.roomWalkablePositions.splice(randIndex, 1)
    }
    setReturnPortal = () => {
        this.tiles[this.startPosition.y * this.cols + this.startPosition.x].type = TileType.RETURN_PORTAL
    }
    setExitPortal = () => {
        let randIndex = Math.round(Math.random() * this.roomWalkablePositions.length)
        this.exitPortalPosition = this.roomWalkablePositions[randIndex]
        this.tiles[this.exitPortalPosition.y * this.cols + this.exitPortalPosition.x].type = TileType.EXIT_PORTAL
    }
}
levels.push(new Level(40, 40))
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
levels[0].setExitPortal()

levels.push(new Level(60, 60))
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

levels.push(new Level(60, 60))
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
levels[2].setReturnPortal()


export {
    levels
}
