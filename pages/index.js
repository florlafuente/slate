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

const ReadOnlyEditor = dynamic(
  import('../components/read-only-editor'),
  {
    loading: () => (<p>loading...</p>),
    ssr: false
  }
)

const StylesEditor = dynamic(
  import('../components/styles-editor'),
  {
    loading: () => (<p>loading...</p>),
    ssr: false
  }
)

const NewVersionEditor = dynamic(
  import('../components/new-version-editor'),
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
    this.setState({ mode })
  }

  renderSwitch = (mode) => {
    switch(mode) {
      case 'comment-view':
        return <CommentsEditor />
      case 'read-only':
        return <ReadOnlyEditor />
      case 'text-editor':
        return <StylesEditor />
      case 'comment-editor':
        return <NewVersionEditor />
      default:
        return null
    }
  }
  render () {
    return (
      <div className='main'>
        <Head title='Slate test' />
        <Modebar
          changeMode={this.switchMode}
          currentMode={this.state.mode} />
        {this.renderSwitch(this.state.mode)}
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
