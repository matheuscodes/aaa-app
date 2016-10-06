var React = require('react');

module.exports = React.createClass({
  render: function() {
    var iterator_v = [];
    for (var i = 0; i <= (this.props.columns ? this.props.columns : 10); i++) {
      iterator_v.push(i);
    }
    var verticals = iterator_v.map(function(value, index) {
      return (
        <path key={'aaa-graphGridVertical_' + index} className="grid" d={'m ' + 100 * index + ',0 0,' + (-this.props.height)} />
      );
    }, this);

    var iterator_h = [];
    for (var i = 0; i <= (this.props.rows ? this.props.rows : 10); i++) {
      iterator_h.push(i);
    }
    var horizontals = iterator_h.map(function(value, index) {
      return (
        <path key={'aaa-graphGridHorizontal_' + index} className="grid" d={'m 0,' + (-index * this.props.height / 10) + ' ' + (this.props.columns * 100) + ',0 '} />
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
