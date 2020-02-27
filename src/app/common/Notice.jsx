import React from 'react'

import MUI from 'app/common/MaterialUI'

const color = {
  ERROR: {color: MUI.colors.red500},
  WARNING: {color: MUI.colors.amber500},
  MESSAGE: {color: MUI.colors.grey100}
};

export default React.createClass({
  render: function() {
    return (
      <MUI.Snackbar
          open={this.props.message.open}
          message={<div style={color[this.props.message ? this.props.message.type : color.MESSAGE]}>{this.props.message ? this.props.message.text : null}</div>}
          autoHideDuration={4000}
          onRequestClose={this.props.onClose} />
      );
  }
});
