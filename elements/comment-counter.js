import React from 'react'

export default (props) => (
  <div className='counter-wrapper'>
    <span className='counter-span'>{props.count} aportes de usuarios</span>
    <span className='text-span'>click para abrir aportes</span>
    <style jsx>{`
      .counter-wrapper {
        width: 208px;
        height: 66px;
        background-color: #ffffff;
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.3);
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        position: relative;
      }
      .counter-wrapper:after {
        content: "";
        display: block;
        position: absolute;
        border-top: 5px solid;
        border-top-color: #ffffff;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        bottom: -5px;
        left: 50%;
        width: 0;
        height: 0;
        margin-left: -5px;
      }
      .counter-span {;
        font-size: 16px;
        color: #ef885d;
      }
      .text-span {
        font-size: 12px;
        color: #4a5d68;
      }
    `}</style>
  </div>
)