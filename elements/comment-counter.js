import React from 'react'

export default (props) => (
  <div className='counter-wrapper'>
    <span className='counter-span'>{props.count}</span>
    <style jsx>{`
      .counter-wrapper {
        position: absolute;
        top: ${ props.top + 'px' };
        right: 200px;
      }
      .counter-span {
        font-size: 25px;
        font-weight: bold;
        color: #ef885d;
      }
    `}</style>
  </div>
)