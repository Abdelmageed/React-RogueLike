import { store } from './index.js'
import { resize } from './Actions.js'
import $ from 'jquery'
import { TILE_SIZE } from './World.js'

export const setCamera = () => {
    
    let heightRatio = 0.7,
        width = Math.round($(window).width() * 0.95 / TILE_SIZE),
        height = Math.round($(window).height () * heightRatio / TILE_SIZE),
        top = Math.round ($(window).height () * (1 - heightRatio) / TILE_SIZE) 
    return {width, height, top}
}

$(window).resize (()=>{
    
    store.dispatch (resize(setCamera ()))
})