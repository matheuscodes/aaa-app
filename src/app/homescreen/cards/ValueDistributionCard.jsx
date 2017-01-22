const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const ValueDistributionGraph = require('svg/ValueDistributionGraph');

const ValueDistributionCard = React.createClass({
  getInitialState: function() {
    return {distribution: [], maxes: {month: 0, quarter: 0, half: 0}, max: 0};
  },
  componentDidMount: function() {
    var callbacks = {
      context: this,
      success: function(distribution) {
        this.setState(distribution);
      }
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

module.exports = i18nextReact.setupTranslation(['common', 'home'],
                                               ValueDistributionCard);
