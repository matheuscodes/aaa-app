'use strict'
var React = require('react');
var MUI = require('app/common/MaterialUI');
var Waiting = require('app/common/Waiting.jsx');
var SeasonGraph = require('svg/SeasonGraph.jsx');

var API = require('api');

module.exports = React.createClass({
  getInitialState: function() {
    return this.props.data;
  },
  componentDidMount: function() {
    API.seasons.getById(this.props.seasonId,this,function(season){
      this.setState(season);
    });
  },
  render: function() {
    return (
      <MUI.Paper zDepth={1}>
        <MUI.Card>
          <MUI.CardHeader
            title={this.state.name}
            subtitle="Text[from to]" />
          <MUI.CardText>
            {this.state.goals ? <SeasonGraph data={this.state} /> : <Waiting />}
          </MUI.CardText>

          <MUI.CardActions style={{textAlign:'right'}}>
            <MUI.FloatingActionButton mini={true} secondary={true} style={{margin: '5pt'}}>
              <MUI.icons.action.delete />
            </MUI.FloatingActionButton>
          </MUI.CardActions>
        </MUI.Card>
      </MUI.Paper>
    );
  }
});
