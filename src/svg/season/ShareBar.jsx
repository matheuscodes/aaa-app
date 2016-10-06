var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <g transform={'translate(' + (this.props.column * 100) + ',' + (-this.props.value) + ')'} >
        <rect className="share-shadow" x="5" y="0" height="20" width="100" />
        <rect className="share" y="-5" height="20" width="100" />
      </g>
    );
  }
});
