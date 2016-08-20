'use strict'
var React = require('react');
var MUI = require('app/common/MaterialUI');

var SeasonGraph = require('svg/SeasonGraph.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {values:[],max_value:0,min_value:0,max_end:0};
  },
  componentWillMount: function() {
    this.setState({
      overview:[{
          total_plan: 300,
          gauge_plan: 150,
          shots: 178,
          technique_shots: 34,
          week: 51,
          value: 3.454
        },
        {
          total_plan: 315,
          gauge_plan: 120,
          shots: 44,
          technique_shots: 30,
          week: 52,
          value: 5.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.5
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 2.1
        }
      ],
      max: 350,
      min_value: 2,
      max_value: 7
    });
  },
  render: function() {
    return (
      <MUI.Card>
        <MUI.CardHeader
          title="Text['home_seasons']"
          subtitle="Text['home_seasons subtitle']" />
        <MUI.CardText>
          <SeasonGraph data={this.state} graphId={'aaa_home_seasons_graph'} />
        </MUI.CardText>
      </MUI.Card>
    );
  }
});
