import React from 'react';
import { withRouter } from 'react-router'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import API from 'api';

import Waiting from 'app/common/Waiting';

import TrainingsPageStyle from 'app/trainings/TrainingsPage.style';

import TrainingTile from 'app/trainings/TrainingTile';
import NewTrainingDialog from 'app/trainings/NewTrainingDialog';

const styles = { };

class TrainingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.style = new TrainingsPageStyle(this.props.styleProvider);
    this.state = {editTraining: false, currentPage:0};
  }

  updateTrainingList() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function(list) {
        var current = this.state;
        current.trainings = list;
        current.editTraining = false;
        this.setState(current);
      },
      error: function(error) {
        if(API.isAuthError(error)){
          this.showMessage(t('common:messages.notLoggedIn'), "ERROR");
          this.props.switcher.switchTo('loginPage');
        }
        this.showMessage(t('training:messages.listError'), "ERROR");
      }
    };
    API.trainings.getList(this.state.currentPage,callbacks);
  }

  updatePreviousList() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function(list) {
        var current = this.state;
        current.previous = list;
        this.setState(current);
      },
      error: function(error) {
        if(API.isAuthError(error)){
          this.showMessage(t('common:messages.notLoggedIn'), "ERROR");
          this.props.switcher.switchTo('loginPage');
        }
        this.showMessage(t('training:messages.listError'), "ERROR");
      }
    };
    if(this.state.currentPage > 0){
      API.trainings.getList(this.state.currentPage - 1,callbacks);
    } else {
      var current = this.state;
      delete current.previous;
      this.setState(current);
    }
  }

  updateNextList() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function(list) {
        var current = this.state;
        if(list.length > 0){
          current.next = list;
        } else {
          delete current.next;
        }
        this.setState(current);
      },
      error: function(error) {
        if(API.isAuthError(error)){
          this.showMessage(t('common:messages.notLoggedIn'), "ERROR");
          this.props.switcher.switchTo('loginPage');
        }
        this.showMessage(t('training:messages.listError'), "ERROR");
      }
    };
    API.trainings.getList(this.state.currentPage + 1,callbacks);
  }

  componentDidMount() {
    this.updateAll();
  }

  updateAll() {
    this.updateTrainingList();
    this.updateRest();
  }

  updateRest() {
    this.updateNextList();
    this.updatePreviousList();
  }

  moveToNextPage(){
    var current = this.state;
    current.currentPage += 1;
    current.trainings = current.next;
    current.next = null;
    current.previous = null;
    this.setState(current);
    this.updateRest();
  }

  moveToPreviousPage(){
    var current = this.state;
    current.currentPage -= 1;
    current.trainings = current.previous;
    current.next = null;
    if(current.currentPage > 0){
      current.previous = null
    } else {
      delete current.previous;
    }
    this.setState(current);
    this.updateRest();
  }

  deleteTraining(seasonId, trainingId) {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function() {
        this.showMessage(t('training:messages.deleted'), "SUCCESS");
        this.updateAll();
      },
      warning: function() {
        this.showMessage(t('training:messages.deleted'), "WARNING");
      },
      error: function() {
        this.showMessage(t('training:messages.deletedError'), "ERROR");
      }
    };
    API.trainings.delete(seasonId, trainingId, callbacks);
  }

  closeEdit(refresh) {
    var current = this.state;
    current.editTraining = false;
    this.setState(current);
    if (refresh) {
      this.updateAll();
    }
  }

  newTraining() {
    var current = this.state;
    current.editTraining = true;
    this.setState(current);
  }

  showMessage(message, type) {
    if(typeof this.props.messenger !== 'undefined'){
      this.props.messenger.showMessage(message, type);
    }
  }

  subscribe(sender) {
    this.messenger = sender;
  }

  render() {
    const t = this.props.t;

    let trainings;
    if (typeof this.state.trainings !== 'undefined') {
      trainings = this.state.trainings.map(function(training, index) {
        return (
          <Grid item xs={4}
            key={['aaa-training_', index].join('')} >
            <TrainingTile data={training} onDelete={this.deleteTraining.bind(this)} />
          </Grid>
        );
      }, this);
    }

    return (
      <div style={{'backgroundColor':'white', padding:'10pt'}}>
        <Button
          style={{marginBottom:'10pt'}}
          fullWidth={true}
          color="primary"
          variant="contained"
          onClick={this.newTraining.bind(this)} >
          {t('training:newTraining.button')}
        </Button>
        <Grid container spacing={2}>
          {(trainings || <Grid item xs={12} ><Waiting /></Grid>)}
        </Grid>
        <Grid container >
          <Grid item xs={6} sm={4} lg={3} style={{padding:'5pt'}}>
            {
              typeof this.state.previous !== 'undefined' ?
              <Button
                style={{marginBottom:'10pt'}}
                fullWidth={true}
                color="secondary"
                variant="contained"
                startIcon={<Icon>chevron_left</Icon>}
                disabled={(this.state.previous === null)}
                onClick={this.moveToPreviousPage.bind(this)} >
                { t('training:previousButton') }
              </Button> : ''
            }
          </Grid>
          <Grid item xs={false} sm={4} lg={6} />
          <Grid item xs={6} sm={4} lg={3} style={{padding:'5pt'}}>
            {
              typeof this.state.next !== 'undefined' ?
              <Button
                style={{marginBottom:'10pt'}}
                fullWidth={true}
                color="secondary"
                variant="contained"
                endIcon={<Icon>chevron_right</Icon>}
                disabled={(this.state.next === null)}
                onClick={this.moveToNextPage.bind(this)} >
                { t('training:nextButton') }
              </Button> : ''
            }
          </Grid>
        </Grid>

        <NewTrainingDialog
          open={this.state.editTraining}
          messenger={this.props.messenger}
          onRequestClose={this.closeEdit.bind(this)} />
      </div>
    );
  }
}

export default withTranslation('training')(withRouter(withStyles(styles)(TrainingsPage)));
