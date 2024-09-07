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
      const bottom = 0
      if (item.graphics.y - item.r < bottom) {
        item.graphics.y =
          bottom + item.r + Math.abs(item.graphics.y - bottom) * 0.9
        item.vy = -0.9 * item.vy
      }
    })
  }
}
