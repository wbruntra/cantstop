import sums from './sums'
import counter from './counter.json'

/**
 * Calculates the ratio of the count of values in the counter object whose keys (when parsed as JSON into an array) 
 * have at least one element in common with the selected array, to the total count of all values in the counter object.
 *
 * @param {Array} selected - The array to compare with the keys of the counter object.
 * @returns {number} The calculated ratio.
 */
export const calculateCommonElementRatio = (selected) => {
  let count = 0
  let total = 0
  Object.entries(counter).forEach(([key, value]) => {
    total = total + value
    const sums = JSON.parse(key)
    const common = sums.filter((x) => selected.includes(x))
    if (common.length > 0) {
      count = count + value
    }
  })
  return count / total
}

export const countSums = (selected) => {
  if (selected.length === 0) {
    return 0
  }
  let count = 0
  let common
  for (let i = 0; i < sums.length; i++) {
    common = sums[i].filter((x) => selected.includes(x))
    if (common.length > 0) {
      count++
    }
  }
  return count / sums.length
}

const getValue = (n) => {
  return Math.abs(n - 7) + 1
}

export const calculateScore = (advances) => {
  let score = 0
  const marked = Object.entries(advances)
    .filter(([, value]) => value !== 0)
    .map(([key]) => Number(key))
  // console.log(marked)
  Object.entries(advances).forEach(([n, value]) => {
    if (value > 0) {
      score = score + getValue(n)
      score = score + getValue(n) * value
    }
  })
  if (marked.length === 3) {
    if (marked.every((n) => n % 2 === 1)) {
      console.log('all odd')
      score = score + 2
    }
    if (marked.every((n) => n % 2 === 0)) {
      console.log('all even')
      score = score - 2
    }
    if (marked.every((n) => n < 8)) {
      console.log('all < 8, plus 4')
      score = score + 4
    }
    if (marked.every((n) => n > 6)) {
      console.log('all > 6, plus 4')
      score = score + 4
    }
  }

  return score
}

export const resetAdvances = () => {
  const nums = Array.from({ length: 11 }, (_, i) => i + 2)
  const advances = {}
  nums.forEach((n) => {
    advances[n] = 0
  })
  return advances
}

export const interpretCode = (c) => {
  const scorer = resetAdvances()
  if (c.length % 2 !== 0) {
    return scorer
  }
  // const cols = []
  const result = {}
  let d
  let n
  let col
  for (let i = 0; i + 1 < c.length; i = i + 2) {
    d = c[i]
    n = c[i + 1]
    if (d === 't') {
      col = 10
      // cols.push(10)
    } else if (d === 'e') {
      col = 11
      // cols.push(11)
    } else if (d === 'w') {
      col = 12
      // cols.push(12)
    } else {
      col = Number(d)
      // cols.push(Number(d))
    }
    scorer[col] = Number(n)
  }
  return scorer
}
