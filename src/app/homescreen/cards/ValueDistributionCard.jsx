import React from 'react'

import i18nextReact from 'global/i18nextReact'
import MUI from 'app/common/MaterialUI'
import API from 'api'

import ValueDistributionGraph from 'svg/ValueDistributionGraph'

const ValueDistributionCard = React.createClass({
  getInitialState: function() {
    return {distribution: [], maxes: {month: 0, quarter: 0, half: 0}, max: 0};
  },
  componentDidMount: function() {
    var callbacks = {
      context: this,
      success: function(distribution) {
        this.setState(distribution);
      },
      error: function(error){
        if(API.isAuthError(error)){
          this.props.switcher.switchTo('loginPage');
        }
      },
    };
    API.reports.getRingsOverview(callbacks);
  },
  render: function() {
    const t = this.props.t;
    return (
      <MUI.Card>
        <MUI.CardHeader
          title={t('home:rings.title')}
          subtitle={t('home:rings.subtitle')} />
        <MUI.CardText>
          <ValueDistributionGraph data={this.state} />
        </MUI.CardText>
      </MUI.Card>
    );
  }
});

export default i18nextReact.setupTranslation(['common', 'home'],
                                               ValueDistributionCard);
