const React = require('react');

const i18nextReact = require('global/i18nextReact');

const GraphStyle = require('svg/common/GraphStyle.jsx');
const GraphBottomLabels = require('svg/common/GraphBottomLabels.jsx');
const GraphAxisLabels = require('svg/common/GraphAxisLabels.jsx');
const GraphEstimations = require('svg/common/GraphEstimations.jsx');
const GraphGrid = require('svg/common/GraphGrid.jsx');

const ActualBar = require('svg/season/ActualBar.jsx');
const PlanBar = require('svg/season/PlanBar.jsx');
const SeasonLabels = require('svg/season/SeasonLabels.jsx');
const ShareBar = require('svg/season/ShareBar.jsx');

const SeasonGraph = React.createClass({
  propTypes: {
    // TODO declare a class to validate
    data: React.PropTypes.object,
    graphId: React.PropTypes.number,
    t: React.PropTypes.func
  },
  render: function() {
    const t = this.props.t;

    var totalWeeks = this.props.data.goals.length;
    var generalWidth = (totalWeeks * 100 + 700 + 150);
    var generalHeight = 1000 + 150 + 50;

    var weeks = [];
    var values = [];

    var seasonBars = this.props.data.goals.map(function(single, index) {
      var barUnit = 1000 / this.props.data.max;
      weeks.push(single.week);
      values.push(single.averageGrade);
      // TODO maybe move unit to the components themselves?
      return (
        <g>
          <PlanBar
            value={single.arrowCount * barUnit}
            column={index}
            max={this.props.data.max} />
          <ActualBar
            target={(single.arrowsShot - single.techniqueShot) * barUnit}
            training={single.techniqueShot * barUnit}
            column={index}
            max={this.props.data.max} />
          <ShareBar
            value={(single.arrowCount - single.targetShare) * barUnit}
            column={index}
            max={this.props.data.max} />
        </g>
      );
    }, this);

    return (
      <svg id={this.props.graphId}
            version="1.1"
            viewBox={[
              '0 ', (-generalHeight),
              ' ', (generalWidth + 2),
              ' ', (generalHeight + 2)
            ].join('')}
            preserveAspectRatio="xMidYMid meet"
            width={'100%'} >
        <GraphStyle />
        <g id="main">
          <SeasonLabels max="1000" />
          <g id="data" transform="translate(700,-150)">
            <GraphGrid height="1000" columns={totalWeeks} />
            <GraphBottomLabels
              content={weeks}
              prefix={t('common:calendar.week.short')} />
            <GraphAxisLabels
              type="left" min="0" max={this.props.data.max}
              title="arrow_count" size="1000" />
            {seasonBars}
            <GraphEstimations
              data={values} size="1000"
              max={this.props.data.max_value} min={this.props.data.min_value} />
            <GraphAxisLabels
              type="right" title="results" size="1000"
              min={this.props.data.min_value} max={this.props.data.max_value}
              offset={totalWeeks * 100}/>
          </g>
        </g>
      </svg>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['common'], SeasonGraph);
