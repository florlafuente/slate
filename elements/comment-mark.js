import React from 'react'

const CommentMark = (props) => (
  <span
    className='comment'
    data-id={props.id}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave} >
    {props.children}
    <style jsx>{`
      .comment {
        background-color: rgba(92, 151, 188, .4);
      }
    `}</style>
  </span>
)

export default CommentMark