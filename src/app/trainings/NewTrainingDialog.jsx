import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

import {setupTranslation} from 'global/i18nextReact';

import Round from 'model/Round';

import MUI from 'app/common/MaterialUI';
import API from 'api';

import Stepper from 'components/Stepper';

import NewAssessmentDialogStyle from 'app/assessments/NewAssessmentDialog.style';
import BaseStep from 'app/trainings/BaseStep/BaseStep';
import TypesStep from 'app/trainings/ArrowSteps/TypesStep';
import DistancesStep from 'app/trainings/ArrowSteps/DistancesStep';
import NeurobicsStep from 'app/trainings/NeurobicsSteps/NeurobicsStep';
import WorkoutStep from 'app/trainings/WorkoutSteps/WorkoutStep';


@autobind
class NewAssessmentDialog extends React.Component {
  constructor(props) {
    super(props);
    this.style = new NewAssessmentDialogStyle(props.style.styleProvider);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const today = new Date();
    today.setHours(18);
    return {
      seasons: [],
      open: this.props.open,
      stepIndex: 0,
      classes: {},
      arrowTrainingTypes: {WARMUP:true, WARMOUT:true},
      arrowDistances: {
        5: false,
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
          5: {},
          18: {},
          25: {},
          40: {},
          70: {}
        }
      }
    };
  }

  componentDidMount() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function(seasons) {
        var current = this.state;
        current.seasons = seasons;
        this.setState(current);
      },
      error: function(){
        this.showMessage(t('training:messages.seasonError'), "ERROR");
      }
    };
    this.setState(this.getInitialState());
    API.seasons.getList(callbacks);
  }

  changeSeason(event, index, value) {
    this.state.training.seasonId = value;
    this.setState(this.state);
  }

  componentWillReceiveProps(nextProps){
    if(typeof nextProps.open !== 'undefined'){
      this.state.open = nextProps.open;
    }
    this.setState(this.state);
  }

  submitTraining() {
    const t = this.props.t;

    var callbacks = {
      context: this,
      success: function() {
        this.showMessage(t('training:messages.newSaved'), "MESSAGE");
        this.handleClose(true);
      },
      warning: function() {
        this.showMessage(t('training:messages.newSaved'), "WARNING");
      },
      error: function() {
        this.showMessage(t('training:messages.newError'), "ERROR");
      }
    };
    if(typeof this.state.training.seasonId !== 'undefined'){
      API.trainings.save(this.state.training, callbacks);
    } else {
      this.showMessage(t('training:messages.newErrorMissingSeason'), "ERROR");
    }
  }

  changeSeason(event, index, value) {
    var current = this.state;
    current.training.seasonId = value;
    this.setState(current);
  }

  changeDate(event, date) {
    this.state.training.date = date;
    this.state.training.date.setHours(18);
    this.setState(this.state);
  }

  setArrowCount(distance, type, value) {
    if(typeof this.state.training.arrows[distance] === 'undefined'){
      this.state.training.arrows[distance] = {};
    }
    this.state.training.arrows[distance][type] = value;
  }

  setTrainingClasses(classes){
    Object.assign(this.state.classes, classes);
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
    const {stepIndex, rounds} = this.state;
    const actions = [];
    if (stepIndex > 0) {
      actions.push(
        <MUI.RaisedButton
          key={'aaa-newAssessmentDialog-back'}
          label={this.props.t('assessment:newAssessment.back')}
          style={this.style.actionButton}
          primary={false}
          onTouchTap={() => {
            this.state.stepIndex = stepIndex - 1;
            this.setState(this.state);
          }} />
      );
    } else if (stepIndex === 0) {
      actions.push(
        <MUI.RaisedButton
          key={'aaa-newAssessmentDialog-exit'}
          label={' '}
          icon={<MUI.icons.navigation.cancel />}
          style={this.style.actionButton}
          secondary={true}
          onTouchTap={this.closeDialog} />
      );
    }
    actions.push(
      <MUI.RaisedButton
        key={'aaa-newAssessmentDialog-next'}
        label={this.props.t('assessment:newAssessment.next')}
        style={this.style.actionButton}
        disabled={!(
          ( this.state.classes.arrows ||
            this.state.classes.workouts ||
            this.state.classes.neurobics ) &&
          this.state.training.date && this.state.training.seasonId
        )}
        primary={true}
        onTouchTap={() => {
          this.state.stepIndex = stepIndex + 1;
          this.setState(this.state);
        }} />
    );

    return (
      <div>
        {actions}
      </div>
    );
  }

  get baseStep() {
    return {
      title: this.props.t('training:newTraining.baseStep.title'),
      content: (
        <BaseStep
          t={this.props.t}
          style={this.style}
          classes={this.state.classes}
          seasons={this.state.seasons}
          seasonId={this.state.training.seasonId}
          date={this.state.training.date}
          changeSeason={this.changeSeason}
          changeDate={this.changeDate}
          setTrainingClasses={this.setTrainingClasses} />
      ),
    };
  }

  addArrowSteps(steps) {
    if(this.state.classes.arrows){steps.push({
      title: this.props.t('training:newTraining.ArrowsSteps.TypesStep.title'),
      content: (
        <TypesStep
          t={this.props.t}
          style={this.style}
          arrowTrainingTypes={this.state.arrowTrainingTypes}
          setArrowTrainingTypes={this.setArrowTrainingTypes} />
      ),
    });
      steps.push({
        title: this.props.t('training:newTraining.ArrowsSteps.DistancesStep.title'),
        content: (
          <DistancesStep
            t={this.props.t}
            style={this.style}
            messenger={this.props.messenger}
            arrowDistances={this.state.arrowDistances}
            setArrowDistances={this.setArrowDistances} />
        ),
      });
    }
  }

  addWorkoutSteps(steps) {
    if(this.state.classes.workouts){
      steps.push({
        title: this.props.t('training:newTraining.WorkoutSteps.WorkoutStep.title'),
        content: (
          <WorkoutStep
            t={this.props.t}
            style={this.style} />
        ),
      });
    }
  }

  addNeurobicsSteps(steps) {
    if(this.state.classes.neurobics){
      steps.push({
        title: this.props.t('training:newTraining.NeurobicsSteps.NeurobicsStep.title'),
        content: (
          <NeurobicsStep
            t={this.props.t}
            style={this.style} />
        ),
      });
    }
  }



  get confirmStep() {
    return {
      title: this.props.t('training:newTraining.confirmStep.title'),
      content: (
        <div>
          <MUI.FloatingActionButton
            mini={true}
            secondary={true}
            style={this.style.uploadButton}
            onTouchTap={this.closeDialog}>
            <MUI.icons.navigation.cancel />
          </MUI.FloatingActionButton>
          <MUI.FloatingActionButton
            style={this.style.uploadButton}
            onTouchTap={this.submitTraining}>
            <MUI.icons.action.backup />
          </MUI.FloatingActionButton>
        </div>
      ),
    };
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
    const {finished, stepIndex} = this.state;

    const steps = [];

    steps.push(this.baseStep);
    this.addArrowSteps(steps);
    this.addWorkoutSteps(steps);
    this.addNeurobicsSteps(steps);
    steps.push(this.confirmStep);

    return (
      <MUI.Dialog
        title={t('training:newTraining.title')}
        modal={true}
        actions={this.stepActions}
        open={this.props.open}
        onRequestClose={this.closeDialog}
        contentStyle={this.style.contentStyle}
        bodyStyle={this.style.bodyStyle}
        repositionOnUpdate={true}
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true} >
        <Stepper
          style={this.style}
          finished={finished}
          stepIndex={stepIndex}
          steps={steps} />
      </MUI.Dialog>
    );
  }
}

NewAssessmentDialog.propTypes = {
  t: PropTypes.func.isRequired,
  style: PropTypes.object,
  open: MUI.Dialog.propTypes.open,
  messenger: PropTypes.object,
  onRequestClose: PropTypes.func,
};

module.exports = setupTranslation(['assessment'], NewAssessmentDialog);
