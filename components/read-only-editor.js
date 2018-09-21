import React, { Component, Fragment } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'

export default class extends Component {
  state = {
    value: null
  }

  async componentDidMount () {
    try {
      const result = await(await fetch('api/documents')).json()
      this.setState({
        value: result ? Value.fromJSON(result[0].content) : initialValue
      })
    } catch(err) {
      console.error(err)
    }
  }


  render () {
    return (
      <Fragment>
      {this.state.value &&
        <Editor
          value={this.state.value}
          spellCheck={false} />
      }
      </Fragment>
    )
  }
}
