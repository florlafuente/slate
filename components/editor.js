import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import { toolbar } from 'slate-toolbar'

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              }
            ]
          }
        ]
      }
    ]
  }
})

function MarkHotkey(options) {
  const { type, key } = options
  return {
    onKeyDown(event, change) {
      if (!event.ctrlKey || event.key != key) return
      event.preventDefault()
      change.toggleMark(type)
      return true
    }
  }
}

const plugins = [
  MarkHotkey({ key: 'b', type: 'bold' }),
  MarkHotkey({ key: '`', type: 'code' }),
  MarkHotkey({ key: 'i', type: 'italic' }),
  MarkHotkey({ key: '~', type: 'strikethrough' }),
  MarkHotkey({ key: 'u', type: 'underline' }),
]

@toolbar()
class MyEditor extends React.Component {
  state = {
    value: initialValue,
  }

  onChange = ({ value }) => {
    const content = JSON.stringify(value.toJSON())
    localStorage.setItem('content', content)
    this.setState({ value }, () => console.log(this.state.value))
  }

  render() {
    return (
      <Editor
        plugins={plugins}
        value={this.state.value}
        onChange={this.onChange}
        renderMark={this.renderMark}
      />
    )
  }

  renderMark = props => {
    switch (props.mark.type) {
      case 'bold':
        return <strong>{props.children}</strong>
      // Add our new mark renderers...
      case 'code':
        return <code>{props.children}</code>
      case 'italic':
        return <em>{props.children}</em>
      case 'strikethrough':
        return <del>{props.children}</del>
      case 'underline':
        return <u>{props.children}</u>
    }
  }
}

export default MyEditor