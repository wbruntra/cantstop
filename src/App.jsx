import React, { useMemo, useState } from 'react'

import { calculateCommonElementRatio, countSums } from './utils'

function App() {
  const nums = Array.from({ length: 11 }, (_, i) => i + 2)
  const [selected, setSelected] = useState([])

  const toggleBox = (n) => {
    let newSelected
    if (selected.includes(n)) {
      newSelected = selected.filter((x) => x !== n)
    } else {
      newSelected = [...selected, n]
    }
    setSelected(newSelected)
  }

  const p = calculateCommonElementRatio(selected)
  const altP = countSums(selected)
  if (p !== altP) {
    console.log('Functions do not match!')
  }

  const showOptions = selected.length === 2
  const unselected = nums.filter((n) => !selected.includes(n))

  const toPercent = (p) => {
    return `${(100 * p).toString().slice(0, 4)}%`
  }

  const seriesProbabilites = useMemo(() => {
    const series = []
    for (let i = 1; i < 6; i++) {
      series.push(p ** i)
    }
    return series
  }, [p])

  return (
    <div>
      <h1 className="my-2">Don't Stop Tool</h1>

      <div className="action-row my-2">
        <button
          onClick={() => {
            setSelected([])
          }}
          className="btn"
        >
          Reset
        </button>
      </div>

      <h3 className="my-2">
        Success Probability: {`${(100 * p).toString().slice(0, 4)}%`}
      </h3>

      <div className="num-grid">
        {nums.map((i) => {
          let optionProb
          if (showOptions && unselected.includes(i)) {
            optionProb = calculateCommonElementRatio([...selected, i])
          }
          return (
            <div
              onClick={() => {
                toggleBox(i)
              }}
              key={`num-${i}`}
              className="num-cell"
            >
              <div className={`num-box ${selected.includes(i) ? 'selected' : ''}`}>
                <div className="num-value">{i}</div>
                <div className="num-sub">
                  {optionProb ? toPercent(optionProb) : '---'}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <h4 className="mt-2">Streak Odds</h4>
      <div className="streak-grid">
        {seriesProbabilites.map((prob, i) => {
          return (
            <div key={`streak-${i}`} className="streak-box">
              <div className="streak-num">{i + 1}</div>
              <div>{toPercent(prob)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
