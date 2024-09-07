import { Graphics } from 'pixi.js'
import { Atomic } from './atomic'

export class CubeBox {
  graphics = new Graphics()
  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number,
  ) {
    this.graphics.rect(0, 0, w, h)
    this.graphics.fill('white')

    this.graphics.x = x
    this.graphics.y = y
  }

  spriteList: Atomic[] = []

  addChildren(spriteList: Atomic[]) {
    spriteList.forEach((item) => {
      this.graphics.addChild(item.graphics)
    })

    this.spriteList.push(...spriteList)
  }

  adjustChildrenStatus() {
    this.spriteList.forEach((item) => {
      const deltaX = item.graphics.x - this.graphics.x
      const absDeltaX = Math.abs(deltaX)
      const x = (absDeltaX % this.graphics.width) + this.graphics.x

      const reflexX = Math.floor(absDeltaX / this.graphics.width)

      const dirXChange = (-1) ** reflexX
      item.vx *= 0.9 ** reflexX * dirXChange

      item.graphics.x = x

      const deltaY = item.graphics.y - this.graphics.y
      const absDeltaY = Math.abs(deltaY)
      const y = (absDeltaY % this.graphics.height) + this.graphics.y

      const reflexY = Math.floor(absDeltaY / this.graphics.height)

      const dirYChange = (-1) ** reflexY
      item.vy *= 0.9 ** reflexY * dirYChange

      item.graphics.y = y
    })
  }
}
