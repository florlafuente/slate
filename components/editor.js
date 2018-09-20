import React, { Component, Fragment, createRef } from 'react'
import { Editor, findRange } from 'slate-react'
import { Value, KeyUtils, Range, Change, Mark } from 'slate'
import fetch from 'isomorphic-unfetch'
import { getVisibleSelectionRect } from 'get-selection-range'
import Toolbar from './toolbar'
import CommentInput from './comment-input'
import HighlightMark from '../elements/highlight-mark'
import CommentMark from '../elements/comment-mark'
import ToolbarButton from '../elements/toolbar-button'
import CommentCounter from '../elements/comment-counter'

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
                text: 'Neutra four dollar toast everyday carry gastropub selfies, tumblr swag labore health goth sriracha single-origin coffee. Post-ironic vice celiac paleo meggings chicharrones hoodie marfa photo booth. 3 wolf moon ut roof party quinoa. Jianbing mollit fixie, waistcoat selvage ipsum pug fashion axe. Elit direct trade man bun kickstarter literally beard, iPhone ea drinking vinegar gentrify locavore wayfarers consequat truffaut. Synth nulla gochujang health goth jean shorts DIY. Post-ironic man braid reprehenderit, next level etsy lyft deep v ethical. Fanny pack sed unicorn aute, est jianbing duis pinterest hoodie velit leggings. Four dollar toast do eu everyday carry, vape elit adaptogen tumeric coloring book cold-pressed art party ullamco in cronut. Disrupt wolf williamsburg lyft, pug beard fanny pack minim af. Flannel before they sold out aesthetic hammock asymmetrical, bushwick kogi unicorn +1 tbh cillum hell of fingerstache. Street art glossier anim succulents hot chicken brooklyn. Commodo hoodie ethical echo park kinfolk, sint locavore hashtag bicycle rights cupidatat flannel cloud bread. Knausgaard waistcoat af cloud bread nulla exercitation ea cronut, kitsch hot chicken anim meggings photo booth VHS. Laboris craft beer raclette knausgaard tote bag, fashion axe pariatur etsy YOLO lomo dreamcatcher ad gastropub. Microdosing taiyaki bushwick paleo mlkshk, fam normcore.'
              }
            ]
          }
        ]
      }
    ]
  }
})


class MyEditor extends Component {
  constructor (props) {
    super(props)
    KeyUtils.resetGenerator()
    this.state = {
      documentId: null,
      value: null,
      selection: null,
      showToolbar: false,
      showCommentForm: false,
      top: null,
      left: null,
      commentsIds: [],
      comments: null
    }
    this.myEditor = createRef()
    this.toolbar = createRef()
  }

  schema = {
    marks: {
      comment: {
        isAtomic: true,
      }
    }
  }

  async componentDidMount () {
    try {
      const result = await(await fetch('api/documents')).json()
      this.setState({
        documentId: result[0]._id,
        value: result ? Value.fromJSON(result[0].content) : initialValue
      })
    } catch(err) {
      console.error(err)
    }
  }

  componentDidUpdate () {
    const rect = getVisibleSelectionRect()
    if (!rect) { return }
    if (rect.width === 0 && this.state.showToolbar) {
      this.setState({ showToolbar: false })
    }
    if (rect && rect.width > 0 && !this.state.showToolbar) {
      const containerBound = this.myEditor.current.getBoundingClientRect()
      const {
        left: containerBoundLeft,
        top: containerBoundTop
      } = containerBound
      const left =
        rect.left +
        rect.width / 2 -
        containerBoundLeft -
        150 / 2
      const top =
        rect.top -
        containerBoundTop -
        30
      this.setState({
        showToolbar: true,
        left: left,
        top: top
      })
    }
  }

  handleChange = async ({ value }) => {
    if (value.document != this.state.value.document) {
      const content = value.toJSON()
      try {
        const updatedContent = await(await fetch (`/api/documents/${this.state.documentId}`, {
          'method': 'PUT',
          'headers': {
            'Content-Type': 'application/json'
          },
          'body': JSON.stringify({
            'content': content
          })
        })).json()
      } catch (err) {
        console.error(err)
      }
    }
    this.setState({ value }) 
  }

  onMarkClick = (e, type) => {
    e.preventDefault()
    const { value } = this.state
    const change = value.change().toggleMark(type)
    this.handleChange(change)
  }
  
  handleHighlight = (e) => {
    e.preventDefault()
    const { value } = this.state
    const change = value.change().toggleMark('highlight')
    this.setState({
      showCommentForm: true,
      selection: value.selection.toJSON()
    }) 
    this.handleChange(change)
  }

  setCommentId = (id) => {
    this.setState({
      showCommentForm: false
    })
    const { value, selection } = this.state
    const range = Range.fromJSON(selection).toJSON()
    const mark = Mark.create({
      data: {
        'data-id': id
      },
      'type': 'comment'
      })
    const change = value
      .change()
      .select(range)
      .toggleMark({ type: 'highlight' })
      .addMark(mark)
      this.handleChange(change)
  }

  onCommentHoverIn = (id) => (e) => {
    const top = e.screenY - 145
    this.setState((prevState) => {
      return {
        commentsIds: prevState.commentsIds.concat(id),
        top: top 
      }
    }, () => console.log(this.state.commentsIds))
  }

  onCommentHoverOut = (e) => {
    this.setState({
      commentsIds: []
    })
  }

  fetchComments = (id) => async (e) => {
    try {
      const comments = await( await fetch(`/api/comments?ids=${this.state.commentsIds}`)).json()
      this.setState({
        comments: comments
      })
    } catch (err) {
      console.error(err)
    }
  }
    
  renderMark = (props) => {
    switch (props.mark.type) {
      case 'comment' :
        return <CommentMark
          id={props.mark.toJSON().data['data-id']}
          onMouseEnter={this.onCommentHoverIn}
          onMouseLeave={this.onCommentHoverOut}
          onClick={this.fetchComments}
          {...props} />
      case 'highlight':
      return <HighlightMark {...props} />
      default:
        return
    }
  }

  render() {
    return (
      <Fragment>
      {this.state.commentsIds.length > 0 &&
        <CommentCounter count={this.state.commentsIds.length} top={this.state.top} />
      }
      {this.state.showToolbar &&
        <Toolbar
          ref={this.toolbar}
          top={this.state.top}
          left={this.state.left}
          >
          <ToolbarButton
            function={(e) => this.handleHighlight(e)}>
            <span>Agregar comentario</span>
          </ToolbarButton>
        </Toolbar>
      }
      { this.state.value &&
        <div
          ref={this.myEditor}>
          <Editor
            value={this.state.value}
            schema={this.schema}
            onChange={this.handleChange}
            renderMark={this.renderMark}
            onBlur={() => this.setState({ showToolbar: false })}
          />
        </div>
      }
        {this.state.showCommentForm &&
          <CommentInput
            top={this.state.top}
            setCommentId={this.setCommentId}
            documentId={this.state.documentId} />
        }
      </Fragment>
    )
  }
}

export default MyEditor