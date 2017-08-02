import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

import {setupTranslation} from 'global/i18nextReact';

import MUI from 'app/common/MaterialUI';
import API from 'api';

import Stepper from 'components/Stepper';

import NewAssessmentDialogStyle from 'app/assessments/NewAssessmentDialog.style';
import BaseStep from 'app/assessments/BaseStep/BaseStep';
import WeatherStep from 'app/assessments/WeatherStep/WeatherStep';
import RoundStep from 'app/assessments/RoundStep/RoundStep';


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
      open: this.props.open,
      date: today,
      targets: [],
      seasons: [],
      events: [],
      rounds: [{ends: [], index: 0}],
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
      this.state.rounds.push({ends: [], index: this.state.rounds.length});
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
    const {t, messenger, onRequestClose} = this.props;
    let callbacks = {
      context: this,
      success: function() {
        messenger.showMessage(t('assessment:messages.newSaved'), 'MESSAGE');
        messenger.setState(this.getInitialState());
        onRequestClose(true);
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
    }
    if (stepIndex < (1 + rounds.length)) {
      actions.push(
        <MUI.RaisedButton
          key={'aaa-newAssessmentDialog-next'}
          label={this.props.t('assessment:newAssessment.next')}
          style={this.style.actionButton}
          disabled={!this.validateBase()}
          primary={true}
          onTouchTap={() => {
            this.state.stepIndex = stepIndex + 1;
            this.setState(this.state);
          }} />
      );
    } else {
      if (stepIndex === (1 + rounds.length)) {
        actions.push(
          <MUI.RaisedButton
            key={'aaa-newAssessmentDialog-new'}
            label={this.props.t('assessment:newAssessment.new')}
            style={this.style.actionButton}
            primary={true}
            disabled={!this.validateRound()}
            onTouchTap={() => {
              this.state.stepIndex = stepIndex + 1;
              this.addRound();
            }} />
        );
      }
      // On the overview step there is no finish, only upload.
      if (stepIndex < (1 + rounds.length + 1)) {
        actions.push(
          <MUI.RaisedButton
            key={'aaa-newAssessmentDialog-finish'}
            label={this.props.t('assessment:newAssessment.finish')}
            style={this.style.actionButton}
            primary={true}
            disabled={!this.validateRound()}
            onTouchTap={() => {
              this.state.stepIndex = stepIndex + 1;
              this.setState(this.state);
            }} />
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

  get confirmStep() {
    return {
      title: this.props.t('assessment:newAssessment.confirmStep.title'),
      content: (
        <div>
          <MUI.FloatingActionButton
            mini={true}
            secondary={true}
            style={this.style.uploadButton}
            onTouchTap={this.props.onRequestClose}>
            <MUI.icons.navigation.cancel />
          </MUI.FloatingActionButton>
          <MUI.FloatingActionButton
            style={this.style.uploadButton}
            onTouchTap={this.submitAssessment}>
            <MUI.icons.action.backup />
          </MUI.FloatingActionButton>
        </div>
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

  render() {
    const {t} = this.props;
    const {finished, stepIndex} = this.state;

    const steps = [];

    steps.push(this.baseStep);
    steps.push(this.weatherStep);
    this.roundSteps.forEach((round) => steps.push(round));
    steps.push(this.confirmStep);

    return (
      <MUI.Dialog
        title={t('assessment:newAssessment.title')}
        modal={true}
        actions={this.stepActions}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
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
  open: PropTypes.boolean,
  messenger: PropTypes.object,
  onRequestClose: PropTypes.func,
};

module.exports = setupTranslation(['assessment'], NewAssessmentDialog);
