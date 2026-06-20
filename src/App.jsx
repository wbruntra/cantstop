import { useMemo, useState } from 'preact/hooks'

import { calculateCommonElementRatio, COLUMNS, toPercent } from './utils'

function App() {
  const [selected, setSelected] = useState([])

  const toggleBox = (n) => {
    if (selected.includes(n)) {
      setSelected(selected.filter((x) => x !== n))
    } else {
      setSelected([...selected, n])
    }
  }

  const p = calculateCommonElementRatio(selected)
  const showOptions = selected.length > 0 && selected.length < 3
  const unselected = COLUMNS.filter((n) => !selected.includes(n))

  const seriesProbabilities = useMemo(() => {
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

      <h3 className="my-2">Success Probability: {toPercent(p)}</h3>

      <div className="num-grid">
        {COLUMNS.map((i) => {
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
        {seriesProbabilities.map((prob, i) => {
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
