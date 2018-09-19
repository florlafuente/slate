import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'

export default class extends Component {
  state = {
    comment: ''
  }

  handleFetch = async (e) => {
    e.preventDefault()
    try {
      const newComment = await(await fetch('api/comments', {
        method: 'POST',
        body: JSON.stringify({
          content: this.state.comment
        })
      })).json()
      this.props.setCommentId(newComment.id)
    } catch(err) {
      console.error(err)
    }
  }

  render () {
    return (
      <div className='comment-wrapper'>
        <form className='comment-form' onSubmit={this.handleFetch}>
          <label htmlFor={'comment'}>
            <span className='comment-label'>Agregar comentario</span>
            <textarea
              placeholder='Tu comentario'
              name='comment'
              onChange={(e) => this.setState({ comment: e.target.value })}
              className='comment-textarea'
              value={this.state.comment}/>
          </label>
          <input className='button-submit' type='submit' value='Enviar comentario' />
        </form>
        <style jsx>{`
          .comment-wrapper {
            position: absolute;
            top: ${ this.props.top + 'px' };
            right: 29px;
            width: 300px;
            height: 305px;
            border-radius: 3px;
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
            background-color: #ffffff;
            border: solid 1px #dae1e7;
          }
          .comment-label {
            box-sizing: border-box;
            width: 100%;
            display: block;
            height: 40px;
            padding: 12px 18px;
            background-color: #5c97bc;
            font-size: 14px;
            font-weight: 500;
            color: #ffffff;
          }
          .comment-textarea {
            box-sizing: border-box;
            border: none;
            width: 100%;
            height: 209px;
            padding: 12px 18px;
            font-family: 'Roboto', sans-serif;
            resize: none;
          }
          .button-submit {
            box-sizing: border-box;
            width: 100%;
            display: block;
            height: 55px;
            padding: 20px 18px;
            color: #5c97bc;
            border: none;
            border-top: 1px solid #dae1e7;
            background-color: #FFF;
            text-align: left;
          }
        `}</style>
      </div>
    )
  }
}
