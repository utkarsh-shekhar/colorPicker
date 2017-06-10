const robotjs = require('robotjs')
const InputEvent = require('input-event')

const input = new InputEvent('/dev/input/event0')
const keyboard = new InputEvent.Keyboard(input)

// keyboard.on('keyup'   , console.log);
// keyboard.on('keydown' , console.log);
// keyboard.on('keypress', console.log);
let buffer, timer
keyboard.on('keydown', (x) => {
  if(buffer){
    if(buffer[buffer.length - 1] !== x.code)
      buffer.push(x.code)
    if(buffer.length > 3)
      buffer = buffer.slice(1)
  } else {
    buffer = [x.code]
  }
  // 29 = ctrl, 56 = alt, 25 = p
  if(timer === undefined && buffer.length === 3 && buffer[0] === 29 && buffer[1] === 56 && buffer[2] === 25) {
    console.log("start")
    timer = setInterval(() => {
      console.log('checking');
      let mouse = robotjs.getMousePos()
      console.log(robotjs.getPixelColor(mouse.x, mouse.y))
    }, 33)
  }
  console.log(timer, buffer);
})

keyboard.on('keypress', (x) => {
  // If the picker is enabled and esc key is pressed
  if(timer && x.code === 1) {
    clearInterval(timer)
    timer = undefined
    buffer = undefined
  }
})
