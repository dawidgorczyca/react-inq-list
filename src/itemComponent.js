import PropTypes from 'prop-types'
import React, {Component} from 'react'
import classnames from 'classnames'

class ItemComponent extends Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    content: PropTypes.string,
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
    return (
      <div
        className={classnames('inqList__item', props.wrapperClass)}
        onClick={(event) => onClick(event)}
        onDoubleClick={(event) => onDoubleClick(event)}
        onMouseEnter={(event) => onMouseEnter(event)}
        onMouseLeave={(event) => onMouseLeave(event)}
        {...props}
      >
        {content}
      </div>
    )
  }
}

export default ItemComponent