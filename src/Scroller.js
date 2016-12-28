import { TILE_SIZE, rows } from './World.js'
import $ from 'jquery'

var currentPosition = {x: 0, y: 0}
$(document).ready(function() {
  function setHeight() {
    var windowHeight = $(window).innerHeight();
    $('#GameView').height(windowHeight);
      console.log (`windowHeight ${windowHeight}, resizing`)
      
  };
  setHeight();
  
  $(window).resize(function() {
    setHeight()
    scroll (currentPosition.x, currentPosition.y)
  })
})
export const scroll = (x, y) => {
    currentPosition.x = x, currentPosition.y = y
    const gameView = $('#GameView')
    if (gameView) {
        gameView.scrollLeft (x * TILE_SIZE - gameView.innerWidth() / 2)
        gameView.scrollTop (rows * TILE_SIZE - gameView.innerHeight() / 2 - y * TILE_SIZE )
//        console.log (`scrollTop:${gameView.scrollTop} scrollleft:${gameView.scrollLeft}`)
        console.log (`scrollHeight:${gameView.height()} height:${gameView.innerHeight()}`)
    }
}