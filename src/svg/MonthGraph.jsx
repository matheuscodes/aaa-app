const React = require('react');

const GraphStyle = require('svg/common/GraphStyle');
const GraphBottomLabels = require('svg/common/GraphBottomLabels');
const GraphAxisLabels = require('svg/common/GraphAxisLabels');
const GraphEstimations = require('svg/common/GraphEstimations');
const GraphGrid = require('svg/common/GraphGrid');

const ActualBar = require('svg/season/ActualBar');
const SeasonLabels = require('svg/season/SeasonLabels');

const sideLabelsSize = 397;
const columnWidth = 100;

const MonthGraph = React.createClass({
  propTypes: {
    // TODO declare a class to validate
    data: React.PropTypes.object,
    graphId: React.PropTypes.number
  },
  render: function() {
    var days = [];
    var values = [];

    var seasonBars = this.props.data.overview.map(function(single, index) {
      var barUnit = 1000 / this.props.data.max;
      days.push(single.day);
      values.push(single.value);
      // TODO maybe move unit to the components themselves?
      return (
        <g>
          <ActualBar
            target={(single.shots - single.techniqueShots) * barUnit}
            training={single.techniqueShots * barUnit}
            column={index}
            max={this.props.data.max} />
        </g>
      );
    }, this);

    var generalHeight = 1000 + 150 + 50 + 10;
    var generalWidth = sideLabelsSize * 2.5 +
                       this.props.data.overview.length * columnWidth + 50;
    return (
      <svg id={this.props.graphId}
            version="1.1"
            viewBox={[
              '-10 ', (-generalHeight),
              ' ', (generalWidth),
              ' ', (generalHeight)
            ].join('')}
            preserveAspectRatio="xMidYMid meet"
            width={'100%'} >
        <GraphStyle />
        <g id="main">
          <SeasonLabels max="1000" />
          <g
            id="data"
            transform={'translate(' + sideLabelsSize * 2 + ',-150)'}>
            <GraphGrid
              height="1000" columns={this.props.data.overview.length} />
            <GraphBottomLabels content={days} />
            <GraphAxisLabels
              type="left" title="arrow_count" size="1000"
              min="0" max={this.props.data.max} />
            {seasonBars}
            <GraphEstimations
              data={values} estimate={true} size="1000"
              max={this.props.data.maxValue} min={this.props.data.minValue} />
            <GraphAxisLabels
              type="right" title="results" size="1000"
              min={this.props.data.minValue} max={this.props.data.maxValue}
              offset={this.props.data.overview.length * columnWidth}/>
          </g>
        </g>
      </svg>
    );
  }
});

module.exports = MonthGraph;
