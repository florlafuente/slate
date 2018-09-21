import React from 'react'
import ModeButton from '../elements/mode-button'

const modes = [
  {
    "mode": 'comment-view',
    "value": 'Vista con comentarios'
  },
  {
    "mode": 'read-only',
    "value": 'Vista sólo lectura'
  }
]

export default ({ changeMode, currentMode }) => (
  <nav>
    {modes.map((mode, i) => (
      <ModeButton
        changeMode={changeMode}
        mode={mode.mode}
        value={mode.value}
        isActive={currentMode === mode.mode}
        key={i} />
    ))}
    <style jsx>{`
      nav {
        margin-bottom: 20px;
        padding: 10px 0;
        border-bottom: 2px solid #5c97bc;
        display: flex;
        justify-content: space-around;
      }
    `}</style>
  </nav>
)