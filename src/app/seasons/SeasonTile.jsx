'use strict'
var React = require('react');
var MUI = require('app/common/MaterialUI');
var Waiting = require('app/common/Waiting.jsx');
var SeasonGraph = require('svg/SeasonGraph.jsx');

var API = require('api');

module.exports = React.createClass({
  getInitialState: function() {
    return this.props.data; //TODO maybe remove this?
  },
  componentDidMount: function() {
    API.seasons.getById(this.props.seasonId,this,function(season){
      this.setState(season);
    });
  },
  onDelete: function() {
    this.props.onDelete(this.props.seasonId);
  },
  onEdit: function() {
    this.props.onEdit(this.props.seasonId);
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
            {this.props.readOnly ?
              <MUI.FloatingActionButton mini={true} onTouchTap={this.onEdit} style={{margin: '5pt'}}>
                <MUI.icons.editor.mode_edit />
              </MUI.FloatingActionButton>
            : null}
            <MUI.FloatingActionButton mini={true} onTouchTap={this.onDelete} secondary={true} style={{margin: '5pt'}}>
              <MUI.icons.action.delete />
            </MUI.FloatingActionButton>
          </MUI.CardActions>
        </MUI.Card>
      </MUI.Paper>
    );
  }
});
