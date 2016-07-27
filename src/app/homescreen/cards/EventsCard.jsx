var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {events:[]};
  },
  componentWillMount: function() {
    this.setState({
      events: [
        {name: "Vereinmeisterschaft", date:'2016-01-01', days: 3, name_short:"VM"},
        {name: "Kreismeisterschaft", date:'2016-02-01', days: 1, name_short:"KM"},
        {name: "Landesmeisterschaft", date:'2016-03-01', days: 2, name_short:"LM"}
      ]
    });
  },
  render: function() {
    var events = this.state.events.map(function(event) {
      return (
        <div key={'aaa_event_'+event['date']+'_'+event['name_short']} id={'aaa_event_'+event['date']+'_'+event['name_short']} className='aaa-events-item'>
          <div className='aaa-list-item-circle mdl-color-text--accent-contrast mdl-color--accent'>{event['name_short']}</div>
          <div className='aaa-list-item-content'>
            <a onClick='ProfilePage.removeEvent(\"event["date"]+"\",\""+event["name_short"]+"\");' className='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>
              <i className='material-icons'>delete</i>
            </a>
            <p><strong>{event['name']}</strong></p>
            <p><strong>Text['profile_event_start']: </strong>{event['date']}</p>
            <p>{event['days']}<strong> Text['days'].</strong></p>
          </div>
        </div>
      );
    },this);
    return (
      <div id='aaa_home_events' className='mdl-cell--2-col mdl-cell mdl-shadow--2dp'>
        <h6>Text['home_events']</h6>
        {events}
      </div>
    );
  }
});
