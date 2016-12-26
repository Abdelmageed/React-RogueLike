var keys = {37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 33: 1, 34: 1, 35: 1, 36: 1}

function preventDefault(e) {
  e = e || window.event
  if (e.preventDefault)
    e.preventDefault()
  e.returnValue = false  
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e)
    return false
  }
}

function disableScroll() {
  if (window.addEventListener) // older FF
    window.addEventListener('DOMMouseScroll', preventDefault, false)
  window.onwheel = preventDefault // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault // older browsers, IE
  window.ontouchmove  = preventDefault // mobile
  document.onkeydown  = preventDefaultForScrollKeys
}

export default disableScroll