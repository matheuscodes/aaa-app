import React from 'react'
import { withTranslation } from 'react-i18next'

import API from 'api'

import TrainerTile from 'app/settings/TrainerTile';
import Waiting from 'app/common/Waiting';

import { withStyles } from '@material-ui/core/styles';
import FloatingActionButton from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

const styles = {}

class NewTrainerDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {};
  }
  componentDidUpdate() {
    this.updateContent();
  }
  updateContent() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function(list) {
        this.setState({trainers: list});
      },
      failure: function() {
        this.showMessage(t('settings:trainer.new.error'), "ERROR");
        this.setState({trainers: []});
      }
    };
    if(typeof this.state.trainers === 'undefined'){
      API.trainers.getAllTrainers(callbacks);
    }
  }
  handleClose() {
    const initial = this.getInitialState();
    this.setState(initial);
    this.props.onRequestClose();
  }
  showMessage(message, type) {
    if(typeof this.props.messenger !== 'undefined'){
      this.props.messenger.showMessage(message, type);
    }
  }
  submitRequest(pupilRequest) {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function(list) {
        this.handleClose();
      },
      failure: function() {
        this.showMessage(t('settings:trainer.new.error'), "ERROR");
      }
    };
    API.trainers.postArcherToTrainer(pupilRequest, callbacks);
  }
  render() {
    const { t } = this.props;
    let trainers;
    if (typeof this.state.trainers !== 'undefined') {
      trainers = this.state.trainers.map(function(trainer, index) {
        return (
          <Grid item
            key={'aaa-trainer_' + trainer.id}
            xs={12}
            lg={6} >
            <TrainerTile
              data={trainer}
              onSelect={this.submitRequest.bind(this)} />
          </Grid>
        );
      }, this);
    }
    return (
      <Dialog open={this.props.open} onClose={this.handleClose.bind(this)} fullScreen>
        <DialogTitle>
          {t('settings:trainer.new.title')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('settings:trainer.new.subtitle')}
          </DialogContentText>
          <Grid container spacing={2}>
            {(trainers || <Grid item xs={12} ><Waiting /></Grid>)}
          </Grid>
        </DialogContent>
        <DialogActions>
          <FloatingActionButton
            size="small" color="secondary"
            onClick={this.handleClose.bind(this)}>
            <Icon>cancel</Icon>
          </FloatingActionButton>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withTranslation('settings')(withStyles(styles)(NewTrainerDialog));
