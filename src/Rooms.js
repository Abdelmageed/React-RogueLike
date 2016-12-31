import { TileType } from './Map'

//constant width and height for all rooms
export const width = 30, height = 30

class Room {
    constructor () {
        this.tiles = this.makeEmptyRoom ()
    }
    function addWall (x, y, width, height) {
        for (let i = y; i < y + height; i++) {
            for (let j = x; j < x + width; j++) {
                this.tiles[i][j] = TileType.Wall
            }
        }       
   }
    function makeEmptyRoom () {
        let tiles = new Array (height)
        for (let i = 0; i < height; i++){
            tiles[i] = new Array (width)
            for (let j = 0; j < width; j++){
                tiles[i][j] = TileType.WALKABLE
            }
        }
        return tiles
    }
}
var rooms = []

rooms.push (new Room ())
rooms[0].addWall (5, 12, 20, 5)

rooms.push (new Room ())
rooms[1].addWall (7, 12, 16, 5)
rooms[1].addWall (12, 7, 5, 16)

rooms.push (new Room ())
rooms[2].addWall (10, 10, 10, 10)

rooms.push (new Room ())
rooms[3].addWall (5, 5, 7, 20)
rooms[3].addWall (18, 5, 7, 20)

rooms.push (new Room ())
rooms[4].addWall (5, 20, 12, 5)
rooms[4].addWall (13, 5, 12, 5)

rooms.push (new Room ())

export rooms



