const React = require('react');
const moment = require('moment');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const TotalArrowsCard = React.createClass({
  getInitialState: function() {
    return {days: [], max: 1};
  },
  componentDidMount: function() {
    var callbacks = {
      context: this,
      success: function(days) {
        this.setState(days);
      }
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

module.exports = i18nextReact.setupTranslation(['common', 'home'],
                                               TotalArrowsCard);
