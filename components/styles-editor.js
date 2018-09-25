import React, { Component, Fragment, createRef } from 'react'
import { Editor } from 'slate-react'
import { Value, KeyUtils, Range, Change, Mark } from 'slate'
import fetch from 'isomorphic-unfetch'

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


class StylesEditor extends Component {
  constructor (props) {
    super(props)
    KeyUtils.resetGenerator()
    this.state = {
      value: null
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

  handleChange = ({ value }) => {
    this.setState({ value }) 
  }

  render() {
    return (
      <Fragment>
      { this.state.value &&
        <div
          ref={this.myEditor}>
          <Editor
            value={this.state.value} />
        </div>
      }
      </Fragment>
    )
  }
}

export default StylesEditor