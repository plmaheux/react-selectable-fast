import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import getBoundsForNode from './getBoundsForNode'

const createSelectable = WrappedComponent => {
  class SelectableItem extends Component {
    static contextTypes = {
      selectable: React.PropTypes.object,
    }

    static propTypes = {
      selected: PropTypes.bool,
    }

    static defaultProps = {
      selected: false,
    }

    constructor(props) {
      super(props)
      this.state = {
        selected: props.selected,
        selecting: false,
      }
    }

    componentDidMount() {
      this.node = ReactDOM.findDOMNode(this) // eslint-disable-line
      this.registerSelectable()
    }

    componentWillUnmount() {
      this.context.selectable.unregister(this)
    }

    registerSelectable = containerScroll => {
      this.bounds = getBoundsForNode(this.node, containerScroll)
      this.context.selectable.register(this)
    }

    render() {
      const props = {
        ...this.props,
        selected: this.state.selected,
        selecting: this.state.selecting,
      }

      return React.createElement(
        WrappedComponent,
        props,
        this.props.children
      )
    }
  }

  return SelectableItem
}

export default createSelectable
