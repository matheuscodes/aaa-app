import React from 'react'

class PlanBar extends React.Component {
  render() {
    return (
      <g transform={'translate(0,' + (-this.props.value) + ')'}>
        <rect
          className="plan" x={(10 + this.props.column * 100)}
          height={this.props.value} width="80" />
      </g>
    );
  }
}

export default PlanBar;
