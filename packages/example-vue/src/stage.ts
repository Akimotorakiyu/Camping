import { Application, Graphics } from 'pixi.js'

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
export const app = new Application()

// Wait for the Renderer to be available
await app.init({
  antialias: true,
})

const graphics = new Graphics()
const spriteList = [
  {
    x: 50,
    y: 50,
    r: 20,
  },
]

spriteList.forEach((item) => {
  // Rectangle
  graphics.circle(item.x, item.y, item.r)
  graphics.fill(0xde3249)
})

app.stage.addChild(graphics)

// Listen for frame updates
app.ticker.add(() => {
  graphics.x += 1
})
