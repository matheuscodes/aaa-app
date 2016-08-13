'use strict'
var React = require('react');
var MUI = require('app/common/MaterialUI');

var dateToId = require('useful/DateToId');
var valueConverter = require('useful/valueConverter');
var MiniCalendar = require('svg/common/MiniCalendar.jsx');
var EndDistributionGraph = require('svg/EndDistributionGraph.jsx');

module.exports = React.createClass({
  render: function() {
    var rounds = this.props.data.rounds.map(function(round,round_index){
      var grandTotal = 0;
      var rows = round.sets.map(function(set,set_index){
        var total = 0;
        var arrows = set.map(function(arrow,arrow_index){
          total += valueConverter.integer[arrow];
          return  (
            <MUI.Avatar
              key={'aaa-assessmentArrow_'+ dateToId(this.props.data.date) +'_'+round_index+'_'+set_index+'_'+arrow_index}
              color={valueConverter.color[arrow]}
              backgroundColor={valueConverter.backgroundColor[arrow]}
              size={30} >{arrow}</MUI.Avatar>
          );
        },this);
        return(
          <tr key={'aaa-assessmentRow_'+ dateToId(this.props.data.date) +'_'+round_index+'_'+set_index}>
            <td >
              {arrows}
            </td>
            <td >
              {total}
            </td>
          </tr>
        );
      },this);
      return (
        <MUI.GridTile
          key={'aaa-assessmentRound_'+ dateToId(this.props.data.date) +'_'+round_index}
          style={{padding:'5pt'}} cols={8} >
          <MUI.GridList cellHeight={'auto'} cols={2} padding={10} >
            <MUI.GridTile style={{padding:'5pt'}} cols={1} >
              <table style={{width:'100%'}}>
                <thead>
                  <tr>
                    <th>Text['points']</th>
                    <th>Text['sum']</th>
                  </tr>
                </thead>
                <tbody>
                  {rows}
                  <tr>
                    <th style={{textAlign:'right'}}>Text['total points']</th>
                    <th>{round.summary.totalScore}</th>
                  </tr>
                  <tr>
                    <th style={{textAlign:'right'}}>Text['tens']</th>
                    <th>{round.summary.tens}</th>
                  </tr>
                  <tr>
                    <th style={{textAlign:'right'}}>Text['xs']</th>
                    <th>{round.summary.xs}</th>
                  </tr>
                </tbody>
              </table>
            </MUI.GridTile>
            <MUI.GridTile style={{padding:'5pt'}} cols={1} >
              <EndDistributionGraph
                id={'aaa-assessmentGraph_'+ dateToId(this.props.data.date) +'_'+round_index}
                height={'230pt'}
                data={round.summary} />
            </MUI.GridTile>
          </MUI.GridList>
        </MUI.GridTile>
      );
    },this);

    return (
      <MUI.Paper style={{display:'inline-block', width:'100%'}} zDepth={1}>
        <MUI.GridList cellHeight={'auto'} cols={8} padding={10} >
          <MUI.GridTile style={{padding:'5pt'}}
            cols={1} >
            <MiniCalendar
              width='100%'
              height='100%'
              day={this.props.data.date.getDate()}
              month={this.props.data.date.getMonth()} />
          </MUI.GridTile>
          <MUI.GridTile style={{padding:'5pt'}} cols={6} >
            <p>
              Text['total points'] {this.props.data.total_score} / {this.props.data.max_score} <br/>
              Text['total tens'] {this.props.data.total_tens} Text['total xs'] {this.props.data.total_xs} <br/>
              Text['average points'] {this.props.data.average_score.toPrecision(3)}
              {this.props.data.verifier_archer ? <br/>+"Text['verified by archer']:"+this.props.data.verifier_archer.name : null}
              {this.props.data.verifier_admin ? <br/>+"Text['verified by admin']:"+this.props.data.verifier_admin.name : null}
            </p>
          </MUI.GridTile>
          <MUI.GridTile style={{padding:'5pt'}} cols={1} >
            <MUI.FloatingActionButton mini={true} secondary={true} style={{margin: '5pt'}}>
              <MUI.icons.action.delete />
            </MUI.FloatingActionButton>
          </MUI.GridTile>
          {rounds}
        </MUI.GridList>
      </MUI.Paper>
    );
  }
});
