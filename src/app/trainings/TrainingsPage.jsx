'use strict';
var React = require('react');

var MUI = require('app/common/MaterialUI');
var API = require('api');

var BaseLayout = require('app/common/BaseLayout.jsx');
var TrainingTile = require('app/trainings/TrainingTile.jsx');
var NewTrainingCard = require('app/trainings/NewTrainingCard.jsx');
var Waiting = require('app/common/Waiting.jsx');
var Notice = require('app/common/Notice.jsx');

var styles = {
  gridList: {
    width: '100%'
  }
};

module.exports = React.createClass({
  updateTrainingList: function() {
    var callbacks = {
      context: this,
      success: function(list) {
        var current = this.state;
        current.trainings = list;
        current.editTraining = false;
        this.setState(current);
      },
      error: function(error) {
        // FIXME "this" is not set in the API callback.
        this.showMessage("Text[training list error]", "ERROR");
      }
    };
    API.trainings.getList(callbacks);
  },
  getInitialState: function() {
    return {editTraining: false};
  },
  componentDidMount: function() {
    this.updateTrainingList();
  },
  deleteTraining: function(trainingId) {
    var callbacks = {
      context: this,
      success: function() {
        this.showMessage("Text[season deleted]", "MESSAGE");
        this.updateTrainingList();
      },
      warning: function() {
        this.showMessage("Text[season deleted]", "WARNING");
      },
      error: function() {
        this.showMessage("Text[season not deleted]", "ERROR");
      }
    };
    API.trainings.delete(trainingId, callbacks);
  },
  closeEdit: function(refresh) {
    if (refresh) {
      this.updateTrainingList();
    }
    else {
      var current = this.state;
      current.editTraining = false;
      this.setState(current);
    }
  },
  newTraining: function() {
    var current = this.state;
    current.editTraining = true;
    this.setState(current);
  },
  render: function() {
    var trainings = this.state.trainings ? this.state.trainings.map(function(training, index) {
      return (
        <MUI.GridTile key={'aaa-training_' + index} style={{padding: '5pt'}} cols={2} >
          <TrainingTile data={training} onDelete={this.deleteTraining} />
        </MUI.GridTile>
      );
    }, this) : null;

    return (
      <BaseLayout switcher={this.props.switcher} layoutName="trainingsPage" userAgent={this.props.userAgent} languages={this.props.languages} title="Welcome to Advanced Archery" >
        <MUI.GridList cellHeight={'unset'} cols={4} padding={10} style={styles.gridList} >
          <MUI.GridTile style={{padding: '5pt'}}
            cols={this.state.editTraining ? 2 : 4} >
            {this.state.editTraining ? <NewTrainingCard onClose={this.closeEdit} /> : <MUI.RaisedButton label="Text[new training]" fullWidth={true} primary={true} onTouchTap={this.newTraining} /> }
          </MUI.GridTile>
            {trainings ? trainings : <Waiting />}
        </MUI.GridList>
        {this.state.message ? <Notice message={this.state.message} onClose={this.hideMessage}/> : null}
      </BaseLayout>
    );
  }
});
