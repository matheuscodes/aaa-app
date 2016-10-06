var React = require('react');

var GraphStyle = require('svg/common/GraphStyle.jsx');
var GraphBar = require('svg/common/GraphBar.jsx');
var GraphBottomLabels = require('svg/common/GraphBottomLabels.jsx');
var GraphAxisLabels = require('svg/common/GraphAxisLabels.jsx');
var GraphEstimations = require('svg/common/GraphEstimations.jsx');
var GraphGrid = require('svg/common/GraphGrid.jsx');

module.exports = React.createClass({
  render: function() {
    var size = this.props.data.endCount;

    var general_width = (size * 100 + 100 + 150);
    var general_height = 1000 + 150 + 50 + 100;
    var width = 20.2 / (100 / general_width);

    var counts = [];
    var countsLabels = [];
    // TODO change underscore variable names
    var groupCount = 0;
    for (var single in this.props.data.counts) groupCount++;

    var position = 0;
    for (var group in this.props.data.counts) {
      counts.push(this.props.data.counts[group].map(function(single, index) {
        // TODO investigate if keys need to be universally unique or just local, optimize for shortest.
        return (
          <GraphBar key={'aaa-endDistributionGraph_' + this.props.id + '_count_' + group + '_' + index} value={single * 1000 / this.props.data.maxCount} column={index} position={position} size={groupCount} type={group} />
        );
      }, this));
      countsLabels.push(
        <g>
          <rect className={group} x="0" y={75 + 100 * position} height="20" width="100" />
          <text className="graph_label" x="125" y={98 + 100 * position}>Text[{group}]</text>
        </g>
      );
      position++;
    }

    var values = [];
    var valuesLabels = [];
    position = 0;
    for (var group in this.props.data.values) {
      values.push(this.props.data.values[group].map(function(single, index) {
        return (
          <GraphEstimations key={'aaa-endDistributionGraph_' + this.props.id + '_value_' + group + '_' + index} data={this.props.data.values[group]} size="1000" contentName={group} />
        );
      }, this));
      valuesLabels.push(
        <g>
          <path className={'estimation-' + group} d={'M 0,' + (87.5 + 100 * position) + ' l 100,0'}/>
          <circle className={'result-' + group} cx="50" cy={87.5 + 100 * position} r="10"/>
          <text className="graph_label" x="125" y={98 + 100 * position}>Text[{group}]</text>
        </g>
      );
    }

    var ends = [];
    for (var i = 0; i < size; i++) {
      ends.push(i + 1);
    }

    return (
      <svg id="aaa_home_ends_graph"
            version="1.1"
            viewBox={'0 ' + (-general_height) + ' ' + (general_width + 2) + ' ' + (general_height + 2)}
            preserveAspectRatio="xMidYMid meet"
            height={this.props.height ? this.props.height : '415'/* Used like this in homescreen*/}
            width="100%">
        <GraphStyle />
        <g id="main">
          <g id="labels_bars" transform="translate(0,-220)">
            {countsLabels}
          </g>
          <g id="labels_lines" transform="translate(500,-220)">
            {valuesLabels}
          </g>
          <g id="data" transform="translate(150,-250)">
            <GraphGrid height="1000" columns={size} />
            <GraphAxisLabels type="left" min="0" max={this.props.data.maxCount} title="arrow_count" size="1000" />
            {counts}
            {values}
            <GraphAxisLabels type="right" min={this.props.data.minAverage} max={this.props.data.maxAverage} title="results" size="1000" offset={size * 100}/>
            <GraphBottomLabels content={ends} />
          </g>
        </g>
      </svg>
    );
  }
});
