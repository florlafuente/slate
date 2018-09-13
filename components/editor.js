import React, { Component, Fragment } from 'react'
import { Editor } from 'slate-react'
import { Value, KeyUtils } from 'slate'
import Icon from 'react-icons-kit'
import { bold } from 'react-icons-kit/feather/bold'
import { italic } from 'react-icons-kit/feather/italic'
import {ic_comment} from 'react-icons-kit/md/ic_comment'
import Toolbar from './toolbar'
import CommentInput from './comment-input'
import BoldMark from '../elements/bold-mark'
import ItalicMark from '../elements/italic-mark'
import HighlightMark from '../elements/highlight-mark'
import ToolbarButton from '../elements/toolbar-button'

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
      value: initialValue,
      selection: null,
      showCommentForm: false,
      newComment: null
    }
  }

  handleChange = ({ value }) => (
    this.setState({ value })
  )

  handleKeyDown = (event, change) => {
    if (!event.ctrlKey) return
    event.preventDefault()
    switch (event.key) {
    case 'b': {
      change.toggleMark('bold')
      return true
      }
    case 'i': {
      change.toggleMark('italic')
      return true
      }
    default: {
      return
      }
    }
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
      selection: value.fragment.text
    }) 
    this.handleChange(change)
  }

  renderMark = (props) => {
    switch (props.mark.type) {
      case 'highlight':
      return <HighlightMark {...props} />
      case 'bold':
      return <BoldMark {...props} />
      case 'italic':
      return <ItalicMark {...props} />
      default:
        return
    }
  }

  render() {
    return (
      <Fragment>
        <Toolbar>
          <ToolbarButton
            function={(e) => this.onMarkClick(e, 'bold')}>
            <Icon icon={bold} />
          </ToolbarButton>
          <ToolbarButton
            function={(e) => this.onMarkClick(e, 'italic')}>
            <Icon icon={italic} />
          </ToolbarButton>
          <ToolbarButton
            function={(e) => this.handleHighlight(e)}>
            <Icon icon={ic_comment} />
          </ToolbarButton>
        </Toolbar>
        <Editor
          value={this.state.value}
          onChange={this.handleChange}
          renderMark={this.renderMark}
        />
        {this.state.showCommentForm &&
          <CommentInput />
        }
      </Fragment>
    )
  }
}

export default MyEditor