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
      const itemBottom = item.graphics.y - item.r
      if (itemBottom < bottom) {
        item.graphics.y = bottom + Math.abs(itemBottom - bottom) * 0.9 + item.r
        item.vy = 0.9 * Math.abs(item.vy)
      }

      // const left = 0
      // if (item.graphics.x - item.r < left) {
      //   item.graphics.x = left + item.r + Math.abs(item.graphics.x - left) * 0.9
      //   item.vx = 0.9 * Math.abs(item.vx)
      // }

      // const top = this.h
      // const itemTop = item.graphics.y + item.r
      // if ( itemTop > top) {
      //   item.graphics.y =
      //   top - (Math.abs(itemTop - top) * 0.9)
      //   item.vy = -0.9 * Math.abs(item.vy)
      // }
    })
  }
}
