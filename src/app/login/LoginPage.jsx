var React = require('react');
var BaseLayout = require('app/common/BaseLayout.jsx');

var LoginCard = require('app/login/LoginCard.jsx');
var ArcherStanding = require('icons/ArcherStanding.jsx');
var ArcherWheelchair = require('icons/ArcherWheelChair.jsx');

module.exports = React.createClass({
  render: function() {
    var icon = {primary: ArcherStanding, secondary: ArcherWheelchair};
    return (
      <BaseLayout layoutName='loginPage' languages={this.props.languages} title='Welcome to Advanced Archery' headerIcon={icon} >
        <div className='mdl-cell mdl-cell--middle mdl-cell--4-col mdl-cell--2-col-tablet mdl-cell--hide-phone'></div>
        <LoginCard />
      </BaseLayout>
    );
  }
});
