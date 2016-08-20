'use strict'
var React = require('react');

var GraphStyle = require('svg/common/GraphStyle.jsx');
var GraphBottomLabels = require('svg/common/GraphBottomLabels.jsx');
var GraphAxisLabels = require('svg/common/GraphAxisLabels.jsx');
var GraphEstimations = require('svg/common/GraphEstimations.jsx');
var GraphGrid = require('svg/common/GraphGrid.jsx');

var ActualBar = require('svg/season/ActualBar.jsx');
var PlanBar = require('svg/season/PlanBar.jsx');
var SeasonLabels = require('svg/season/SeasonLabels.jsx');
var ShareBar = require('svg/season/ShareBar.jsx');

const sideLabelsSize = 384.615385;
const columnWidth = 100;

module.exports = React.createClass({
  render: function() {
    var days = [];
    var values = [];

    var season_bars = this.props.data.overview.map(function(single, index) {
      var bar_unit = 1000/this.props.data.max;
      days.push(single.day);
      values.push(single.value);
      //TODO maybe move unit to the components themselves?
      return (
        <g>
          <ActualBar target={(single.shots-single.techniqueShots)*bar_unit} training={single.techniqueShots*bar_unit} column={index} max={this.props.data.max} />
        </g>
      );
    },this);

    var generalHeight = 1000 + 150 + 50 + 10;
    var generalWidth = sideLabelsSize*2.5 + this.props.data.overview.length * columnWidth + 20;
    return (
      <svg  id={this.props.graphId}
            version='1.1'
            viewBox={'-10 '+(-generalHeight)+' '+(generalWidth)+' '+(generalHeight)}
            preserveAspectRatio='xMidYMid meet'
            width={'100%'} >
        <GraphStyle />
        <g id='main'>
          <SeasonLabels max='1000' />
          <g id='data' transform={'translate('+sideLabelsSize*2.5+',-150)'}>
            <GraphGrid  height='1000' columns={this.props.data.overview.length} />
            <GraphBottomLabels content={days} />
            <GraphAxisLabels type='left' min='0' max={this.props.data.max} title='arrow_count' size='1000' />
            {season_bars}
            <GraphEstimations data={values} estimate={true} size='1000' max={this.props.data.max_value} min={this.props.data.min_value} />
            <GraphAxisLabels type='right' min={this.props.data.min_value} max={this.props.data.max_value} title='results' size='1000' offset={this.props.data.overview.length*columnWidth}/>
          </g>
        </g>
      </svg>
    );
  }
});
