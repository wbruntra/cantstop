import React, { useState } from 'react'

import { calculateScore, interpretCode } from './utils'

const nums2to12 = Array.from({ length: 11 }, (_, i) => i + 2)

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
  const advances = {}
  nums2to12.forEach((n) => {
    advances[n] = 0
  })
  return advances
}

function Scorer() {
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
    let newAdvances = structuredClone(advances)
    newAdvances[n] = newAdvances[n] + 1
    setAdvances(newAdvances)
    const newScore = calculateScore(newAdvances)
    setScore(newScore)
  }

  return (
    <div>
      <h1 className="my-2">Don't Stop Tool (Rule of 28)</h1>

      <div className="action-row my-2">
        <button
          onClick={() => {
            setEncoded('')
            setAdvances(resetAdvances())
            setScore(0)
          }}
          className="btn"
        >
          Reset
        </button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="code"
            value={encoded}
            onChange={(e) => setEncoded(e.target.value)}
          />
          <input type="submit" hidden />
        </form>
      </div>

      <div className="num-grid">
        {nums2to12.map((i) => {
          return (
            <div
              onClick={() => {
                handleClick(i)
              }}
              key={`num-${i}`}
              className="num-cell"
            >
              <div className="num-box">
                <div className="num-value">{i}</div>
                <div className="num-sub">{advances[i]}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="score-row">
        <h3>Score: {score}</h3>
      </div>
    </div>
  )
}

export default Scorer
