import React, { Component } from 'react'

class  Toolbar extends Component {
  render () {
    return (
      <nav className='toolbar'>
        {this.props.children}
        <style jsx>{`
          .toolbar {
            position: absolute;
            top: ${ this.props.top + 'px' };
            left: ${ this.props.left + 'px' };
            width: 208px;
            background-color: #203340;
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
            padding: 10px 20px;
            margin: 0 0 10px 0;
            display: flex;
            justify-content: space-around;
            border-radius: 10px;
            color: #FFF;
            z-index: 100;
          }
          .toolbar:after {
            content: "";
            display: block;
            position: absolute;
            border-top: 5px solid;
            border-top-color: #203340;
            border-right: 5px solid transparent;
            border-left: 5px solid transparent;
            bottom: -5px;
            left: 50%;
            width: 0;
            height: 0;
            margin-left: -5px;
          }
        `}</style>
      </nav>
    )
  }
}

export default Toolbar
