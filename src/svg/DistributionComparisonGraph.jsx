const React = require('react');

const i18nextReact = require('global/i18nextReact');

const GraphStyle = require('svg/common/GraphStyle.jsx');
const GraphBar = require('svg/common/GraphBar.jsx');
const GraphBottomLabels = require('svg/common/GraphBottomLabels.jsx');
const GraphAxisLabels = require('svg/common/GraphAxisLabels.jsx');
const GraphGrid = require('svg/common/GraphGrid.jsx');

const ValueDistributionGraph = React.createClass({
  propTypes: {
    // TODO declare a class to validate
    data: React.PropTypes.object,
    max: React.PropTypes.number,
    t: React.PropTypes.func
  },
  render: function() {
    const t = this.props.t;
    const unit = 1000 / (Math.ceil((this.props.data.maxPercentage * 110) / 10) * 0.1);

    const generalWidth = (11 * 100 + 100 + 150);
    const generalHeight = 1000 + 150 + 50 + 100;

    let values = ['M','1','2','3','4','5','6','7','8','9','10','X'];
    let currentBars = [];
    let previousBars = [];
    values.forEach((key, index) => {
      currentBars.push(
        <GraphBar
          value={(this.props.data.distributionNow[key] / this.props.data.totalNow) * unit} column={index}
          position="0" size="2" type="currentDistribution" />
      );
      previousBars.push(
        <GraphBar
          value={(this.props.data.distributionBefore[key] / this.props.data.totalBefore) * unit} column={index}
          position="1" size="2" type="previousDistribution" />
      );
    });

    return (
      <svg id="aaa_distribution_comparison_graph"
            version="1.1"
            viewBox={[
              '0 ', (-generalHeight),
              ' ', (generalWidth + 2),
              ' ', (generalHeight + 2)
            ].join('')}
            preserveAspectRatio="xMidYMid meet"
            width="100%">
        <GraphStyle />
        <g id="main">
          <g id="labels" transform="translate(100,-220)">
            <rect className="previousDistribution" x="0" y="41.6" height="20" width="100" />
            <text className="graph_label" x="125" y="64.6">
              {t('assessment:graph.rings.distributionBefore')}
            </text>
            <rect className="currentDistribution" x="0" y="108.2" height="20" width="100" />
            <text className="graph_label" x="125" y="131.2">
              {t('assessment:graph.rings.distributionNow')}
            </text>
          </g>

          <g id="data" transform="translate(150,-250)">
            <GraphGrid height="1000" columns="12" />
            <GraphAxisLabels
              type="left" min="0" max={this.props.data.maxPercentage * 100}
              title="ringDistribution" size="1000" suffix="%" />
            {currentBars}
            {previousBars}
            <GraphBottomLabels content={values} />
          </g>
        </g>
      </svg>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['common', 'home'],
                                               ValueDistributionGraph);
