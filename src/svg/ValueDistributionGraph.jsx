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
    const unit = 1000 / (Math.ceil((this.props.data.max * 110) / 10) * 0.1);

    var generalWidth = (11 * 100 + 100 + 150);
    var generalHeight = 1000 + 150 + 50 + 100;

    var values = [];

    var bars = this.props.data.distribution.map(function(single, index) {
      values.push(index);
      return (
        <g>
          <GraphBar
            value={single.week * unit} column={index}
            position="0" size="3" type="week" />
          <GraphBar
            value={single.month * unit} column={index}
            position="1" size="3" type="month" />
          <GraphBar
            value={single.year * unit} column={index}
            position="2" size="3" type="year" />
        </g>
      );
    });

    return (
      <svg id="aaa_home_values_graph"
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
            <rect className="week" x="0" y="41.6" height="20" width="100" />
            <text className="graph_label" x="125" y="64.6">
              {t('common:graphLabels.data.distributionWeek')}
            </text>
            <rect className="month" x="0" y="108.2" height="20" width="100" />
            <text className="graph_label" x="125" y="131.2">
              {t('common:graphLabels.data.distributionMonth')}
            </text>
            <rect className="year" x="0" y="174.8" height="20" width="100" />
            <text className="graph_label" x="125" y="197.8">
              {t('common:graphLabels.data.distributionYear')}
            </text>
          </g>

          <g id="data" transform="translate(150,-250)">
            <GraphGrid height="1000" columns="11" />
            <GraphAxisLabels
              type="left" min="0" max={this.props.data.max}
              title="distribution" size="1000" suffix="%" />
              {bars}
            <GraphBottomLabels content={values} />
          </g>
        </g>
      </svg>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['common'],
                                               ValueDistributionGraph);
