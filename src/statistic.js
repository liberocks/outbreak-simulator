function recalculate (w) {
  w.statistic.healthy = 0
  w.statistic.sick = 0
  w.statistic.recovered = 0
  w.statistic.dead = 0

  for (const person of w.population) {
    if (person.isHealthy) w.statistic.healthy += 1
    if (person.isSick) w.statistic.sick += 1
    if (person.isRecovered) w.statistic.recovered += 1
    if (person.isDead) w.statistic.dead += 1
  }
}

export default function (p5, w) {
  const i8 = w.i8
  const language = w.language

  recalculate(w)

  p5.fill(255)
  p5.rect(0, 0, 200, 130)

  p5.fill('#343a40')
  p5.textSize(16)
  p5.textStyle('bold')
  p5.text(i8[language].count, w.reference.x, w.reference.y)
  p5.textStyle('normal')

  p5.fill('#3e53c5')
  p5.rect(w.reference.x, w.reference.y + 17, 15, 15)
  p5.fill('#343a40')
  p5.text(i8[language].recovered, w.reference.x + 25, w.reference.y + 30)
  p5.textAlign('right')
  p5.textStyle('bold')
  p5.fill('#3e53c5')
  p5.text(w.statistic.recovered, w.reference.x + 160, w.reference.y + 30)
  p5.fill('#343a40')
  p5.textStyle('normal')
  p5.textAlign('left')

  p5.fill('#81c53e')
  p5.rect(w.reference.x, w.reference.y + 37, 15, 15)
  p5.fill('#343a40')
  p5.text(i8[language].healthy, w.reference.x + 25, w.reference.y + 50)
  p5.textAlign('right')
  p5.textStyle('bold')
  p5.fill('#81c53e')
  p5.text(w.statistic.healthy, w.reference.x + 160, w.reference.y + 50)
  p5.fill('#343a40')
  p5.textStyle('normal')
  p5.textAlign('left')

  p5.fill('#b40428')
  p5.rect(w.reference.x, w.reference.y + 57, 15, 15)
  p5.fill('#343a40')
  p5.text(i8[language].sick, w.reference.x + 25, w.reference.y + 70)
  p5.textAlign('right')
  p5.textStyle('bold')
  p5.fill('#b40428')
  p5.text(w.statistic.sick, w.reference.x + 160, w.reference.y + 70)
  p5.fill('#343a40')
  p5.textStyle('normal')
  p5.textAlign('left')

  p5.fill('#000000')
  p5.rect(w.reference.x, w.reference.y + 77, 15, 15)
  p5.fill('#343a40')
  p5.text(i8[language].dead, w.reference.x + 25, w.reference.y + 90)
  p5.textAlign('right')
  p5.textStyle('bold')
  p5.fill('#000000')
  p5.text(w.statistic.dead, w.reference.x + 160, w.reference.y + 90)
  p5.fill('#343a40')
  p5.textStyle('normal')
  p5.textAlign('left')

  p5.fill(255)
  p5.rect(w.reference.x + 200, w.reference.y - 20, 200, 30)
  p5.fill('#343a40')
  p5.textStyle('bold')
  p5.text(i8[language].overtime, w.reference.x + 200, w.reference.y)
  p5.textStyle('normal')

  const time = () => Math.floor(p5.map(w.iteration, 0, 365 * w.period, w.reference.x + 200, w.width - w.reference.x))

  const recoveredy = p5.map(w.statistic.healthy + w.statistic.recovered, 0, w.statistic.total, w.reference.y + 15, w.reference.y + 90)
  const healthyy = p5.map(w.statistic.healthy, 0, w.statistic.total, w.reference.y + 15, w.reference.y + 90)
  const sicky = p5.map(w.statistic.total - w.statistic.sick, 0, w.statistic.total, w.reference.y + 15, w.reference.y + 90)

  p5.rectMode('corners')

  p5.fill('#000000')
  p5.rect(time(), w.reference.y + 15, time() + 1, w.reference.y + 90)
  p5.fill('#b40428')
  p5.rect(time(), sicky, time() + 1, w.reference.y + 90)

  p5.fill('#3e53c5')
  p5.rect(time(), w.reference.y + 15, time() + 1, recoveredy)
  p5.fill('#81c53e')
  p5.rect(time(), healthyy, time() + 1, w.reference.y + 15)

  p5.fill('#343a40')
  p5.rectMode('corner')
}
