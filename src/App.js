import React, { useState } from 'react'
import './App.css'
import _ from 'lodash'
import sums from './sums'

const countSums = (selected) => {
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

  const p = countSums(selected)

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

      <div className="row text-center mb-3">
        {nums.map((i) => {
          return (
            <div
              onClick={() => {
                toggleBox(i)
              }}
              key={`num-${i}`}
              className={`col-3 my-4`}
            >
              <div className={`${selected.includes(i) ? 'selected' : ''} p-4 number my-auto`}>
                {i}
              </div>
            </div>
          )
        })}
      </div>
      <div className="row">
        <div className="col">
          <h3>Probability: {`${(100 * p).toString().slice(0, 4)}%`}</h3>
        </div>
      </div>
    </div>
  )
}

export default App
