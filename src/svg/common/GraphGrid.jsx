import React from 'react'

const GraphGrid = React.createClass({
  propTypes: {
    height: React.PropTypes.string,
    width: React.PropTypes.string,
    rows: React.PropTypes.number,
    columns: React.PropTypes.number
  },
  render: function() {
    const iteratorV = [];
    for (var i = 0; i <= (this.props.columns || 10); i++) {
      iteratorV.push(i);
    }
    const verticals = iteratorV.map(function(value, index) {
      return (
        <path
          key={'aaa-graphGridVertical_' + index}
          className="grid"
          d={['m ', 100 * index, ',0 0,', (-this.props.height)].join('')} />
      );
    }, this);

    const iteratorH = [];
    for (var k = 0; k <= (this.props.rows || 10); k++) {
      iteratorH.push(k);
    }
    const horizontals = iteratorH.map(function(value, index) {
      return (
        <path key={'aaa-graphGridHorizontal_' + index}
          className="grid"
          d={['m 0,', (-index * this.props.height / 10),
             ' ', (this.props.columns * 100), ',0 '].join('')} />
      );
    }, this);

    return (
      <g>
        {verticals}
        {horizontals}
      </g>
    );
  }
});

export default GraphGrid;
