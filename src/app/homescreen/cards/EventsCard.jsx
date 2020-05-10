import React from 'react'

import MUI from 'app/common/MaterialUI'
import API from 'api'
import i18nextReact from 'global/i18nextReact'

import Waiting from 'app/common/Waiting'
import Notice from 'app/common/Notice'
import RoutePaths from 'global/RoutePaths'

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
          this.props.history.push(RoutePaths.login);
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

export default i18nextReact.setupTranslation(['home'], EventsCard);
