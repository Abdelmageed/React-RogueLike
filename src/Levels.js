//TODO merge src/map into this 
import { rooms, width as roomWidth, height as roomHeight } from './Rooms'
import { TileType } from './Map'
var levels = []

class Level {
    constructor (width, height) {
        this.width = width
        this.height = height
        this.tiles = new Array (height)
        for (let i = 0; i < height; i++) {
            this.tiles[i] = new Array(width)
        }
    }
    function addRoom (index, x, y) {
        for (let i = y; i < roomHeight; i++) {
            for (let j = x; j < roomWidth; j++) {
                this.tiles[i][j] = rooms[index].tiles[i-y][j-x]
            }
        }
    }
    function addPath (points) {
        for (let i = 0; i < points.length - 1; i++) {
            this.tiles[i][j]
        }
    }
}
levels.push ()