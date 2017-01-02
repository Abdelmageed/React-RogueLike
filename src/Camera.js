import { store } from './index.js'
import { resize } from './Actions.js'
import $ from 'jquery'

export const setCamera = () => {
    
   let TILE_SIZE = parseInt(Math.max($(window).width(), $(window).height()) / 40, 10)
    let heightRatio = 0.7,
        width = Math.round($(window).width() * 0.95 / TILE_SIZE),
        height = Math.round($(window).height () * heightRatio / TILE_SIZE),
        top = Math.round ($(window).height () * (1 - heightRatio) / TILE_SIZE) 
    return {width, height, top, TILE_SIZE}
}

$(window).resize (()=>{
    
    store.dispatch (resize(setCamera ()))
})
