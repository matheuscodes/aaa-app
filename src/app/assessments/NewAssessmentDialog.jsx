import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

import { setupTranslation } from 'global/i18nextReact';

import MUI from 'app/common/MaterialUI';
import API from 'api';

import Stepper from 'components/Stepper';

import NewAssessmentDialogStyle from 'app/assessments/NewAssessmentDialog.style';
import BaseStep from 'app/assessments/BaseStep/BaseStep';


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
      rounds: [],
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

  renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <MUI.RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <MUI.FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const { t } = this.props;
    const { finished, stepIndex } = this.state;

    const steps = [];

    steps.push({
      title: 'Banananamaa',
      content: (
        <BaseStep
          t={t}
          style={this.style.BaseStep}
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
    });

    return (
      <MUI.Dialog
        title={t('assessment:newAssessment.title')}
        titleStyle={this.style.h3}
        modal={true}
        actions={this.renderStepActions(stepIndex)}
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
