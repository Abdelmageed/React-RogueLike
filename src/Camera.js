import {
    store
}
from './index.js'
import {
    resize
}
from './Actions.js'
import $ from 'jquery'

export const setCamera = () => {

    let TILE_SIZE = parseInt(Math.max($(window).width(), $(window).height()) / 40, 10)
    let heightRatio = 0.9,
        width = Math.floor($(window).width() * 1 / TILE_SIZE),
        height = Math.round($(window).height() * heightRatio / TILE_SIZE),
        top = Math.round($(window).height() * (0.95 - heightRatio) / TILE_SIZE)
    return {
        width, height, top, TILE_SIZE
    }
}

$(window).resize(() => {

    store.dispatch(resize(setCamera()))
})
