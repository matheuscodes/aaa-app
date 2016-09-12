'use strict'

var React = require('react');
var MUI = require('app/common/MaterialUI');
var API = require('api');

var AssessmentReport = require('app/assessments/AssessmentReport.jsx');

var Waiting = require('app/common/Waiting.jsx');
var Notice = require('app/common/Notice.jsx');
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
            {this.state.date ? <AssessmentReport assessmentId={this.props.data.id} data={this.state} onDelete={this.props.onDelete}/> : <Waiting />}
          </MUI.CardText>
        </MUI.Card>
        {this.state.message ? <Notice message={this.state.message} onClose={this.hideMessage}/> : null}
      </MUI.Paper>
    );
  }
});
