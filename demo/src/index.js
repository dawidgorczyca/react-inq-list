import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {render} from 'react-dom'

import InqList from '../../src'

const exampleList = [
  'item 1',
  'item 2',
  'item 3',
  'item 4',
  'item 5',
  'item 6',
  'item 7',
  'item 8',
]

class CustomItemComponent extends Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
  }
  static defaultProps = {
    className: '',
    content: 'List item',
  }
  render() {
    const {
      className,
      onClick,
      onDoubleClick,
      onMouseEnter,
      onMouseLeave,
      content,
      ...props
    } = this.props
    const customStyle = {
      color: 'red'
    }
    return (
      <div
        className={classnames('customList__item', props.wrapperClass)}
        onClick={(event) => onClick(event)}
        {...props}
        style={customStyle}
      >
        <span>{content}</span>
      </div>
    )
  }
}

class Demo extends Component {
  state = {
    clicks: 0,
    wrappedClicks: 0,
    wrappedLastClicked: ''
  }

  generateListItems(count, text) {
    let output = []
    for (var i = 0; i < count +1; i++) {
      let label = `${text} ${i}`
      output.push(label)
    }
    return output
  }

  handleItemClick = (event) => {
    this.setState({clicks: this.state.clicks + 1})
  }

  handleWrappedItemClick = (event) => {
    this.setState({
      wrappedClicks: this.state.wrappedClicks + 1,
      wrappedLastClicked: event.target.textContent
    })
  }

  render() {
    const {
      clicks,
      doubleClicks,
      mouseEnter,
      mouseLeave,
      wrappedClicks,
      wrappedLastClicked
    } = this.state

    const wrappedStyles = {
      width: 300,
      height: 400,
      display: 'block',
      overflow: 'auto'
    }

    const wrappedItems = this.generateListItems( 2000, 'List item' )
    const customItems = this.generateListItems( 50, 'Custom item')
    return (
      <div>
        <h1>react-inq-list Demo</h1>

        <h2>Basic usage:</h2>
        <InqList
          items={exampleList}
          itemClassName='myItem'
          className='myList'
          onClick={(event) => this.handleItemClick(event)}
        />

        <div>
          Clicks: {clicks}<br/>
        </div>
        <br/><br/>

        <h2>Wrapped with scroll:</h2>
        <div style={wrappedStyles}>
          <InqList
            items={wrappedItems}
            itemClassName='myItem'
            className='myList'
            sizingMode='fill'
            onClick={(event) => this.handleWrappedItemClick(event)}
          />
        </div>
        <div>
          Clicks: {wrappedClicks}<br/>
          Last clicked: {wrappedLastClicked}
        </div>
        <br/><br/>

        <h2>Custom item component:</h2>
        <div style={wrappedStyles}>
          <InqList
            SingleItem={CustomItemComponent}
            items={customItems}
            itemClassName='myItem'
            className='myList'
            sizingMode='fill'
            onClick={(event) => {}}
          />
        </div>
        <br/><br/>
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))