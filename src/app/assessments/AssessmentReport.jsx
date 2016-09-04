'use strict'

var React = require('react');
var MUI = require('app/common/MaterialUI');
var API = require('api');

var valueConverter = require('useful/valueConverter');
var MiniCalendar = require('svg/common/MiniCalendar.jsx');
var EndDistributionGraph = require('svg/EndDistributionGraph.jsx');
var Waiting = require('app/common/Waiting.jsx');

var AssessmentArrowTable = require('app/assessments/AssessmentArrowTable.jsx');

module.exports = React.createClass({
  onDelete: function() {
    this.props.onDelete(this.props.assessmentId);
  },
  onEdit: function() {
    this.props.onEdit(this.props.assessmentId);
  },
  render: function() {
    var rounds = this.props.data.rounds ? this.props.data.rounds.map(function(round,roundIndex){
      round.index = roundIndex;
      var summary = {
        values: {
          averageScore: round.averageScores
        },
        counts:{
          xs: round.xCount,
          tens: round.tenCount
        },
        minAverage: round.minAverage,
        maxAverage: round.maxAverage,
        maxCount: round.maxCount,
        endCount: round.endCount
      }
      return (
        <MUI.GridTile
          key={'aaa-assessmentRound_'+ this.props.data.id +'_'+roundIndex}
          style={{padding:'5pt'}} cols={8} >
          <MUI.GridList cellHeight={'auto'} cols={2} padding={10} >
            <MUI.GridTile style={{padding:'5pt'}} cols={1} >
              <AssessmentArrowTable data={round} />
            </MUI.GridTile>
            <MUI.GridTile style={{padding:'5pt'}} cols={1} >
              <EndDistributionGraph
                id={'aaa-assessmentGraph_'+ this.props.data.id +'_'+roundIndex}
                height={'230pt'}
                data={summary} />
            </MUI.GridTile>
          </MUI.GridList>
        </MUI.GridTile>
      );
    },this) : null;

    return (
      <MUI.GridList cellHeight={'auto'} cols={8} padding={10} >
        <MUI.GridTile style={{padding:'5pt'}} cols={7} >
          <p style={{margin:0}}>
            Text['total points'] {this.props.data.totalScore} / {this.props.data.maxScore} <br/>
            Text['total tens'] {this.props.data.totalTens} Text['total xs'] {this.props.data.totalXs} <br/>
            Text['average points'] {this.props.data.averageScore.toFixed(2)}
            {this.props.data.verifierArcher ? <br/>+"Text['verified by archer']:"+this.props.data.verifierArcher.name : null}
            {this.props.data.verifierAdmin ? <br/>+"Text['verified by admin']:"+this.props.data.verifierAdmin.name : null}
          </p>
        </MUI.GridTile>
        <MUI.GridTile style={{padding:'5pt'}} cols={1} >
          <MUI.FloatingActionButton mini={true} secondary={true} style={{margin: '5pt'}}>
            <MUI.icons.action.delete />
          </MUI.FloatingActionButton>
        </MUI.GridTile>
        {rounds}
      </MUI.GridList>
    );
  }
});
