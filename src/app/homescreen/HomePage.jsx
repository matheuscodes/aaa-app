var React = require('react');
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
      <BaseLayout layoutName='homePage' languages={this.props.languages} title='Text["Home title"]' >
        <div className='mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone'></div>
        <TotalArrowsCard />
        <EventsCard />
        <TasksCard />
        <YearOverviewCard />
        <div className='mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone'></div>
        <div className='mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone'></div>
        <ValueDistributionCard />
        <EndDistributionCard />
        <div className='mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone'></div>
        <div className='mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone'></div>
        <SeasonsCard />
        <div className='mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone'></div>
      </BaseLayout>
    );
  }
});
