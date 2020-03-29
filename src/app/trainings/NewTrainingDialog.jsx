import React from 'react';
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import API from 'api';

import BaseStep from 'app/trainings/BaseStep/BaseStep';
import TypesStep from 'app/trainings/ArrowSteps/TypesStep';
import DistancesStep from 'app/trainings/ArrowSteps/DistancesStep';
import InputStep from 'app/trainings/ArrowSteps/InputStep';
import NeurobicsStep from 'app/trainings/NeurobicsSteps/NeurobicsStep';
import WorkoutStep from 'app/trainings/WorkoutSteps/WorkoutStep';
import TrainingTile from 'app/trainings/TrainingTile';

const styles = {}

class NewTrainingDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState() {
    const today = new Date();
    today.setHours(18);
    return {
      seasons: [],
      open: this.props.open,
      stepIndex: 0,
      categories: {arrows:true},
      arrowTrainingTypes: {WARMUP:true, WARMOUT:true},
      arrowDistances: {
        5: true,
        10: false,
        18: false,
        25: false,
        40: false,
        50: false,
        60: false,
        70: false
      },
      training: {
        date: today,
        arrows: {
        }
      }
    };
  }

  componentDidMount() {
    const {t, messenger} = this.props;
    var callbacks = {
      context: this,
      success: function(seasons) {
        var current = this.state;
        current.seasons = seasons;
        this.setState(current);
      },
      error: function(){
        messenger.showMessage(t('training:messages.seasonError'), "ERROR");
      }
    };
    this.setState(this.getInitialState());
    API.seasons.getList(callbacks);
  }

  changeSeason(event) {
    this.state.training.seasonId =  event.target.value;
    this.setState(this.state);
  }

  componentWillReceiveProps(nextProps){
    if(typeof nextProps.open !== 'undefined'){
      this.state.open = nextProps.open;
    }
    this.setState(this.state);
  }

  submitTraining() {
    const {t, messenger} = this.props;

    var callbacks = {
      context: this,
      success: function() {
        messenger.showMessage(t('training:messages.newSaved'), "SUCCESS");
        this.handleClose(true);
      },
      warning: function() {
        messenger.showMessage(t('training:messages.newSaved'), "WARNING");
      },
      error: function() {
        messenger.showMessage(t('training:messages.newError'), "ERROR");
      }
    };
    if(typeof this.state.training.seasonId !== 'undefined'){
      API.trainings.save(this.state.training, callbacks);
    } else {
      messenger.showMessage(t('training:messages.newErrorMissingSeason'), "ERROR");
    }
  }

  changeDate(date) {
    this.state.training.date = date;
    this.state.training.date.setHours(18);
    this.setState(this.state);
  }

  setArrowCount(distance, type, value) {
    const count = parseFloat(value);
    if(!value.match('^[0-9]*$') || isNaN(count) || !(count > 0)) {
      if(this.state.training.arrows[distance] &&
         this.state.training.arrows[distance][type]) {
        delete this.state.training.arrows[distance][type];
      }
    } else {
      if(typeof this.state.training.arrows[distance] === 'undefined'){
        this.state.training.arrows[distance] = {};
      }
      this.state.training.arrows[distance][type] = count;
    }
  }

  setTrainingCategories(categories){
    Object.assign(this.state.categories, categories);
    this.setState(this.state);
  }

  setArrowTrainingTypes(types){
    Object.assign(this.state.arrowTrainingTypes, types);
    this.setState(this.state);
  }

  setArrowDistances(distances){
    Object.assign(this.state.arrowDistances, distances);
    this.setState(this.state);
  }

  handleClose(refresh) {
    const initial = this.getInitialState();
    initial.seasons = this.state.seasons;
    this.setState(initial);
    this.props.onRequestClose(refresh);
  }

  get stepActions() {
    const {stepIndex} = this.state;
    const actions = [];
    if (stepIndex > 0) {
      actions.push(
        <Grid item xs={6} key={'aaa-newAssessmentDialog-back'}>
          <Button fullWidth
            color="secondary"
            variant="contained"
            startIcon={<Icon>cancel</Icon>}
            disabled={(this.state.next === null)}
            onClick={() => {
              this.state.stepIndex = stepIndex - 1;
              this.setState(this.state);
            }} >
            {this.props.t('assessment:newAssessment.back')}
          </Button>
        </Grid>
      );
    } else if (stepIndex === 0) {
      actions.push(
        <Grid item xs={6} key={'aaa-newAssessmentDialog-exit'}>
          <Button fullWidth
            color="secondary"
            variant="contained"
            startIcon={<Icon>cancel</Icon>}
            disabled={(this.state.next === null)}
            onClick={this.handleClose.bind(this)} > </Button>
        </Grid>
      );
    }

    let stepCount = 1;
    stepCount += this.state.categories.arrows ? 3 : 0;
    stepCount += this.state.categories.workouts ? 1 : 0;
    stepCount += this.state.categories.neurobics ? 1 : 0;

    if (stepIndex === stepCount) {
      actions.push(
        <Grid item xs={6} key={'aaa-newAssessmentDialog-submit'}>
          <Button fullWidth
            color="primary"
            variant="contained"
            startIcon={<Icon>backup</Icon>}
            onClick={this.submitTraining.bind(this)} > </Button>
        </Grid>
      );
    } else {
      actions.push(
        <Grid item xs={6} key={'aaa-newAssessmentDialog-next'}>
          <Button fullWidth
            color="primary"
            variant="contained"
            disabled={!(
              ( this.state.categories.arrows ||
                this.state.categories.workouts ||
                this.state.categories.neurobics ) &&
              this.state.training.date && this.state.training.seasonId
            )}
            onClick={() => {
              this.state.stepIndex = stepIndex + 1;
              this.setState(this.state);
            }} >
            {this.props.t('assessment:newAssessment.next')}
          </Button>
        </Grid>
      );
   }

    return actions;
  }

  get baseStep() {
    return (
      <BaseStep
        key="baseStep"
        categories={this.state.categories}
        seasons={this.state.seasons}
        seasonId={this.state.training.seasonId}
        date={this.state.training.date}
        changeSeason={this.changeSeason.bind(this)}
        changeDate={this.changeDate.bind(this)}
        setTrainingCategories={this.setTrainingCategories.bind(this)} />
    );
  }

  addArrowSteps(steps) {
    if(this.state.categories.arrows){
      steps.push(
        <TypesStep
          arrowTrainingTypes={this.state.arrowTrainingTypes}
          setArrowTrainingTypes={this.setArrowTrainingTypes.bind(this)} />
      );
      steps.push(
        <DistancesStep
          messenger={this.props.messenger}
          arrowDistances={this.state.arrowDistances}
          setArrowDistances={this.setArrowDistances.bind(this)} />
      );
      steps.push(
        <InputStep
          messenger={this.props.messenger}
          arrowDistances={this.state.arrowDistances}
          arrowTrainingTypes={this.state.arrowTrainingTypes}
          setArrowCount={this.setArrowCount.bind(this)} />
      );
    }
  }

  addWorkoutSteps(steps) {
    if(this.state.categories.workouts){
      steps.push(<WorkoutStep />);
    }
  }

  addNeurobicsSteps(steps) {
    if(this.state.categories.neurobics){
      steps.push(<NeurobicsStep />);
    }
  }

  closeDialog(refresh) {
    const newState = this.getInitialState();
    newState.open = false;
    newState.seasons = this.state.seasons;
    this.state = newState;
    this.props.onRequestClose(refresh);
  }

  render() {
    const {t} = this.props;
    const {stepIndex} = this.state;

    const steps = [];

    steps.push(this.baseStep);
    this.addWorkoutSteps(steps);
    this.addNeurobicsSteps(steps);
    this.addArrowSteps(steps);

    return (
      <Dialog open={this.props.open} onClose={this.closeDialog.bind(this)} fullScreen>
        <DialogTitle id="form-dialog-title">
          {t('training:newTraining.title')}
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={stepIndex} orientation="vertical">
            {steps}
            <Step>
              <StepLabel>{t('training:newTraining.confirmStep.title')}</StepLabel>
              <StepContent>
                <Grid container justify="center" >
                  <Grid item xs={6} >
                    <TrainingTile data={this.state.training} />
                  </Grid>
                </Grid>
              </StepContent>
            </Step>
          </Stepper>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2}>
            {this.stepActions}
          </Grid>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withTranslation('training')(withStyles(styles)(NewTrainingDialog));
