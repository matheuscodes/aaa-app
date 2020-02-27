import React from 'react'

const PlanBar = React.createClass({
  propTypes: {
    value: React.PropTypes.number,
    column: React.PropTypes.number
  },
  render: function() {
    return (
      <g transform={'translate(0,' + (-this.props.value) + ')'}>
        <rect
          className="plan" x={(10 + this.props.column * 100)}
          height={this.props.value} width="80" />
      </g>
    );
  }
});

export default PlanBar;
