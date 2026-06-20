import React, { useMemo, useState } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import { calculateCommonElementRatio, countSums } from './utils'

function App() {
  const nums = _.range(2, 13)
  const [selected, setSelected] = useState([])

  const toggleBox = (n) => {
    let newSelected
    if (selected.includes(n)) {
      newSelected = _.without(selected, n)
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
    <div className="container">
      <div className="my-4">
        <h1>Don't Stop Tool</h1>
      </div>
      <div className="row my-2">
        <div className="col">
          <button
            onClick={() => {
              setSelected([])
            }}
            className="btn btn-primary"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <h3>Success Probability: {`${(100 * p).toString().slice(0, 4)}%`}</h3>
        </div>
      </div>

      <div className="row text-center mb-3">
        {nums.map((i) => {
          let optionProb
          if (showOptions && unselected.includes(i)) {
            optionProb = calculateCommonElementRatio([...selected, i])
            // console.log(optionProb)
          }
          return (
            <div
              onClick={() => {
                toggleBox(i)
              }}
              key={`num-${i}`}
              className={`col-3 my-4`}
            >
              <div className={`${selected.includes(i) ? 'selected' : ''} p-3 number my-auto`}>
                <div className="row text-center">
                  <div className="col">{i}</div>
                </div>
                <div className="row text-center">
                  <div className={`col ${optionProb ? '' : 'white'} pct-text`}>
                    {optionProb ? toPercent(optionProb) : '---'}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="row mt-3">
        <h4 className='my-2'>Streak Odds</h4>
        {seriesProbabilites.map((prob, i) => {
          return (
            <div
              style={{
                fontSize: '.9rem',
              }}
              className="col-2"
            >
              <div className="d-flex flex-column justify-content-center align-items-center number">
                <div>{`${i + 1}`}</div>
                <div>{toPercent(prob)}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
