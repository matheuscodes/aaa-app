const React = require('react');

const MUI = require('app/common/MaterialUI');
const API = require('api');
const i18nextReact = require('global/i18nextReact');

const Waiting = require('app/common/Waiting');
const Notice = require('app/common/Notice');

const EventsCard = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    const t = this.props.t;

    var callbacks = {
      context: this,
      success: function(list) {
        var current = this.state;
        current.events = list;
        this.setState(current);
      },
      error: function(error){
        if(API.isAuthError(error)){
          this.props.switcher.switchTo('loginPage');
        }
      },
    };
    var now = new Date();
    var next3months = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 90);
    API.events.getList(callbacks, now, next3months);
  },
  render: function() {
    const t = this.props.t;

    var events = '';
    if (typeof this.state.events !== 'undefined') {
      events = this.state.events.map(function(event, index) {
        return (
          <MUI.ListItem
            key={'aaa-event_' + index}
            primaryText={
              <p style={{fontSize: '80%', margin: 0}}>
                <strong>{event.name}</strong><br/>
                {t('home:events.start', event)}<br/>
                {t('home:events.days', {count: event.days})}
              </p>
            }
            leftAvatar={
              <MUI.Avatar backgroundColor={event.color}>
                {event.nameShort}
              </MUI.Avatar>}
          />
        );
      }, this);
    }
    return (
      <MUI.Card>
        <MUI.CardHeader
          title={t('home:events.title')}
          subtitle={t('home:events.subtitle')} />
        <MUI.CardText>
            {events ? <MUI.List>{events}</MUI.List> : <Waiting />}
        </MUI.CardText>
      </MUI.Card>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['home'], EventsCard);
