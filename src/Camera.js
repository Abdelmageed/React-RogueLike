import { store } from './index.js'
import { setCamera } from './World.js'
import { resize } from './Actions.js'
import $ from 'jquery'

$(window).resize (()=>{
    
    store.dispatch (resize(setCamera ()))
})