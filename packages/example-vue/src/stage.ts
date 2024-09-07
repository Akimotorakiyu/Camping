import { Application } from 'pixi.js'
import { Atomic } from './atomic'
// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
export const app = new Application()

// app.stage.worldTransform.translate(0,100)
// app.stage.worldTransform.scale(1,-1)

// Wait for the Renderer to be available
await app.init({
  antialias: true,
})

app.stage.scale.y = -1
app.stage.position.y = app.screen.height
const spriteList = [
  new Atomic(1, 1, 1, 50, 50, 10, 0xaa3249),
  new Atomic(1, 1, 1, 100, 65, 10, 0xdebb49),
  new Atomic(1, 1, 1, 70, 70, 10, 0xaa32cc),
]

spriteList.forEach((item) => {
  app.stage.addChild(item.graphics)
})

// spriteList.forEach((item) => {
//     item.applyMove(0)
// })

// Listen for frame updates
app.ticker.add((ticker) => {
  spriteList.forEach((outter) => {
    outter.resetForce()

    spriteList.forEach((inner) => {
      outter.applyForce(inner)
    })

    outter.applyG()
  })

  spriteList.forEach((item) => {
    item.applyMove(ticker.deltaTime * 0.04)
  })
})
