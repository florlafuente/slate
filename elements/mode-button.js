import React from 'react'

export default ({ changeMode, mode, value, isActive }) => (
  <button
    onClick={() => changeMode(mode)}
    className={`${isActive ? 'active' : ''}`}>
    { value }
    <style jsx>{`
      button {
        border: none;
        background-color: #FFF;
        font-weight: regular;
        cursor: pointer;
      }
      .active {
        color: #5c97bc;
        font-weight: bold;
      }
      button:hover {
        color: #5c97bc;
      }
    `}</style>
  </button>
)