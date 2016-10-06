var React = require('react');

var GraphStyle = require('svg/common/GraphStyle.jsx');
var GraphBar = require('svg/common/GraphBar.jsx');
var GraphBottomLabels = require('svg/common/GraphBottomLabels.jsx');
var GraphAxisLabels = require('svg/common/GraphAxisLabels.jsx');
var GraphGrid = require('svg/common/GraphGrid.jsx');

module.exports = React.createClass({
  render: function() {
    var unit = 1000 / (Math.ceil((this.props.data.max * 110) / 10) * 0.1);

    var general_width = (11 * 100 + 100 + 150);
    var general_height = 1000 + 150 + 50 + 100;
    var width = 20.2 / (100 / general_width);

    var values = [];

    var bars = this.props.data.distribution.map(function(single, index) {
      values.push(index);
      return (
        <g>
          <GraphBar value={single.week * unit} column={index} position="0" size="3" type="week" />
          <GraphBar value={single.month * unit} column={index} position="1" size="3" type="month" />
          <GraphBar value={single.year * unit} column={index} position="2" size="3" type="year" />
        </g>
      );
    });

    return (
      <svg id="aaa_home_values_graph"
            version="1.1"
            viewBox={'0 ' + (-general_height) + ' ' + (general_width + 2) + ' ' + (general_height + 2)}
            preserveAspectRatio="xMidYMid meet"
            width="100%">
        <GraphStyle />
        <g id="main">
          <g id="labels" transform="translate(100,-220)">
            <rect className="week" x="0" y="41.6" height="20" width="100" />
            <text className="graph_label" x="125" y="64.6">Text['distribution_week']</text>
            <rect className="month" x="0" y="108.2" height="20" width="100" />
            <text className="graph_label" x="125" y="131.2">Text['distribution_month']</text>
            <rect className="year" x="0" y="174.8" height="20" width="100" />
            <text className="graph_label" x="125" y="197.8">Text['distribution_year']</text>
          </g>

          <g id="data" transform="translate(150,-250)">
            <GraphGrid height="1000" columns="11" />
            <GraphAxisLabels type="left" min="0" max={this.props.data.max} title="distribution" size="1000" suffix="%" />
              {bars}
            <GraphBottomLabels content={values} />
          </g>
        </g>
      </svg>
    );
  }
});
