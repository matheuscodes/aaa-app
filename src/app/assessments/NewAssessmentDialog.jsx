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

import Round from 'model/Round';

import API from 'api';

import BaseStep from 'app/assessments/BaseStep/BaseStep';
import WeatherStep from 'app/assessments/WeatherStep/WeatherStep';
import RoundStep from 'app/assessments/RoundStep/RoundStep';
import AssessmentTile from 'app/assessments/AssessmentTile';

const styles = {}

class NewAssessmentDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const today = new Date();
    today.setHours(18);
    return {
      open: this.props.open,
      date: today,
      targets: [],
      seasons: [],
      events: [],
      rounds: [new Round({ends: [], index: 0})],
      finished: false,
      stepIndex: 0,
    };
  }

  componentDidMount() {
    const callbacks = {
      context: this,
      success: function(targets) {
        const current = this.state;
        current.targets = targets;

        const callbacks = {
          context: this,
          success: function(seasons) {
            current.seasons = seasons;
            this.setState(current);
          },
        };
        API.seasons.getList(callbacks);
      },
    };
    API.assessments.getTargets(callbacks);
  }

  changeDate(event, date) {
    const current = this.state;
    current.date = date;
    current.date.setHours(18);
    this.setState(current);
  }

  changeDistance(event) {
    const current = this.state;
    current.distance = event.target.value;
  }

  changeTemperature(event) {
    const current = this.state;
    current.temperature = event.target.value;
  }

  changeWindSpeed(event) {
    const current = this.state;
    current.windSpeed = event.target.value;
  }

  changeGustSpeed(event) {
    const current = this.state;
    current.gustSpeed = event.target.value;
  }

  changeSeason(event, index, value) {
    const current = this.state;
    current.seasonId = value;
    this.setState(current);
    const callbacks = {
      context: this,
      success: function(events) {
        const current = this.state;
        delete current.eventId;
        current.events = events;
        this.setState(current);
      },
    };
    const season = this.state.seasons[index];
    API.events.getList(callbacks, season.start, season.end);
  }

  changeTarget(event, index, value) {
    const current = this.state;
    current.targetId = value;
    current.target = current.targets[index];
    this.setState(current);
  }

  changeEvent(event, index, value) {
    const current = this.state;
    current.eventId = value;
    this.setState(current);
  }

  changeWeather(event, index, value) {
    const current = this.state;
    current.weather = value;
    this.setState(current);
  }

  changeWindDirection(event, index, value) {
    const current = this.state;
    current.windDirection = value;
    this.setState(current);
  }

  changeShootDirection(event, index, value) {
    const current = this.state;
    current.shootDirection = value;
    this.setState(current);
  }

  addRound(roundIndex, round) {
    if (typeof roundIndex === 'undefined' || typeof round === 'undefined') {
      this.state.rounds.push(new Round(
        {ends: [], index: this.state.rounds.length}
      ));
    } else {
      round.index = roundIndex;
      this.state.rounds[roundIndex] = round;
    }
    this.setState(this.state);
  }

  addEnd(roundIndex, end) {
    let current = this.state;
    // TODO handle array out of bounds exceptions.
    current.rounds[roundIndex].ends.push(end);
    this.setState(current);
  }

  deleteEnd(roundIndex, endIndex) {
    // TODO handle array out of bounds exceptions.
    this.state.rounds[roundIndex].ends.splice(endIndex, 1);
    this.setState(this.state);
  }

  submitAssessment() {
    const {t, messenger} = this.props;
    let callbacks = {
      context: this,
      success: function() {
        messenger.showMessage(t('assessment:messages.newSaved'), 'MESSAGE');
        messenger.setState(this.getInitialState());
        this.closeDialog(true);
      },
      warning: function() {
        messenger.showMessage(t('assessment:messages.newSaved'), 'WARNING');
      },
      error: function() {
        messenger.showMessage(t('assessment:messages.newError'), 'ERROR');
      },
    };
    // FIXME separate assessment from state.
    API.assessments.save(this.state, callbacks);
  }

  validateBase() {
    const missingSeason = typeof this.state.seasonId === 'undefined' ||
                          this.state.seasonId === null;
    const missingTarget = typeof this.state.targetId === 'undefined' ||
                          this.state.targetId === null;
    try {
      const distance = parseInt(this.state.distance);
      return !missingSeason && !missingTarget && distance > 0;
    } catch (e) {
      return false; // Distance is wrong.
    }
  }

  validateRound() {
    const {stepIndex, rounds} = this.state;
    if (rounds[stepIndex - 2]) {
      return rounds[stepIndex - 2].ends.length > 0;
    }
    return false;
  }

  get stepActions() {
    const {stepIndex, rounds} = this.state;
    const actions = [];
    if (stepIndex > 0) {
      actions.push(
        <Button
          key={'aaa-newAssessmentDialog-back'}
          color="secondary"
          onClick={() => {
            this.state.stepIndex = stepIndex - 1;
            this.setState(this.state);
          }}>{this.props.t('assessment:newAssessment.back')}</Button>
      );
    } else if (stepIndex === 0) {
      actions.push(
        <Button
          key={'aaa-newAssessmentDialog-exit'}
          icon={<Icon>cancel</Icon>}
          color="secondary"
          onClick={this.closeDialog.bind(this)} />
      );
    }
    if (stepIndex < (1 + rounds.length)) {
      actions.push(
        <Button
          key={'aaa-newAssessmentDialog-next'}
          disabled={!this.validateBase()}
          color="primary"
          onClick={() => {
            this.state.stepIndex = stepIndex + 1;
            this.setState(this.state);
          }}> {this.props.t('assessment:newAssessment.next')}</Button>
      );
    } else {
      if (stepIndex === (1 + rounds.length)) {
        actions.push(
          <Button
            key={'aaa-newAssessmentDialog-new'}
            color="primary"
            disabled={!this.validateRound()}
            onClick={() => {
              this.state.stepIndex = stepIndex + 1;
              this.addRound();
            }}>{this.props.t('assessment:newAssessment.new')}</Button>
        );
      }
      // On the overview step there is no finish, only upload.
      if (stepIndex < (1 + rounds.length + 1)) {
        actions.push(
          <Button
            key={'aaa-newAssessmentDialog-finish'}
            color="primary"
            disabled={!this.validateRound()}
            onClick={() => {
              this.state.stepIndex = stepIndex + 1;
              this.setState(this.state);
            }}>{this.props.t('assessment:newAssessment.finish')}</Button>
        );
      }
    }

    return (
      <div>
        {actions}
      </div>
    );
  }

  get baseStep() {
    return {
      title: this.props.t('assessment:newAssessment.baseStep.title'),
      content: (
        <BaseStep
          t={this.props.t}
          style={this.style}
          events={this.state.events}
          targets={this.state.targets}
          seasons={this.state.seasons}
          distance={this.state.distance}
          date={this.state.date}
          eventId={this.state.eventId}
          targetId={this.state.targetId}
          seasonId={this.state.seasonId}
          changeSeason={this.changeSeason}
          changeTarget={this.changeTarget}
          changeEvent={this.changeEvent}
          changeDistance={this.changeDistance}
          changeDate={this.changeDate} />
      ),
    };
  }

  get weatherStep() {
    return {
      title: this.props.t('assessment:newAssessment.weatherStep.title'),
      content: (
        <WeatherStep
          t={this.props.t}
          style={this.style}
          temperature={this.state.temperature}
          changeTemperature={this.changeTemperature}
          weather={this.state.weather}
          changeWeather={this.changeWeather}
          windSpeed={this.state.windSpeed}
          changeWindSpeed={this.changeWindSpeed}
          windDirection={this.state.windDirection}
          changeWindDirection={this.changeWindDirection}
          shootDirection={this.state.shootDirection}
          changeShootDirection={this.changeShootDirection} />
      ),
    };
  }

  get roundSteps() {
    return this.state.rounds.map((round, index) => {
      return {
        title: this.props.t('assessment:newAssessment.roundStep.title', round),
        content: (
          <RoundStep
            t={this.props.t}
            style={this.style}
            addRound={this.addRound}
            addEnd={this.addEnd}
            deleteEnd={this.deleteEnd}
            index={index}
            round={round} />
        ),
      };
    });
  }

  closeDialog(refresh) {
    const newState = this.getInitialState();
    newState.open = false;
    newState.targets = this.state.targets;
    newState.seasons = this.state.seasons;
    this.state = newState;
    this.props.onRequestClose(refresh);
  }

  render() {
    const {t} = this.props;
    const {finished, stepIndex} = this.state;

    const steps = [];

    steps.push(this.baseStep);
    steps.push(this.weatherStep);
    this.roundSteps.forEach((round) => steps.push(round));

    return (
      <Dialog open={this.props.open} onClose={this.closeDialog.bind(this)} fullScreen>
        <DialogTitle>
          {t('assessment:newAssessment.title')}
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={stepIndex} orientation="vertical">
            {steps}
            <Step>
              <StepLabel>{t('assessment:newAssessment.confirmStep.title')}</StepLabel>
              <StepContent>
                <Grid container justify="center" >
                  <Grid item xs={6} >
                    <AssessmentTile data={this.state} />
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

export default withTranslation('assessment')(withStyles(styles)(NewAssessmentDialog));
