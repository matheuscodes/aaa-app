var React = require('react');

var MUI = require('app/common/MaterialUI');
var API = require('api');

var BaseLayout = require('app/common/BaseLayout.jsx');
var LoginCard = require('app/login/LoginCard.jsx');
var ArcherStanding = require('svg/icon/ArcherStanding.jsx');
var ArcherWheelchair = require('svg/icon/ArcherWheelChair.jsx');

module.exports = React.createClass({
  getInitialState: function(){
    return {}
  },
  render: function() {
    var icon = {primary: ArcherStanding, secondary: ArcherWheelchair};
    return (
      <BaseLayout layoutName='loginPage' userAgent={this.props.userAgent} languages={this.props.languages} title='Welcome to Advanced Archery' headerIcon={icon} >
        <MUI.GridList cellHeight={'unset'} cols={4} padding={10} style={{witdth:'100%'}} >
          <MUI.GridTile style={{padding:'5pt'}} cols={1} >
            {" "}
          </MUI.GridTile>
          <MUI.GridTile style={{padding:'5pt'}} cols={2} >
            <LoginCard />
          </MUI.GridTile>
        </MUI.GridList>
      </BaseLayout>
    );
  }
});
