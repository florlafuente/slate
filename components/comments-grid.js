import React from 'react'
import CommentCard from '../elements/comment-card'
export default ({ comments, addContribution }) => (
  <div className='comment-grid'>
    {comments.map((comment) => (
      <CommentCard
        key={comment._id}
        comment={comment}
        addContribution={addContribution}
      />
    ))}
    <style jsx>{`
      .comment-grid {
        position: absolute;
        top: 20px;
        right: 20px;
        display: flex;
        flex-direction: column;
        width: 300px;
      }
    `}</style>
  </div>
)