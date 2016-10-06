'use strict';
var React = require('react');
var MUI = require('app/common/MaterialUI');

var BaseLayout = require('app/common/BaseLayout.jsx');
var TotalArrowsCard = require('app/homescreen/cards/TotalArrowsCard.jsx');
var EventsCard = require('app/homescreen/cards/EventsCard.jsx');
var TasksCard = require('app/homescreen/cards/TasksCard.jsx');
var YearOverviewCard = require('app/homescreen/cards/YearOverviewCard.jsx');
var ValueDistributionCard = require('app/homescreen/cards/ValueDistributionCard.jsx');
var EndDistributionCard = require('app/homescreen/cards/EndDistributionCard.jsx');
var SeasonsCard = require('app/homescreen/cards/SeasonsCard.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <BaseLayout switcher={this.props.switcher} userAgent={this.props.userAgent} layoutName="homePage" languages={this.props.languages} title='Text["Home title"]' >
        <MUI.GridList cellHeight={'auto'} cols={4} rows={3} padding={10} >
          <MUI.GridTile style={{padding: '5pt'}} cols={1} >
            <TotalArrowsCard />
          </MUI.GridTile>
          <MUI.GridTile style={{padding: '5pt'}} cols={1} >
            <EventsCard />
          </MUI.GridTile>
          <MUI.GridTile style={{padding: '5pt'}} cols={1} >
            <TasksCard />
          </MUI.GridTile>
          <MUI.GridTile style={{padding: '5pt'}} cols={1} >
            <YearOverviewCard />
          </MUI.GridTile>
          <MUI.GridTile style={{padding: '5pt'}} cols={2} >
            <ValueDistributionCard />
          </MUI.GridTile>
          <MUI.GridTile style={{padding: '5pt'}} cols={2} >
            <EndDistributionCard />
          </MUI.GridTile>
          <MUI.GridTile style={{padding: '5pt'}} cols={4} >
            <SeasonsCard />
          </MUI.GridTile>
        </MUI.GridList>
      </BaseLayout>
    );
  }
});
