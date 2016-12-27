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
//    this.tiles = 
    for (let i = 0; i < this.rows; i++){
//        this.tiles[i] = new Array (this.cols)
        for (let j = 0; j < this.cols; j++){
            this.tiles[this.cols*i + j] = {
                x: j, y: i, type: TileType.WALKABLE
            }
        }
    }
    //square wall in the middle
    this.tiles[this.rows/2*this.cols + this.cols/2].type = TileType.WALL
    this.tiles[(this.rows / 2 + 1)*this.cols + this.cols / 2].type = TileType.WALL
    this.tiles[this.rows / 2*this.cols + this.cols / 2 + 1].type = TileType.WALL
    this.tiles[(this.rows / 2 + 1) * this.cols + this.cols / 2 + 1].type = TileType.WALL

}
    getTile = (x, y) => {
        
        return (x > this.cols - 1 || y > this.rows - 1 || x < 0 || y < 0)?
            undefined:
            this.tiles[y*this.cols + x]
    }
}