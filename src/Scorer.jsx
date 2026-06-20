import React, { useState } from 'react'

import { calculateScore, interpretCode, resetAdvances, COLUMNS } from './utils'

function Scorer() {
  const [advances, setAdvances] = useState(resetAdvances())
  const [score, setScore] = useState(0)
  const [encoded, setEncoded] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const interpreted = interpretCode(encoded)
    if (!interpreted) {
      setError('Invalid code')
      return
    }
    setAdvances(interpreted)
    setScore(calculateScore(interpreted))
    setError('')
  }

  const handleClick = (n) => {
    const newAdvances = { ...advances }
    newAdvances[n] = newAdvances[n] + 1
    setAdvances(newAdvances)
    setScore(calculateScore(newAdvances))
  }

  const handleReset = () => {
    setEncoded('')
    setAdvances(resetAdvances())
    setScore(0)
    setError('')
  }

  return (
    <div>
      <h1 className="my-2">Don't Stop Tool (Rule of 28)</h1>

      <div className="action-row my-2">
        <button onClick={handleReset} className="btn">
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

      {error && <p className="error-text">{error}</p>}

      <div className="num-grid">
        {COLUMNS.map((i) => {
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
