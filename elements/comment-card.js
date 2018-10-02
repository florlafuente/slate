import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Icon from 'react-icons-kit'
import { square } from 'react-icons-kit/feather/square'
import { star } from 'react-icons-kit/feather/star'
import ContributionCard from './contribution-card'


export default class extends Component {
  state = {
    status: 'pending'
  }

  resolveComment = async (e) => {
    e.preventDefault()
    try {
      const editedComment = await( await fetch(`/api/comments/${this.props.comment._id}`, {
        'method': 'PUT',
        'headers': {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
          'content': this.props.comment.content,
          'status': 'resolved'
        })
      })).json()
      this.setState({
        status: 'resolved'
      })
    } catch (err) {
      console.error(err)
    }
  }

  addContribution = () => {
    this.props.addContribution(this.props.comment._id)
    this.setState({
      status: 'contribution'
    })
  }

  render () {
    const { status } = this.state
    if (status === 'resolved') return null
    if (status === 'contribution') return <ContributionCard />
    return (
      <div className='comment-card'>
      <h2>Comentario</h2>
      <p>{this.props.comment.content}</p>
      {this.props.addContribution &&
        <div className='action-wrapper'>
          <button
            className='resolve-button'
            onClick={this.resolveComment}>
            <Icon icon={square} />
            <span>Marcar como resuelto</span>
          </button>
          <button
            className='contribution-button'
            onClick={this.addContribution}>
            <Icon icon={star} />
            <span>Marcar como aporte</span>
          </button>
        </div>
      }
    <style jsx>{`
      .comment-card {
        width: 300px;
        border-radius: 3px;
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        background-color: #ffffff;
        border: solid 1px #dae1e7;
        margin-bottom: 20px;
      }
      .comment-card h2 {
        box-sizing: border-box;
        width: 100%;
        display: block;
        height: 40px;
        padding: 12px 18px;
        background-color: #5c97bc;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
        margin: 0;
      }
      .comment-card p {
        box-sizing: border-box;
        border: none;
        width: 100%;
        padding: 12px 18px;
        font-family: 'Roboto', sans-serif;
      }
      .contribution-wrapper {
        padding: 20px;
      }
    `}</style>
    </div>
    )
  }
}

