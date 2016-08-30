'use strict'
var React = require('react');

var MUI = require('app/common/MaterialUI');

var color = {
  ERROR: {color:MUI.colors.red500},
  WARNING: {color:MUI.colors.amber500},
  MESSAGE: {color:MUI.colors.grey100}
}

module.exports = React.createClass({
  render: function() {
    return (
      <MUI.Snackbar
          open={this.props.message.open}
          message={<div style={color[this.props.message ? this.props.message.type : color.MESSAGE]}>{this.props.message ? this.props.message.text : null}</div>}
          autoHideDuration={2000}
          onRequestClose={this.props.onClose} />
      );
  }
});
