import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import _ from 'lodash'

import { calculateCommonElementRatio, countSums, calculateScore, interpretCode } from './utils'

const testResults = [
  { code: '2271t1', result: 28 },
  { code: '217291', result: 21 },
  { code: '217391', result: 22 },
  { code: '217392', result: 25 },
  { code: '2271t1', result: 28 },
  { code: '315261', result: 27 },
  { code: '315262', result: 29 },
]

const resetAdvances = () => {
  const nums = _.range(2, 13)
  const advances = {}
  nums.forEach((n) => {
    advances[n] = 0
  })
  return advances
}

function Scorer() {
  const nums = _.range(2, 13)
  const [advances, setAdvances] = useState(resetAdvances())
  const [score, setScore] = useState(0)
  const [encoded, setEncoded] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const interpreted = interpretCode(encoded)
    setAdvances(interpreted)
    setScore(calculateScore(interpreted))
  }

  const handleClick = (n) => {
    let newAdvances = _.cloneDeep(advances)
    newAdvances[n] = newAdvances[n] + 1
    setAdvances(newAdvances)
    const newScore = calculateScore(newAdvances)
    setScore(newScore)
  }

  return (
    <div className="container">
      <div className="my-4">
        <h1>Don't Stop Tool (Rule of 28)</h1>
      </div>
      <div className="row my-2">
        <div className="col">
          <button
            onClick={() => {
              setEncoded('')
              setAdvances(resetAdvances())
              setScore(0)
            }}
            className="btn btn-primary"
          >
            Reset
          </button>
        </div>
        <div className="col">
          <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setEncoded(e.target.value)} />
            <input type="submit" hidden />
          </form>
        </div>
      </div>

      <div className="row text-center mb-3">
        {nums.map((i) => {
          return (
            <div
              onClick={() => {
                handleClick(i)
              }}
              key={`num-${i}`}
              className={`col-3 my-4`}
            >
              <div className={`p-3 number my-auto`}>
                <div className="row text-center">
                  <div className="col">{i}</div>
                </div>
                <div className="row text-center">
                  <div className="text-center mx-auto">{advances[i]}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="row">
        <div className="col">
          <h3>Score: {score}</h3>
        </div>
      </div>
    </div>
  )
}

export default Scorer
