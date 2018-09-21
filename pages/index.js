import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import Head from '../components/head'
import Modebar from '../components/modebar'

const CommentsEditor = dynamic(
  import('../components/editor'),
  {
    loading: () => (<p>loading...</p>),
    ssr: false
  }
)

class Home extends Component {
  state = {
    mode: 'comment-view'
  }

  switchMode = (mode) => {
    this.setState({ mode }, () => console.log(this.state.mode))
  }
  render () {
    return (
      <div className='main'>
        <Head title='Slate test' />
        <Modebar
          changeMode={this.switchMode}
          currentMode={this.state.mode} />
        { this.state.mode === 'comment-view' &&
          <CommentsEditor />
        }
      <style jsx>{`
        .main {
          padding: 30px 342px 0 160px;
          font-family: 'Roboto', sans-serif;
          color: #203340;
          box-sizing: border-box;
        }
    `}</style>
  </div>
    )
  }
}

export default Home
