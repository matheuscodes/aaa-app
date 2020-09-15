import React from 'react'

class GraphBar extends React.Component {
  render() {
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
}

export default GraphBar;
