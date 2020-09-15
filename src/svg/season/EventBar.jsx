import React from 'react'

class EventBar extends React.Component {
  render() {
    return (
      <g transform={'translate(0,-1000)'}>
        <text y={1150} x={(this.props.column * 100 + 50)} style={{
            fontSize: '30pt',
            textAnchor: 'middle',
            fontWeight: 'bold',
            fill: this.props.event.color
          }}>
    			{this.props.event.nameShort}
        </text>
        <rect
          style={{fill:this.props.event.color, opacity:0.5}}
          x={(this.props.column * 100)}
          height={1000} width="100" />
      </g>
    );
  }
}

export default EventBar;
