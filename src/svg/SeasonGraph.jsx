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

module.exports = React.createClass({
  render: function() {
    var total_weeks = this.props.data.goals.length;
		var max = Math.ceil(this.props.data.max/50)*50+50;
		var unit = 1000/max;
		var general_width = (total_weeks*100+700+150);
		var general_height = 1000 + 150 + 50;
		var width = 20.2/(100/general_width);

    var weeks = [];
    var values = [];

    var season_bars = this.props.data.goals.map(function(single, index) {
      var bar_unit = 1000/this.props.data.max;
      weeks.push(single.week);
      values.push(single.averageGrade);
      //TODO maybe move unit to the components themselves?
      return (
        <g>
          <PlanBar value={single.arrowCount*bar_unit} column={index} max={this.props.data.max} />
          <ActualBar target={(single.arrowsShot-single.techniqueShot)*bar_unit} training={single.techniqueShot*bar_unit} column={index} max={this.props.data.max} />
          <ShareBar value={(single.arrowCount-single.targetShare)*bar_unit} column={index} max={this.props.data.max} />
        </g>
      );
    },this);

    return (
      <svg  id={this.props.graphId}
            version='1.1'
            viewBox={'0 '+(-general_height)+' '+(general_width+2)+' '+(general_height+2)}
            preserveAspectRatio='xMidYMid meet'
            height='415'
            width={width+'pt'} >
        <GraphStyle />
        <g id='main'>
          <SeasonLabels max='1000' />
          <g id='data' transform='translate(700,-150)'>
            <GraphGrid  height='1000' columns={total_weeks} />
            <GraphBottomLabels content={weeks} prefix={"Text['wk']"} />
            <GraphAxisLabels type='left' min='0' max={this.props.data.max} title='arrow_count' size='1000' />
            {season_bars}
            <GraphEstimations data={values} size='1000' max={this.props.data.max_value} min={this.props.data.min_value} />
            <GraphAxisLabels type='right' min={this.props.data.min_value} max={this.props.data.max_value} title='results' size='1000' offset={total_weeks*100}/>
          </g>
        </g>
      </svg>
    );
  }
});
