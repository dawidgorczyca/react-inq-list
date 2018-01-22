import PropTypes from 'prop-types'
import React, {Component} from 'react'
import classnames from 'classnames'

import ItemComponent from './itemComponent'

class InqList extends Component {
  static propTypes = {
    SingleItem: PropTypes.func,
    items: PropTypes.array,
    sizingMode: PropTypes.string,
    infiniteMode: PropTypes.bool,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  }
  static defaultProps = {
    SingleItem: ItemComponent,
    onClick: (event) => {},
    onDoubleClick: (event) => {},
    onMouseEnter: (event) => {},
    onMouseLeave: (event) => {},
  }

  state = {
    listHeight: 0,
    itemHeight: 0,
    parentHeight: 0,
    visibleStart: 0,
    visibleEnd: 0
  }

  componentDidMount() {
    const { sizingMode } = this.props
    if ( this.listRef && sizingMode === 'fill' ) {
      this.defineHeight()
      this.handleScroll()
      window.addEventListener( 'scroll', () => window.setTimeout(this.handleScroll(), 100), true)
    }
  }

  defineHeight() {
    let listHeight = 0 
    let itemHeight = 0
    Array.from(this.listRef.children).forEach((item) => {
      listHeight += item.offsetHeight
      itemHeight = item.offsetHeight
    })
    this.setParentHeight(this.listRef.parentNode.offsetHeight)
    this.setListHeight(listHeight)
    this.setItemHeight(itemHeight)
  }

  setParentHeight(height){
    this.setState({parentHeight: height})
  }

  setListHeight(height) {
    this.setState({listHeight: height})
  }

  setItemHeight(height) {
    this.setState({itemHeight: height})
  }

  handleScroll() {
    this.setState({
      visibleStart: Math.floor(this.listRef.parentNode.scrollTop / this.state.itemHeight),
      visibleEnd: Math.floor((this.listRef.parentNode.scrollTop + this.state.parentHeight ) / this.state.itemHeight)
    })
  }

  renderItems() {
    const {
      SingleItem,
      items,
      itemClassName,
      onClick,
      onDoubleClick,
      onMouseEnter,
      onMouseLeave,
      sizingMode
    } = this.props
    const {
      visibleStart,
      visibleEnd,
      itemHeight
    } = this.state

    return items.map((item, index) => {
      const singleItem = <SingleItem
        content={item}
        key={index}
        className={itemClassName}
        onClick={(event) => onClick(event)}
        onDoubleClick={(event) => onDoubleClick(event)}
        onMouseEnter={(event) => onMouseEnter(event)}
        onMouseLeave={(event) => onMouseLeave(event)}
      />
      const dummyStyle = {
        height: itemHeight,
        display: 'block'
      }
      const dummyItem = <div key={index} style={dummyStyle}></div> 
      if( sizingMode == 'fill' && visibleStart && visibleEnd ) {
        if(index >= visibleStart && index <= visibleEnd ) {
          return singleItem
        } else {
          return dummyItem
        }
      } else {
        return singleItem
      }
    })
  }

  render() {
    const {
      className,
      sizingMode,
      ...props
    } = this.props
    const {
      listHeight
    } = this.state
    const listStyle = sizingMode === 'fill' ? {
      height: listHeight,
      margin: 0
    } : {
      margin: 0
    }
    const renderedItems = this.renderItems()
    return (
      <ul
        ref={( ref ) => { this.listRef = ref; }}
        style={listStyle}
      >
        {renderedItems}
      </ul>
    )
  }
}

export default InqList