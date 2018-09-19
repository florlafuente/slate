import React from 'react'

const CommentMark = (props) => (
  <span className='comment' data-id={props.id}>
    {props.children}
    <style jsx>{`
      .comment {
        background-color: #e3effa;
      }
    `}</style>
  </span>
)

export default CommentMark