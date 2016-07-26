var React = require('react');
var BaseLayout = require('../common/BaseLayout');

var LoginCard = require('./LoginCard.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <BaseLayout languages={this.props.languages} >
        <div className='mdl-cell mdl-cell--middle mdl-cell--4-col mdl-cell--2-col-tablet mdl-cell--hide-phone'></div>
        <LoginCard />
      </BaseLayout>
    );
  }
});
