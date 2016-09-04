'use strict'

var React = require('react');
var MUI = require('app/common/MaterialUI');
var API = require('api');

var AssessmentReport = require('app/assessments/AssessmentReport.jsx');

var Waiting = require('app/common/Waiting.jsx');
var MiniCalendar = require('svg/common/MiniCalendar.jsx');

module.exports = React.createClass({
  getInitialState: function(){
    return {}
  },
  componentDidMount: function() {
    var callbacks ={
      context: this,
      success: function(assessment){
        this.setState(assessment);
      }
    }
    API.assessments.reportById(this.props.data.id,callbacks);
  },
  render: function() {
    return (
      <MUI.Paper zDepth={1}>
        <MUI.Card>
          <MUI.CardHeader
            title={this.props.data.targetName + ' Text[at] ' + this.props.data.distance}
            subtitle="Text[from to]"
            avatar={
              <MiniCalendar
                width='32pt'
                height='32pt'
                day={this.props.data.date.getDate()}
                month={this.props.data.date.getMonth()} />
            }/>
          <MUI.CardText>
            {this.state.date ? <AssessmentReport data={this.state} /> : <Waiting />}
          </MUI.CardText>
        </MUI.Card>
      </MUI.Paper>
    );
  }
});
