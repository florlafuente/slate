import React from 'react'

const CommentMark = (props) => (
  <span className='comment' data-id={props.id}>
    {props.children}
    <style jsx>{`
      .comment {
        background-color: yellow;
      }
    `}</style>
  </span>
)

export default CommentMark