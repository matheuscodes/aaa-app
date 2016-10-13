const React = require('react');

const ActualBar = React.createClass({
  propTypes: {
    target: React.PropTypes.number,
    training: React.PropTypes.number,
    column: React.PropTypes.number
  },
  render: function() {
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
});

module.exports = ActualBar;
