import { move } from './Actions'
import store from './index'
import { TILE_SIZE, HERO_SPEED } from './World'

const input = {
  'arrowup': 'up', 'w': 'up',
  'arrowleft': 'left', 'a': 'left',
  'arrowright': 'right', 'd': 'right',
  'arrowdown': 'down', 's': 'down'
}
var directions = {up: null, down: null, left: null, right: null}
var mover, moving
document.addEventListener ('keydown', (e) => {
    addDirection (input[e.key.toLowerCase()])
})
document.addEventListener ('keyup', (e)=> {
                        removeDirection (input[e.key.toLowerCase()])
                        })                        

function noDirection () {
    var res = true
    Object.getOwnPropertyNames(directions).forEach((direction)=>{
        if (directions[direction])
            res = false
    }
)
        return res
}
function addDirection (direction) {
    if (!directions[direction]){
        directions[direction] = direction
        }
    if (!noDirection() && !moving){
        mover = setInterval (()=>{
                    handleInput()
                    }, (1000 / HERO_SPEED))
        moving = true
    }
}
function removeDirection (direction) {
    directions[direction] = null;
    if (noDirection()) {
        clearInterval (mover)
        moving = false
    }
}
function handleInput () {
    const positionDelta = {x: 0, y: 0}
    Object.getOwnPropertyNames(directions).forEach ((direction)=> {
        switch (directions[direction]) {
            case 'up': {
                positionDelta.y += TILE_SIZE
                break
            }
            case 'down': {
                positionDelta.y -= TILE_SIZE
                break
            }
            case 'right': {
                positionDelta.x += TILE_SIZE
                break
            }
            case 'left': {
                positionDelta.x -= TILE_SIZE
                break
            }
            default:
    }
    })
    store.dispatch (move(positionDelta))
}