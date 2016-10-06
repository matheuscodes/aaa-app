var React = require('react');

module.exports = React.createClass({
  render: function() {
    var unit = (this.props.max - this.props.min) / 10;
    var max = this.props.max;
    var min = this.props.min;

    if (unit <= 0) return (<g id="left" transform="translate(0,0)"></g>);

    var labels = this.props.content.map(function(value, index) {
      return (
        <g key={'aaa-graphBottomLabel_' + index} transform={'translate(' + ((index) * 100 + 50) + ',50)'} >
          { this.props.prefix ?
            <g>
              <text className="bottom" x="0" y="0">{this.props.prefix}</text>
              <text className="bottom" x="0" y="45">{value}</text>
            </g> :
              <text className="bottom" x="0" y="0">{value}</text> }
        </g>
      );
    }, this);

    if (this.props.multiplier) {
      unit *= this.props.multiplier;
      max *= this.props.multiplier;
    }

    return (
      <g id="bottom">
        {labels}
      </g>
    );
  }
});
