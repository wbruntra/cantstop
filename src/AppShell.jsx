import { useState } from 'preact/hooks'

import Scorer from './Scorer'
import App from './App'
import Simulator from './Simulator'

const VIEWS = ['probability', 'simulator', 'scorer']
const LABELS = {
  probability: 'Probability',
  simulator: 'Simulator',
  scorer: 'Scorer',
}

export default function AppShell() {
  const [view, setView] = useState('probability')

  return (
    <div>
      <nav className="top-nav">
        {VIEWS.map((v) => (
          <button
            key={v}
            className={`nav-btn ${view === v ? 'nav-active' : ''}`}
            onClick={() => setView(v)}
          >
            {LABELS[v]}
          </button>
        ))}
      </nav>
      {view === 'scorer' && <Scorer />}
      {view === 'probability' && <App />}
      {view === 'simulator' && <Simulator />}
    </div>
  )
}
