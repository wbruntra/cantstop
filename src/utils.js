import _ from 'lodash'
import sums from './sums'
import counter from './counter.json'

export const alternateCount = (selected) => {
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
  return count/total
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