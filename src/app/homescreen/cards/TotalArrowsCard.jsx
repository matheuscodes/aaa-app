'use strict'
var React = require('react');
var MUI = require('app/common/MaterialUI');

module.exports = React.createClass({
  getInitialState: function() {
    return {days:[],max:1};
  },
  componentWillMount: function() {
    this.setState({
      days: [
        {date: "2016-02-22", count:21},
        {date: "2016-02-21", count:5},
        {date: "2016-02-20", count:30}
      ],
      max: 33
    });
  },
  render: function() {
    var dailyCounts = this.state.days.map(function(day) {
      return (
        <MUI.ListItem
          key={'aaa-dayCount_'+day.date}
          primaryText={
            <div>
              <b>{day.date}</b>
              <div style={{width: ((day.count/this.state.max)*100)+'%'}} className='aaa-home-arrows-day mdl-color-text--accent-contrast mdl-color--accent'>
                 {day.count}
              </div>
            </div>
          } />
      );
    },this);

    return (
      <MUI.Card>
        <MUI.CardHeader
          title="Text['home_arrows']"
          subtitle="Text['home_arrows subtitle']" />
        <MUI.CardText>
          <MUI.List>
            {dailyCounts}
          </MUI.List>
        </MUI.CardText>
      </MUI.Card>
    );
  }
});
