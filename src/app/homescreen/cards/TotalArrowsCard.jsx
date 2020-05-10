import React from 'react'
import moment from 'moment'

import i18nextReact from 'global/i18nextReact'
import MUI from 'app/common/MaterialUI'
import API from 'api'
import RoutePaths from 'global/RoutePaths'

const TotalArrowsCard = React.createClass({
  getInitialState: function() {
    return {days: [], max: 1};
  },
  componentDidMount: function() {
    var callbacks = {
      context: this,
      success: function(days) {
        this.setState(days);
      },
      error: function(error){
        if(API.isAuthError(error)){
          this.props.history.push(RoutePaths.login);
        }
      },
    };
    API.reports.getLastWeeksOverview(callbacks);
  },
  render: function() {
    const t = this.props.t;
    var dailyCounts = this.state.days.map(function(day, index) {
      return (
        <MUI.ListItem
          key={'aaa-dayCount_' + index}
          primaryText={
            <div>
              <b>{t('home:arrows.date', day)}</b>
              <div
                style={{
                  width: ((day.totalCount / this.state.max) * 100) + '%',
                  color: MUI.palette.alternateTextColor,
                  backgroundColor: MUI.palette.accent1Color,
                  textAlign: 'left',
                  fontWeight: 'bold',
                  border: '1pt solid #CCC',
                  fontSize: '8pt',
                  padding: '1pt'
                }} >
                 {day.totalCount}
              </div>
            </div>
          } />
      );
    }, this);

    return (
      <MUI.Card>
        <MUI.CardHeader
          title={t('home:arrows.title')}
          subtitle={t('home:arrows.subtitle')} />
        <MUI.CardText>
          <MUI.List>
            {dailyCounts}
          </MUI.List>
        </MUI.CardText>
      </MUI.Card>
    );
  }
});

export default i18nextReact.setupTranslation(['common', 'home'],
                                               TotalArrowsCard);
