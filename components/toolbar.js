import React from 'react'

const Toolbar = (props) => (
  <nav className='toolbar'>
    {props.children}
    <style jsx>{`
      .toolbar {
        width: 200px;
        padding: 10px 20px;
        margin: 0 0 10px 0;
        display: flex;
        justify-content: space-around;
        background-color: #000;
        border-radius: 10px;
        color: #FFF;
      }
    `}</style>
  </nav>
)

export default Toolbar
