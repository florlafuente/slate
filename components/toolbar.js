import React from 'react'

const Toolbar = (props) => (
  <nav className='toolbar'>
    {props.children}
    <style jsx>{`
      .toolbar {
        width: 500px;
        padding: 10px 0;
        margin: 0 0 10px 0;
        display: flex;
        background-color: #000;
      }
    `}</style>
  </nav>
)

export default Toolbar
