import React from 'react'

const CommentMark = (props) => (
  <span className='comment' data-id={props.id}>
    {props.children}
  </span>
)

export default CommentMark