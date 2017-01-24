const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const EndDistributionGraph = require('svg/EndDistributionGraph');

const EndDistributionCard = React.createClass({
  getInitialState: function() {
    return {values: {}, maxCounts: 0, maxValue: 0, minValue: 0, maxEnd: 0};
  },
  componentDidMount: function() {
    var callbacks = {
      context: this,
      success: function(report) {
        this.setState(report);
      }
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

module.exports = i18nextReact.setupTranslation(['home'], EndDistributionCard);
