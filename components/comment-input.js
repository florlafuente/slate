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
      <form onSubmit={this.handleFetch}>
        <label htmlFor={'comment'}>Ingresa tu comentario
        <input
          type='text'
          name='comment'
          onChange={(e) => this.setState({ comment: e.target.value })}
          value={this.state.comment}/>
        </label>
        <input type='submit' value='Enviar comentario' />
      </form>
    )
  }
}
