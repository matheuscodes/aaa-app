import React from 'react'

import i18nextReact from 'global/i18nextReact'
import MUI from 'app/common/MaterialUI'
import API from 'api'
import RoutePaths from 'global/RoutePaths'

import EndDistributionGraph from 'svg/EndDistributionGraph'

const EndDistributionCard = React.createClass({
  getInitialState: function() {
    return {values: {}, maxCounts: 0, maxValue: 0, minValue: 0, maxEnd: 0};
  },
  componentDidMount: function() {
    var callbacks = {
      context: this,
      success: function(report) {
        this.setState(report);
      },
      error: function(error){
        if(API.isAuthError(error)){
          this.props.history.push(RoutePaths.login);
        }
      },
    };
    API.reports.getAssessmentsOverview(callbacks);
  },
  render: function() {
    const t = this.props.t;
    return (
      <MUI.Card>
        <MUI.CardHeader
          title={t('home:assessments.title')}
          subtitle={t('home:assessments.subtitle')} />
        <MUI.CardText>
          <EndDistributionGraph
            id={'aaa-assessmenOverviewtGraph'}
            data={this.state} />
        </MUI.CardText>
      </MUI.Card>
    );
  }
});

export default i18nextReact.setupTranslation(['home'], EndDistributionCard);
