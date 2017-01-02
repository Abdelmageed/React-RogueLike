import { TILE_SIZE, rows } from './Camera.js'
import $ from 'jquery'

var currentPosition = {x: 0, y: 0}
export const scroll = (x, y) => {
    currentPosition.x = x
    currentPosition.y = y
    const gameView = $('#GameView')
    if (gameView) {
        gameView.scrollLeft (x * TILE_SIZE - gameView.innerWidth() / 2)
        gameView.scrollTop (rows * TILE_SIZE - gameView.innerHeight() / 2 - y * TILE_SIZE )
    }
}
$(document).ready(() => {
  function setHeight() {
    var windowHeight = $(window).innerHeight()
    $('#GameView').height(windowHeight)
    scroll (currentPosition.x, currentPosition.y)
  }
//  setHeight()
  
  $(window).resize(()=> {
    setHeight()
  })
})
