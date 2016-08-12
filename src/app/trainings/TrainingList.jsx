'use strict'
var React = require('react');

var MUI = require('app/common/MaterialUI');

var dateToId = require('useful/DateToId');
var MiniCalendar = require('svg/common/MiniCalendar.jsx');
var TrainingTypes = require('constants/TrainingTypes.json');
var TrainingTile = require('app/trainings/TrainingTile.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {trainings:[]};
  },
  componentWillMount: function() {
    this.setState({
      trainings: [
        {
          date: new Date('2016-05-01'),
          time: 54,
          total_arrows: 223,
          arrows: {
            '5': {WARMUP: 34, WARMOUT: 5},
            '15': {WARMUP: 4, BOARD: 5},
            '25': {WARMOUT: 34, TARGET: 15},
          }
        },
        {
          date: new Date('2016-02-01'),
          time: 54,
          total_arrows: 223,
          arrows: {
            '5': {WARMUP: 34, WARMOUT: 5},
            '23': {WARMUP: 4, BOARD: 5},
            '6': {WARMOUT: 34, TARGET: 15},
          }
        }
      ]
    });
  },
  render: function() {
    var trainings = this.state.trainings.map(function(training, index) {
      return (
        <MUI.GridTile key={'aaa-training_'+dateToId(training.date)} style={{padding:'5pt'}} cols={1} >
          <TrainingTile training={training} />
        </MUI.GridTile>
      );
    });
    return (
      <MUI.GridList cellHeight={'auto'} cols={1} rows={trainings.length} padding={10} >
        {trainings}
      </MUI.GridList>
    );
  }
});
