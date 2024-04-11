import React, { useState } from 'react'

import Scorer from './Scorer'
import App from './App'

export default function Routes() {
  const [scorer, setScorer] = useState(false)

  const switcher = () => {
    setScorer(!scorer)
  }

  return (
    <div>
      <p className="p-4 change-text" onClick={switcher}>
        Change
      </p>
      {scorer ? <Scorer /> : <App />}
    </div>
  )
}
