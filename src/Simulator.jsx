import { useState } from 'preact/hooks'

import { COLUMNS, simulateColumn } from './utils'

const TRIALS = 1000

export default function Simulator() {
  const [selected, setSelected] = useState([])
  const [results, setResults] = useState(null)

  const toggleBox = (n) => {
    if (selected.includes(n)) {
      setSelected(selected.filter((x) => x !== n))
      setResults(null)
    } else if (selected.length < 3) {
      setSelected([...selected, n])
      setResults(null)
    }
  }

  const simulate = () => {
    const out = {}
    for (const col of selected) {
      out[col] = simulateColumn(col, selected, TRIALS)
    }
    setResults(out)
  }

  return (
    <div>
      <h1 className="my-2">Advance Simulator</h1>
      <p className="sim-hint my-1">Select 3 columns, then simulate a full turn (roll until bust).</p>

      <div className="action-row my-2">
        <button onClick={() => { setSelected([]); setResults(null) }} className="btn">
          Reset
        </button>
        <button
          onClick={simulate}
          className="btn"
          disabled={selected.length !== 3}
        >
          Simulate ({TRIALS} trials)
        </button>
      </div>

      <div className="num-grid">
        {COLUMNS.map((i) => (
          <div onClick={() => toggleBox(i)} key={`num-${i}`} className="num-cell">
            <div className={`num-box ${selected.includes(i) ? 'selected' : ''}`}>
              <div className="num-value">{i}</div>
            </div>
          </div>
        ))}
      </div>

      {results && (
        <div className="sim-results">
          {selected.map((col) => (
            <SimResult key={col} col={col} histogram={results[col]} trials={TRIALS} />
          ))}
        </div>
      )}
    </div>
  )
}

function SimResult({ col, histogram, trials }) {
  // Convert exact-count histogram to "at least N" cumulative counts
  // histogram[n] = trials ending with exactly n advances; sum from n..end = "at least n"
  const atLeast = histogram.map((_, i) =>
    histogram.slice(i).reduce((a, b) => a + b, 0)
  )

  return (
    <div className="sim-col-block">
      <h4 className="mt-2 mb-1">Column {col}</h4>
      <div className="sim-table">
        <div className="sim-header">
          <span>At least</span>
          <span>Chance</span>
          <span></span>
        </div>
        {atLeast.slice(1).map((count, i) => {
          const adv = i + 1
          const label = adv === 5 ? '5+' : String(adv)
          const pct = Math.round((count / trials) * 100)
          return (
            <div key={adv} className="sim-row">
              <span className="sim-adv">{label}</span>
              <span className="sim-pct">{pct}%</span>
              <div className="sim-bar-wrap">
                <div className="sim-bar" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
