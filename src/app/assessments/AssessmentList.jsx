'use strict'
var React = require('react');

var MUI = require('app/common/MaterialUI');

var dateToId = require('useful/DateToId');
var MiniCalendar = require('svg/common/MiniCalendar.jsx');
var AssessmentTile = require('app/assessments/AssessmentTile.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {trainings:[]};
  },
  componentWillMount: function() {
    this.setState({
      assessments: [
        {
          date: new Date('2016-05-01'),
          total_score: 440,
          total_tens: 3,
          total_xs: 1,
          max_score: 720,
          average_score:0.21,
          rounds: [
            {
              sets:[[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]],
              tens:1,
              xs:0,
              summary:{
                values: {
                  month:[1.2,3.6,2.2,5.5,7.023,6.34],
                  week:[3.3,2.2,1.777,7.4222421,2]
                },
                counts:{
                  month: [6,6,6,6,6,6],
                  week: [5,3,1,4,5,6]
                },
                max_value: 7.422421,
                min_value: 1.2,
                max_count: 6,
                max_end: 6
              }
            },
            {
              sets:[[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]],
              tens:2,
              xs:1,
              summary:{
                values: {
                  month:[1.2,3.6,2.2,5.5,7.023,6.34],
                  week:[3.3,2.2,1.777,7.4222421,2]
                },
                counts:{
                  month: [6,6,6,6,6,6],
                  week: [5,3,1,4,5,6]
                },
                max_value: 7.422421,
                min_value: 1.2,
                max_count: 6,
                max_end: 6
              }
            }
          ]
        },
        {
          date: new Date('2016-04-01'),
          total_score: 440,
          total_tens: 3,
          total_xs: 1,
          max_score: 720,
          average_score:0.21,
          rounds: [
            {
              sets:[[1,2,3,4,5,6],["M",7,8,9,10,"X"],[1,2,3,4,5,6],[1,2,3,4,5,6],["M",7,8,9,10,"X"],[1,2,3,4,5,6]],
              summary:{
                values: {
                  month:[1.2,3.6,2.2,5.5,7.023,6.34],
                  week:[3.3,2.2,1.777,7.4222421,2]
                },
                counts:{
                  month: [6,6,6,6,6,6],
                  week: [5,3,1,4,5,6]
                },
                max_value: 7.422421,
                min_value: 1.2,
                max_count: 6,
                max_end: 6,
                tens:1,
                xs:0,
                totalScore: 22
              }
            },
            {
              sets:[["M",7,8,9,10,"X"],["M",7,8,9,10,"X"],[1,2,3,4,5,6],["M",7,8,9,10,"X"],[1,2,3,4,5,6],[1,2,3,4,5,6]],
              tens:2,
              xs:1,
              summary:{
                values: {
                  average_score:[1.2,3.6,2.2,5.5,7.023,6.34]
                },
                counts:{
                  tens: [4,3,1,4,2,1],
                  xs: [1,2,1,3,1,0]
                },
                max_value: 7.422421,
                min_value: 1.2,
                max_count: 4,
                max_end: 6
              }
            }
          ]
        }
      ]
    });
  },
  render: function() {
    var assessments = this.state.assessments.map(function(assessment, index) {
      return (
        <MUI.GridTile key={'aaa-assessment_'+dateToId(assessment.date)} style={{padding:'5pt'}} cols={1} >
          <AssessmentTile data={assessment} />
        </MUI.GridTile>
      );
    },this);
    return (
      <MUI.GridList cellHeight={'auto'} cols={1} padding={10} >
        {assessments}
      </MUI.GridList>
    );
  }
});
