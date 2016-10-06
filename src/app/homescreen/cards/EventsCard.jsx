'use strict';
var React = require('react');
var MUI = require('app/common/MaterialUI');

module.exports = React.createClass({
  getInitialState: function() {
    return {events: []};
  },
  componentWillMount: function() {
    this.setState({
      events: [
        {name: "Vereinmeisterschaft", date: '2016-01-01', days: 3, name_short: "VM"},
        {name: "Kreismeisterschaft", date: '2016-02-01', days: 1, name_short: "KM"},
        {name: "Landesmeisterschaft", date: '2016-03-01', days: 2, name_short: "LM"}
      ]
    });
  },
  render: function() {
    var events = this.state.events.map(function(event) {
      return (
        <MUI.ListItem
          key={'aaa-event_' + event.date + '_' + event.name_short}
          primaryText={
            <p style={{fontSize: '80%', margin: 0}}>
              <strong>{event.name}</strong><br/>
              <strong>Text['profile_event_start']: </strong>{event.date}<br/>
              {event.days}<strong> Text['days'].</strong>
            </p>
          }
          leftAvatar={<MUI.Avatar>event['name_short']</MUI.Avatar>} />
      );
    }, this);
    return (
      <MUI.Card>
        <MUI.CardHeader
          title="Text['home_events']"
          subtitle="Text['home_events subtitle']" />
        <MUI.CardText>
          <MUI.List>
            {events}
          </MUI.List>
        </MUI.CardText>
      </MUI.Card>
    );
  }
});
