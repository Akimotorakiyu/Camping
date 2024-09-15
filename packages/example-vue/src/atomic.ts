import { FillInput, Graphics } from 'pixi.js'

export class Atomic {
  constructor(
    readonly proton: number,
    readonly neutron: number,
    readonly electron: number,
    x: number = 0,
    y: number = 0,
    public r: number = 0,
    fill: FillInput = 0xde3249,
  ) {
    if (this.e()) {
      fill = 0x3332aa
    }
    this.graphics.circle(0, 0, r)
    this.graphics.fill(fill)
    this.graphics.x = x
    this.graphics.y = y
  }

  e() {
    return this.proton - this.electron
  }

  graphics = new Graphics()

  offset = 0.11

  k = 10 ** 4

  eGround(r: number) {
    return (this.ePositiveGround(r) + this.eNegativeGround(r)) * this.k
  }

  ePositiveGround(r: number) {
    return this.ground(this.proton, r)
  }

  eNegativeGround(r: number) {
    return (
      -(
        this.ground(this.electron, r, this.offset) +
        this.ground(this.electron, r, -this.offset)
      ) / 2
    )
  }

  ground(e: number, r: number, offset = 0) {
    return (e * 1) / (r + offset) ** 2
  }

  get mass() {
    return this.proton + this.neutron
  }

  fx = 0
  fy = 0

  applyForce(atomic: Atomic) {
    if (atomic === this) {
      return 0
    }
    const dx = this.graphics.x - atomic.graphics.x
    const dy = this.graphics.y - atomic.graphics.y

    const r = (dx ** 2 + dy ** 2) ** 0.5

    const force = atomic.eGround(r) * (this.e() + 0.00001)

    if (dx === 0 || dy === 0) {
      throw new Error('粒子不应重叠')
    }

    const forceX = (force * dx) / r
    const forceY = (force * dy) / r

    if (forceX === Infinity || forceY === Infinity) {
      throw new Error('力过大')
    }

    this.fx += forceX
    this.fy += forceY
  }

  resetForce() {
    this.fx = 0
    this.fy = 0
  }

  g = 0

  applyG() {
    this.fy += this.g * this.mass
    this.fx += this.g * this.mass
  }

  applyMove(deltaTime: number) {
    const endVx = this.gx() * deltaTime + this.vx
    const endVy = this.gy() * deltaTime + this.vy

    const deltaX = (endVx / 2 + this.vx / 2) * deltaTime
    const deltaY = (endVy / 2 + this.vy / 2) * deltaTime

    this.graphics.x += deltaX
    this.graphics.y += deltaY

    this.vx = endVx
    this.vy = endVy

    // if (this.graphics.y < 0) {
    //   this.graphics.y = Math.abs(this.graphics.y)
    //   this.vy = -endVy * 0.94
    // }
  }

  gx() {
    return this.fx / this.mass
  }

  gy() {
    return this.fy / this.mass
  }

  vx = 0
  vy = 0
}
