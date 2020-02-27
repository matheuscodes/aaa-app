import React from 'react'

const GraphBar = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    column: React.PropTypes.number,
    value: React.PropTypes.number,
    position: React.PropTypes.number,
    size: React.PropTypes.number
  },
  render: function() {
    return (
      <g transform={'translate(0,' + (-this.props.value) + ')'}>
        <rect className={this.props.type}
              x={(10 + this.props.column * 100 +
                (80 * this.props.position / this.props.size))}
              height={this.props.value}
              width={(80 / this.props.size)} />
      </g>
    );
  }
});

export default GraphBar;
