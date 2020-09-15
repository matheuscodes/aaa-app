import React from 'react'

class ActualBar extends React.Component {
  render() {
    return (
      <g transform={[
        'translate(0,', (-this.props.target - this.props.training), ')'
      ].join('')}>
        <rect
          className="target"
          x={(10 + this.props.column * 100)}
          height={this.props.target > 0 ? this.props.target : 0}
          width="80" />
        <rect
          className="training"
          x={(10 + this.props.column * 100)}
          y={this.props.target}
          height={this.props.training > 0 ? this.props.training : 0}
          width="80" />
      </g>
    );
  }
}

export default ActualBar;
