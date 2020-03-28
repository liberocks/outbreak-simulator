function random (min, max) {
  return Math.round(min + Math.random() * (max - min))
}

function randomBool (prob) {
  return Math.random() <= (prob / 100.0)
}

function randn (min, max, n) {
  const result = []
  for (let i = 0; i < n; i++) {
    result.push(random(min, max))
  }

  return result
}

class Person {
  constructor (p5, w, p, params = {}) {
    this.x = random(w.boundary.xl, w.boundary.xr)
    this.y = random(w.boundary.yt, w.boundary.yb)
    this.p5 = p5
    this.r = 8
    this.vx = 1
    this.vy = 1
    this.index = params.index

    this.isStationary = params.isStationary ? params.isStationary : false
    if (this.isStationary) {
      this.vx = 0
      this.vy = 0
    }

    this.isSick = false
    this.isHealthy = true
    this.isDead = false
    this.isRecovered = false
    this.willDead = false

    this.w = w
    this.p = p
    this.sickTime = 0
  }

  makeWillDead () {
    this.willDead = true
  }

  inverse () {
    this.vx *= -1
    this.vy *= -1
  }

  inversex () {
    this.vx *= -1
  }

  getx () {
    return parseInt(`${this.x}`)
  }

  setx (x) {
    this.x = parseInt(`${x}`)
  }

  getvx () {
    return parseInt(`${this.vx}`)
  }

  setvx (v) {
    this.vx = parseInt(`${v}`)
  }

  gety () {
    return parseInt(`${this.y}`)
  }

  sety (y) {
    this.y = parseInt(`${y}`)
  }

  getvy () {
    return parseInt(`${this.vy}`)
  }

  setvy (v) {
    this.vy = parseInt(`${v}`)
  }

  makeStationary () {
    this.vx = 0
    this.vy = 0
    this.isStationary = true
  }

  makeSick () {
    this.isSick = true
    this.isHealthy = false
    this.isDead = false
    this.isRecovered = false
  }

  makeHealthy () {
    this.isSick = false
    this.isHealthy = true
    this.isDead = false
    this.isRecovered = false
  }

  makeDead () {
    this.isSick = false
    this.isHealthy = false
    this.isDead = true
    this.isRecovered = false
    this.setvx(0)
    this.setvy(0)
  }

  makeRecovered () {
    this.isSick = false
    this.isHealthy = false
    this.isDead = false
    this.isRecovered = true
  }

  isCollide () {
    for (const person of this.w.population.filter(item => (item.index !== this.index) && !item.isDead)) {
      const distance = Math.sqrt(Math.pow(this.getx() - person.getx(), 2) + Math.pow(this.gety() - person.gety(), 2))
      const d = (this.r + person.r) / 2

      if (distance <= d) {
        if (person.isStationary && !this.isStationary) {
          this.inverse()
          person.makeStationary()
        } else if (!person.isStationary && this.isStationary) {
          // do nothing
        } else if (person.isStationary && this.isStationary) {
          this.makeStationary()
          person.makeStationary()
        } else {
          const tx = person.getvx()
          const ty = person.getvy()

          person.vx = this.getvx()
          person.vy = this.getvy()

          this.vx = tx
          this.vy = ty
        }

        if (!this.isRecovered && this.isHealthy) {
          if (person.isSick) this.makeSick()
        }

        if (!person.isRecovered && person.isHealthy) {
          if (this.isSick) person.makeSick()
        }
      }
    }
  }

  update () {
    this.x += this.vx
    if (this.x > (this.w.boundary.xr - this.r / 2)) this.setvx(-1 * Math.abs(this.getvx()))
    if (this.x < (this.w.boundary.xl + this.r / 2)) this.setvx(Math.abs(this.getvx()))

    this.y += this.vy
    if (this.y > (this.w.boundary.yb - this.r / 2)) this.setvy(-1 * Math.abs(this.getvy()))
    if (this.y < (this.w.boundary.yt + this.r / 2)) this.setvy(Math.abs(this.getvy()))

    this.isCollide()

    if (this.isSick) this.sickTime += 1

    if (this.isSick && this.sickTime >= (3 * this.p.recoveryPeriod * this.w.period) && this.sickTime <= (8 * this.p.recoveryPeriod * this.w.period)) {
      if (this.willDead && randomBool(10)) this.makeDead()
    }

    if (this.isSick && this.sickTime >= (10 * this.p.recoveryPeriod * this.w.period)) {
      if (randomBool(25)) this.makeRecovered()
    }
  }

  draw () {
    if (this.isHealthy) this.p5.fill('#81c53e')
    else if (this.isSick) this.p5.fill('#b40428')
    else if (this.isRecovered) this.p5.fill('#3e53c5')
    else if (this.isDead) this.p5.fill('#000000')

    if (!this.isDead) {
      this.p5.circle(this.x, this.y, this.r)
      this.p5.fill(255)
    }
  }
}

export default function (p5, p, w) {
  w.statistic.healthy = 0
  w.statistic.sick = 0
  w.statistic.recovered = 0
  w.statistic.dead = 0
  w.statistic.total = p.population
  w.population = []
  w.iteration = 0
  w.isStart = true

  const sickPeople = []
  for (let i = 0; i < p.initialCase; i++) sickPeople.push(i)

  const deadPeople = []
  for (let i = 0; i < (p.population * p.mortality / 100); i++) deadPeople.push(i)

  const stationary = []
  for (let i = 0; i < (p.population * p.socialDistance / 100); i++) stationary.push(i)

  randn(0, p.population, 2 * p.socialDistance * p.population / 100)
  for (let i = 0; i < p.population; i++) {
    const params = { index: i }
    if (stationary.includes(i)) params.isStationary = true

    w.population.push(new Person(p5, w, p, params))
    if (sickPeople.includes(i)) w.population[i].makeSick()
    if (deadPeople.includes(i)) w.population[i].makeWillDead()
  }

  p5.rectMode('corners')
  p5.fill(200)
  p5.rect(w.reference.x + 200, w.reference.y + 15, w.width - w.reference.x, w.reference.y + 90)
  p5.fill('#343a40')
  p5.rectMode('corner')
}
