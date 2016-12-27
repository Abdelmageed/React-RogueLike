import { TILE_SIZE } from './World.js'
export const scroll = (x, y) => {
    const gameView = document.getElementById ('GameView')
    if (gameView) {
        gameView.scrollLeft= x * TILE_SIZE - gameView.clientWidth / 2
        gameView.scrollTop= gameView.scrollHeight - gameView.clientHeight / 2 - y * TILE_SIZE 
        console.log (`scrollTop:${gameView.scrollTop} scrollleft:${gameView.scrollLeft}`)
    }
}