import React from 'react'
import Icon from 'react-icons-kit'
import { checkCircle } from 'react-icons-kit/feather/checkCircle'

export default () => (
  <div className='contribution-card'>
    <div className='check-wrapper'>
      <Icon icon={checkCircle} />
    </div>
    <div className='text-wrapper'>
      <span>El comentario ha sido agregado como aporte.</span>
    </div>
    <style jsx>{`
      .contribution-card {
        display: flex;
        box-sizing: border-box;
        width: 300px;
        height: 122px;
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        background-color: #ffffff;
        border: solid 1px #b8e986;
        margin-bottom: 30px;
      }
      .check-wrapper {
        width: 50px;
        height: 122px;
        background-color: #b8e986;
        color: #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .text-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center; 
      }
    `}</style>
  </div>
)