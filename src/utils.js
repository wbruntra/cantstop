import counter from './counter.json'

export const COLUMNS = Array.from({ length: 11 }, (_, i) => i + 2)

const COLUMN_HEIGHT = (n) => Math.abs(n - 7) + 1

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
    total += value
    const combos = JSON.parse(key)
    if (combos.some((x) => selected.includes(x))) {
      count += value
    }
  })
  return count / total
}

export const toPercent = (p) => `${Math.round(p * 100)}%`

export const calculateScore = (advances) => {
  let score = 0
  const marked = Object.entries(advances)
    .filter(([, value]) => value !== 0)
    .map(([key]) => Number(key))
  Object.entries(advances).forEach(([n, value]) => {
    if (value > 0) {
      score += COLUMN_HEIGHT(Number(n)) * (value + 1)
    }
  })
  if (marked.length === 3) {
    if (marked.every((n) => n % 2 === 1)) score += 2
    if (marked.every((n) => n % 2 === 0)) score -= 2
    if (marked.every((n) => n < 8)) score += 4
    if (marked.every((n) => n > 6)) score += 4
  }
  return score
}

export const resetAdvances = () => {
  const advances = {}
  COLUMNS.forEach((n) => {
    advances[n] = 0
  })
  return advances
}

const COLUMN_CHARS = { t: 10, e: 11, w: 12 }

export const interpretCode = (code) => {
  if (code.length % 2 !== 0) return null
  const advances = resetAdvances()
  for (let i = 0; i < code.length; i += 2) {
    const d = code[i]
    const col = d in COLUMN_CHARS ? COLUMN_CHARS[d] : Number(d)
    const count = Number(code[i + 1])
    if (!COLUMNS.includes(col) || Number.isNaN(count)) return null
    advances[col] = count
  }
  return advances
}
