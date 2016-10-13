const React = require('react');

const ShareBar = React.createClass({
  propTypes: {
    column: React.PropTypes.number,
    value: React.PropTypes.number
  },
  render: function() {
    return (
      <g transform={[
        'translate(', (this.props.column * 100), ',', (-this.props.value), ')'
      ].join('')} >
        <rect className="share-shadow" x="5" y="0" height="20" width="100" />
        <rect className="share" y="-5" height="20" width="100" />
      </g>
    );
  }
});

module.exports = ShareBar;
