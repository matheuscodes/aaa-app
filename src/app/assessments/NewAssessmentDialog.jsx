import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

import { setupTranslation } from 'global/i18nextReact';

import MUI from 'app/common/MaterialUI';
import API from 'api';

import Stepper from 'components/Stepper';

import NewAssessmentDialogStyle from 'app/assessments/NewAssessmentDialog.style';
import BaseStep from 'app/assessments/BaseStep/BaseStep';
import WeatherStep from 'app/assessments/WeatherStep/WeatherStep';
import RoundStep from 'app/assessments/RoundStep/RoundStep';


@autobind
class NewAssessmentDialog extends React.Component {
  get propTypes() {
    return {
      onClose: PropTypes.func,
      t: PropTypes.func,
    }
  }

  constructor(props) {
    super(props);
    const today = new Date();
    this.style = new NewAssessmentDialogStyle(props.style.styleProvider);
    today.setHours(18);
    this.state = {
      open: props.open,
      date: today,
      targets: [],
      seasons: [],
      events: [],
      rounds: [{ends: []}],
      finished: false,
      stepIndex: 0,
    };
  }


  handleNext() {
    const {stepIndex} = this.state;
    this.state.stepIndex = stepIndex + 1;
    this.state.finished = stepIndex >= 2;
    this.setState(this.step);
  }

  handlePrev() {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.state.stepIndex = stepIndex - 1;
      this.setState(this.step);
    }
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
          }
        };
        API.seasons.getList(callbacks);
      }
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
      }
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

  addRound(roundIndex,round) {
    if(typeof roundIndex === 'undefined' || typeof round === 'undefined'){
      this.state.rounds.push({ends: []});
    } else {
      this.state.rounds[roundIndex] = round;
    }
    this.setState(this.state);
  }

  addEnd(roundIndex, end) {
    var current = this.state;
    // TODO handle array out of bounds exceptions.
    current.rounds[roundIndex].ends.push(end);
    this.setState(current);
  }

  deleteEnd(roundIndex, endIndex) {
    var current = this.state;
    // TODO handle array out of bounds exceptions.
    current.rounds[roundIndex].ends.splice(endIndex, 1);
    this.setState(current);
  }

  submitAssessment() {
    const { t, messenger, onClose } = this.props;
    var callbacks = {
      context: this,
      success: function() {
        messenger.showMessage(t('assessment:messages.newSaved'), "MESSAGE");
        messenger.setState(this.getInitialState());
        onClose(true);
      },
      warning: function() {
        messenger.showMessage(t('assessment:messages.newSaved'), "WARNING");
      },
      error: function() {
        messenger.showMessage(t('assessment:messages.newError'), "ERROR");
      }
    };
    // FIXME separate assessment from state.
    API.assessments.save(this.state, callbacks);
  }

  get stepActions() {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <MUI.RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          style={this.style.RaisedButton}
          overlayStyle={this.style.RaisedButton.overlayStyle}
          labelStyle={this.style.RaisedButton.labelStyle}
          buttonStyle={this.style.RaisedButton.buttonStyle}
          primary={true}
          onTouchTap={this.handleNext} />
        {stepIndex > 0 && (
          <MUI.RaisedButton
            label={'Back'}
            style={this.style.RaisedButton}
            overlayStyle={this.style.RaisedButton.overlayStyle}
            labelStyle={this.style.RaisedButton.labelStyle}
            buttonStyle={this.style.RaisedButton.buttonStyle}
            primary={false}
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev} />
        )}
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
    }
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
    }
  }

  get roundSteps() {
    return this.state.rounds.map((round, index) => {
      return {
        title: this.props.t('assessment:newAssessment.roundStep.title',{
          round: index + 1,
        }),
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
      }
    });
  }

  render() {
    const { t } = this.props;
    const { finished, stepIndex } = this.state;

    const steps = [];

    steps.push(this.baseStep);
    steps.push(this.weatherStep);
    this.roundSteps.forEach(round => steps.push(round));

    return (
      <MUI.Dialog
        title={t('assessment:newAssessment.title')}
        titleStyle={this.style.h3}
        modal={true}
        actions={this.stepActions}
        open={this.state.open}
        onRequestClose={this.handleClose}
        contentStyle={this.style.contentStyle}
        repositionOnUpdate={true}
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true} >
        <Stepper
          style={this.style.Stepper}
          finished={finished}
          stepIndex={stepIndex}
          steps={steps} />
      </MUI.Dialog>
    );
  }
}

module.exports = setupTranslation(['assessment'], NewAssessmentDialog);
