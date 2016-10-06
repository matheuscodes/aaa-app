'use strict';
var React = require('react');

var MUI = require('app/common/MaterialUI');

module.exports = React.createClass({
  render: function() {
    return (<div style={{textAlign: 'center'}}><MUI.CircularProgress /></div>);
  }
});
