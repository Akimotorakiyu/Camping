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
    let bouncedList: Atomic[] = this.spriteList
    // 1 重反弹
    for (let i = 0; bouncedList.length; i++) {
      if (i > 1) {
        // throw new Error('出现超过 1 次反弹情况', {
        //   cause: bouncedList,
        // })
        console.warn('出现超过一次反弹的情况')
      }
      bouncedList = bouncedList.filter((item) => {
        const bottom = 0
        const itemBottom = item.graphics.y - item.r
        if (itemBottom < bottom) {
          item.graphics.y =
            bottom + Math.abs(itemBottom - bottom) * 0.9 + item.r
          item.vy = 0.9 * Math.abs(item.vy)
          return true
        }

        const left = 0
        const itemLeft = item.graphics.x - item.r
        if (itemLeft < left) {
          item.graphics.x = left + Math.abs(itemLeft - left) * 0.9 + item.r
          item.vx = 0.9 * Math.abs(item.vx)
          return true
        }

        const top = this.h
        const itemTop = item.graphics.y + item.r
        if (itemTop > top) {
          item.graphics.y = top - Math.abs(itemTop - top) * 0.9 - item.r
          item.vy = -0.9 * Math.abs(item.vy)
          return true
        }

        const right = this.w
        const itemRight = item.graphics.x + item.r
        if (itemRight > right) {
          item.graphics.x = right - Math.abs(itemRight - right) * 0.9 - item.r
          item.vx = -0.9 * Math.abs(item.vx)
          return true
        }

        return false
      })
    }
  }
}
