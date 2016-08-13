var React = require('react');

var GraphStyle = require('svg/common/GraphStyle.jsx');
var GraphBar = require('svg/common/GraphBar.jsx');
var GraphBottomLabels = require('svg/common/GraphBottomLabels.jsx');
var GraphAxisLabels = require('svg/common/GraphAxisLabels.jsx');
var GraphEstimations = require('svg/common/GraphEstimations.jsx');
var GraphGrid = require('svg/common/GraphGrid.jsx');

module.exports = React.createClass({
  render: function() {
    var size = this.props.data.max_end;

		var general_width = (size*100+100+150);
		var general_height = 1000 + 150 + 50 + 100;
		var width = 20.2/(100/general_width);

    var counts = [];
    //TODO change underscore variable names
    var groupCount = 0;
    for(var single in this.props.data.counts) groupCount++;

    var position = 0;
    for(var group in this.props.data.counts){
      counts.push(this.props.data.counts[group].map(function(single, index) {
        //TODO investigate if keys need to be universally unique or just local, optimize for shortest.
        return (
          <GraphBar key={'aaa-endDistributionGraph_'+this.props.id+'_count_'+group+'_'+index} value={single*1000/this.props.data.max_count} column={index} position={position} size={groupCount} type={group} />
        );
      },this));
      position++;
    }

    var values = [];
    groupCount = 0;
    for(var single in this.props.data.values) groupCount++;

    for(var group in this.props.data.values){
      values.push(this.props.data.values[group].map(function(single, index) {
        return (
          <GraphEstimations key={'aaa-endDistributionGraph_'+this.props.id+'_value_'+group+'_'+index} data={this.props.data.values[group]} size='1000' contentName={group} />
        );
      },this));
    }

    var ends = [];
		for(var i = 0; i < size; i++){
			ends.push(i+1);
		}

    return (
      <svg  id='aaa_home_ends_graph'
            version='1.1'
            viewBox={'0 '+(-general_height)+' '+(general_width+2)+' '+(general_height+2)}
            preserveAspectRatio='xMidYMid meet'
            height={this.props.height ? this.props.height : '415'/*Used like this in homescreen*/}
            width='100%'>
        <GraphStyle />
        <g id='main'>
          <g id='labels_bars' transform='translate(0,-220)'>
            <rect className='week' x='0' y='75' height='20' width='100' />
            <text className='graph_label' x='125' y='98'>Text['count_week']</text>
            <rect className='month' x='0' y='175' height='20' width='100' />
            <text className='graph_label' x='125' y='198'>Text['count_month']</text>
          </g>
          <g id='labels_lines' transform='translate(500,-220)'>
            <path className='estimation-week' d='M 0,87.5 l 100,0'/>
            <circle className='result-week' cx='50' cy='87.5' r='10'/>
            <text className='graph_label' x='125' y='98'>Text['value_week']</text>
            <path className='estimation-month' d='M 0,187.5 l 100,0'/>
            <circle className='result-month' cx='50' cy='187.5' r='10'/>
            <text className='graph_label' x='125' y='198'>Text['value_month']</text>
          </g>
          <g id='data' transform='translate(150,-250)'>
            <GraphGrid height='1000' columns={size} />
            <GraphAxisLabels type='left' min='0' max={this.props.data.max_count} title='arrow_count' size='1000' />
            {counts}
            {values}
            <GraphAxisLabels type='right' min={this.props.data.min_value} max={this.props.data.max_value} title='results' size='1000' offset={size*100}/>
            <GraphBottomLabels content={ends} />
          </g>
        </g>
      </svg>
    );
  }
});
