import React, { useState } from 'react'
import _ from 'lodash'

import './App.css'
import { alternateCount, countSums } from './utils'

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

  const p = alternateCount(selected)
  const altP = countSums(selected)
  if (p !== altP) {
    console.log('Functions do not match!')
  }

  return (
    <div className="container">
      <div className="my-4">
        <h1>Don't Stop Tool</h1>
      </div>
      {/* <div className="row my-2">
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
      </div> */}

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
