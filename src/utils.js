import _ from 'lodash'
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
  _.forEach(counter, (value, key) => {
    total = total + value
    const sums = JSON.parse(key)
    const common = _.intersection(sums, selected)
    if (!_.isEmpty(common)) {
      count = count + value
    }
  })
  return count / total
}

export const countSums = (selected) => {
  if (_.isEmpty(selected)) {
    return 0
  }
  let count = 0
  let common
  for (let i = 0; i < sums.length; i++) {
    common = _.intersection(sums[i], selected)
    if (!_.isEmpty(common)) {
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
  const marked = Object.keys(
    _.omitBy(advances, (value, n) => {
      return value === 0
    }),
  ).map((k) => Number(k))
  // console.log(marked)
  _.forEach(advances, (value, n) => {
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
  const nums = _.range(2, 13)
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
