import { useState } from 'preact/hooks'

import Scorer from './Scorer'
import App from './App'

export default function AppShell() {
  const [view, setView] = useState('probability')

  const toggleView = () => {
    setView(view === 'probability' ? 'scorer' : 'probability')
  }

  return (
    <div>
      <p className="change-text" onClick={toggleView}>
        {view === 'probability' ? 'Show Scorer' : 'Show Probability Tool'}
      </p>
      {view === 'scorer' ? <Scorer /> : <App />}
    </div>
  )
}
