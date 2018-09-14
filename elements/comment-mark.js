import React from 'react'

const CommentMark = (props) => (
  <span className='highlight' data-id={props.id}>
    {props.children}
    <style jsx>{`
      .highlight {
        background-color: yellow;
      }
    `}</style>
  </span>
)

export default CommentMark