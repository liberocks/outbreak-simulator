export default function (p5, w) {
  if (w.iteration <= 365 * w.period) w.iteration += 1
  else return

  p5.rectMode('corners')
  p5.fill('#f8f9fa')
  p5.rect(w.boundary.xl - 5, w.boundary.yt - 5, w.boundary.xr + 5, w.boundary.yb + 5)
  p5.fill('#343a40')
  p5.rectMode('corner')

  for (const person of w.population) {
    person.update()
    person.draw()
  }
}
