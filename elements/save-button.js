import React from 'react'

export default ({ saveDocument }) => (
  <button
    onClick={saveDocument}
    className='save-button'>
    Guardar cambios
    <style jsx>{`
      .save-button {
        border: none;
        width: 165px;
        height: 40px;
        background-color: #5c98bd;
        cursor: pointer;
        font-size: 16px;
        color: #FFF;
        text-align: center;
      }
    `}</style>
  </button>
)