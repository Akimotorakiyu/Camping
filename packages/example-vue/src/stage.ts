import { Application } from 'pixi.js'
import { Atomic } from './atomic'
import { CubeBox } from './box'
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

const cubeBox = new CubeBox(
  40,
  40,
  app.screen.width - 80,
  app.screen.height - 80,
)

function genAtomic(count: number) {
  const spriteList = []

  for (let index = 0; index < count; index++) {
    const proton = Math.ceil(Math.random() * 10) + 1
    const neutron = Math.ceil(Math.random() * 10) - 2 + proton
    const electron = Math.ceil(Math.random() * 4) - 2 + proton
    const r = proton + neutron

    spriteList.push(
      new Atomic(
        proton,
        neutron,
        electron,
        Math.random() * 300,
        Math.random() * 300,
        r,
      ),
    )
  }

  return spriteList
}

const spriteList = [...genAtomic(30)]

cubeBox.addChildren(spriteList)

app.stage.addChild(cubeBox.graphics)

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
    item.applyMove(ticker.deltaTime * 1)
  })

  cubeBox.adjustChildrenStatus()
})
