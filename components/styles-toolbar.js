import React from 'react'

export default (props) => (
  <nav className='styles-toolbar'>
    {props.children}
    <style jsx>{`
      .styles-toolbar {
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        padding: 16px 25px;
        border-radius: 3px;
        background-color: #203340;
        box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
      }
    `}</style>
  </nav>
)
