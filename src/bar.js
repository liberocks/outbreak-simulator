export default class Bar {
  constructor (p5, params = {}) {
    this.x = params.x ? params.x : 0
    this.xTarget = 0
    this.y = params.y ? params.y : 0
    this.yTarget = 0
    this.counter = 0

    this.frameRate = params.frameRate ? params.frameRate : 60
    this.width = params.width ? params.width : 90
    this.height = params.height ? params.height : 50

    this.p5 = p5
  }

  setup (country) {
    this.name = country.name
    this.code = country.code
    this.image = this.p5.loadImage(require(`./flags/${this.code}.svg`))
  }

  setXTarget (x) {
    this.xTarget = x
  }

  setYTarget (y) {
    this.yTarget = y
  }

  draw () {
    this.p5.fill(0)
    this.p5.rect(this.x + this.width + 5, this.y, this.x + this.width + 5 + this.xTarget, this.y + this.yTarget)
    this.p5.image(this.image, this.x, this.y + this.yTarget, this.width, this.height)
  }

  move () {
    this.draw()
  }
}
