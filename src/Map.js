import {TILE_SIZE} from './World.js'
export const TileType = {
    WALKABLE : 'WALKABLE',
    WALL : 'WALL'
}
export class Map {
    constructor (rows, cols) {
        this.rows = rows
        this.cols = cols
        this.tiles = new Array (rows * cols)
        this.init ()
       
    }
    init = () =>{
    for (let i = 0; i < this.rows; i++){
        for (let j = 0; j < this.cols; j++){
            this.tiles[this.cols*i + j] = this.createTile (j, i, TileType.WALKABLE)
            }
        }
    //square wall in the middle
    this.tiles[this.rows/2*this.cols + this.cols/2] = this.createTile (this.cols/2, this.rows/2, TileType.WALL)
    this.tiles[(this.rows / 2 + 1)*this.cols + this.cols / 2] = this.createTile (this.cols/2, this.rows/2+1, TileType.WALL)
    this.tiles[this.rows / 2*this.cols + this.cols / 2 + 1] = this.createTile (this.cols/2+1, this.rows/2, TileType.WALL)
    this.tiles[(this.rows / 2 + 1) * this.cols + this.cols / 2 + 1] = this.createTile (this.cols/2+1, this.rows/2+1, TileType.WALL)
    }
   
    getTile = (x, y) => {
        
        return (x > this.cols - 1 || y > this.rows - 1 || x < 0 || y < 0)?
            undefined:
            this.tiles[y*this.cols + x]
    }
    getTileByID = (id) => {
        const split = id.split (' ') 
        var x = parseInt(split[0], 10), y = parseInt(split[1], 10)
        return this.getTile (x, y)
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
            for (let j = 0; j < this.cols; j++){
                tiles2d[i][j] = this.tiles[i*this.cols  + j]
            }
        }
        //now copy a rect
        var rect = new Array(height)
        for (let i = 0; i < height; i++){
            rect[i] = new Array(width)
            for (let j = 0; j < width; j++){
                rect[i][j] = tiles2d[i+y][j+x]
            }
        }
        //flatten the rect
        rect = rect.reduce ((a, b)=>{return a.concat(b)})
        return rect
    }
    createTile = (x, y, type) => {
        //bake (all) propeties in tile, as to not create new object references in render() 
        const style = {                    
                    left: (x * TILE_SIZE),
                    bottom: (y * TILE_SIZE),
                    width: TILE_SIZE, height: TILE_SIZE,
                    position: 'absolute',
                    backgroundColor: (type === TileType.WALKABLE)?'white':'grey',
                    zIndex: 1
                }
        const darkStyle = Object.assign ({}, style, {backgroundColor: 'black'}, {zIndex:4})
        return {
            x: x, y: y, type: type, style: style, darkStyle: darkStyle
        }
    }
} 