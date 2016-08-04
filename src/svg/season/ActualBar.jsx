var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <g transform={'translate(0,'+(-this.props.target-this.props.training)+')'}>
        <rect className='target' x={(10+this.props.column*100)} height={this.props.target} width='80' />
        <rect className='training' x={(10+this.props.column*100)} y={this.props.target} height={this.props.training} width='80' />
      </g>
    );
  }
});
