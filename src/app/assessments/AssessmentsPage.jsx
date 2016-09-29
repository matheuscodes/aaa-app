'use strict'

var React = require('react');
var MUI = require('app/common/MaterialUI');
var API = require('api');


var Waiting = require('app/common/Waiting.jsx');
var Notice = require('app/common/Notice.jsx');

var BaseLayout = require('app/common/BaseLayout.jsx');
var AssessmentTile = require('app/assessments/AssessmentTile.jsx');
var NewAssessmentCard = require('app/assessments/NewAssessmentCard.jsx');

var styles = {
  gridList: {
    width: '100%'
  }
}

module.exports = React.createClass({
  getInitialState: function(){
    return {editAssessment:false};
  },
  updateAssessmentList: function(){
    var callbacks = {
      context: this,
      success: function(list){
        var current = this.state;
        current.editAssessment = false;
        current.assessmentId ? delete current.assessmentId : null;
        current.assessments = list;
        this.setState(current);
      },
      error: function(){
        this.showMessage("Text[assessment list error]","ERROR");
      }
    }
    API.assessments.getList(callbacks);
  },
  componentDidMount: function() {
    this.updateAssessmentList();
  },
  closeEdit: function(refresh){
    if(refresh){
      this.updateAssessmentList();
    }
    else{
      var current = this.state;
      current.editAssessment = false;
      current.assessmentId ? delete current.assessmentId : null;
      this.setState(current);
    }
  },
  editAssessment: function(assessmentId){
    var current = this.state;
    current.editAssessment = true;
    current.assessmentId = assessmentId;
    this.setState(current);
  },
  newAssessment: function(){
    var current = this.state;
    current.editAssessment = true;
    this.setState(current);
  },
  showMessage: function(message,type){
    var current = this.state;
    current.message = {
      text: message,
      open: true,
      type: type
    }
    this.setState(current);
  },
  hideMessage: function(){
    var current = this.state;
    current.message.open = false;
    this.setState(current);
  },
  deleteAssessment: function(assessmentId){
    var callbacks = {
      context: this,
      success: function(){
        this.showMessage("Text[season deleted]","MESSAGE");
        this.updateAssessmentList();
      },
      warning: function(){
        this.showMessage("Text[season deleted]","WARNING");
      },
      error: function(){
        this.showMessage("Text[season not deleted]","ERROR");
      }
    }
    API.assessments.delete(assessmentId,callbacks);
  },
  render: function() {
    var assessments = this.state.assessments ? this.state.assessments.map(function(assessment, index) {
      return (
        <MUI.GridTile key={'aaa-assessment_'+assessment.id} style={{padding:'5pt'}} cols={2} >
          <AssessmentTile data={assessment} onDelete={this.deleteAssessment}/>
        </MUI.GridTile>
      );
    },this) : null;

    var assessmentList = (
      <MUI.GridList cellHeight={'auto'} cols={2} padding={10} >
        {assessments ? assessments : <Waiting />}
      </MUI.GridList>
    );

    return (
      <BaseLayout layoutName='assessmentsPage' userAgent={this.props.userAgent} languages={this.props.languages} title='Welcome to Advanced Archery' >
        <MUI.GridList cellHeight={'unset'} cols={4} padding={10} style={styles.gridList} >
          <MUI.GridTile style={{padding:'5pt'}}
            cols={this.state.editAssessment ? 2 : 4} >
            {this.state.editAssessment ? <NewAssessmentCard seasonId={this.state.assessmentId} onClose={this.closeEdit} /> : <MUI.RaisedButton label="Text[new assessment]" fullWidth={true} primary={true} onTouchTap={this.newAssessment} /> }
          </MUI.GridTile>
          {this.state.editAssessment ? assessmentList : (assessments ? assessments : <Waiting />)}
          {this.state.message ? <Notice message={this.state.message} onClose={this.hideMessage}/> : null}
        </MUI.GridList>
      </BaseLayout>
    );
  }
});
