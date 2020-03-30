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
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';

import Round from 'model/Round';

import API from 'api';

import BaseStep from 'app/assessments/BaseStep/BaseStep';
import WeatherStep from 'app/assessments/WeatherStep/WeatherStep';
import RoundStep from 'app/assessments/RoundStep/RoundStep';
import AssessmentTile from 'app/assessments/AssessmentTile';
import AssessmentArrowTable from 'app/assessments/AssessmentArrowTable';
import WeatherConditions from 'constants/WeatherConditions';
import Compass from 'svg/icon/Compass';
import WeatherIcons from 'svg/icon/Weather';

const styles = {}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

  changeDate(date) {
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

  changeSeason(event,component) {
    const current = this.state;
    current.seasonId = event.target.value;
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
    const season = this.state.seasons[component.key];
    API.events.getList(callbacks, season.start, season.end);
  }

  changeTarget(event, component) {
    const current = this.state;
    current.targetId = event.target.value;
    current.target = current.targets[component.key];
    this.setState(current);
  }

  changeEvent(event) {
    const current = this.state;
    current.eventId = event.target.value;
    this.setState(current);
  }

  changeWeather(event) {
    const current = this.state;
    current.weather = event.target.value;
    this.setState(current);
  }

  changeWindDirection(event) {
    const current = this.state;
    current.windDirection = event.target.value;
    this.setState(current);
  }

  changeShootDirection(event) {
    const current = this.state;
    current.shootDirection = event.target.value;
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
        messenger.showMessage(t('assessment:messages.newSaved'), 'SUCCESS');
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
            onClick={this.closeDialog.bind(this)} > </Button>
        </Grid>
      );
    }

    if (stepIndex < (1 + rounds.length)) {
      actions.push(
        <Grid item xs={6} key={'aaa-newAssessmentDialog-next'}>
          <Button fullWidth
            color="primary"
            variant="contained"
            disabled={!this.validateBase()}
            onClick={() => {
              this.state.stepIndex = stepIndex + 1;
              this.setState(this.state);
            }} >
            {this.props.t('assessment:newAssessment.next')}
          </Button>
        </Grid>
      );
    } else if(stepIndex < (1 + rounds.length + 1)) {
      actions.push(
        <Grid item xs={6} key={'aaa-newAssessmentDialog-new'}>
          <Button fullWidth
            color="primary"
            variant="contained"
            disabled={!this.validateRound()}
            onClick={() => {
              this.state.stepIndex = stepIndex + 1;
              this.addRound();
            }} >
            {this.props.t('assessment:newAssessment.new')}
          </Button>
          {(stepIndex === (1 + rounds.length)) ? <Button fullWidth
            color="primary"
            variant="contained"
            disabled={!this.validateRound()}
            onClick={() => {
              this.state.stepIndex = stepIndex + 1;
              this.setState(this.state);
            }}>
            {this.props.t('assessment:newAssessment.finish')}
          </Button> : ''}
        </Grid>
      );
    } else {
      actions.push(
        <Grid item xs={6} key={'aaa-newAssessmentDialog-submit'}>
          <Button fullWidth
            color="primary"
            variant="contained"
            startIcon={<Icon>backup</Icon>}
            onClick={this.submitAssessment.bind(this)} > </Button>
        </Grid>
      );
    }

    return actions;
  }

  get roundSteps() {
    return this.state.rounds.map((round, index) => {
      return (
        <RoundStep
          key={`roundStep_${index}`}
          addRound={this.addRound.bind(this)}
          addEnd={this.addEnd.bind(this)}
          deleteEnd={this.deleteEnd.bind(this)}
          roundIndex={index}
          round={round} />
      )
    });
  }

  closeDialog(refresh) {
    const newState = this.getInitialState();
    newState.open = false;
    newState.targets = this.state.targets;
    newState.seasons = this.state.seasons;
    this.setState(newState);

    this.props.onRequestClose(refresh);
  }

  render() {
    const { t } = this.props;
    const { finished, stepIndex } = this.state;

    const CurrentWeather =
          WeatherIcons[WeatherConditions[this.state.weather]];


    return (
      <Dialog open={this.props.open} onClose={this.closeDialog.bind(this)} TransitionComponent={Transition} fullScreen>
        <AppBar style={{position: 'relative'}}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={this.closeDialog.bind(this,false)}>
              <Icon>close</Icon>
            </IconButton>
            <Typography variant="h6" style={{ marginLeft: '2pt', flex: 1 }}>
              {t('assessment:newAssessment.title')}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Stepper activeStep={stepIndex} orientation="vertical">
            <BaseStep
              events={this.state.events}
              targets={this.state.targets}
              seasons={this.state.seasons}
              distance={this.state.distance}
              date={this.state.date}
              eventId={this.state.eventId}
              targetId={this.state.targetId}
              seasonId={this.state.seasonId}
              changeSeason={this.changeSeason.bind(this)}
              changeTarget={this.changeTarget.bind(this)}
              changeEvent={this.changeEvent.bind(this)}
              changeDistance={this.changeDistance.bind(this)}
              changeDate={this.changeDate.bind(this)} />
            <WeatherStep
              temperature={this.state.temperature}
              changeTemperature={this.changeTemperature.bind(this)}
              weather={this.state.weather}
              changeWeather={this.changeWeather.bind(this)}
              windSpeed={this.state.windSpeed}
              changeWindSpeed={this.changeWindSpeed.bind(this)}
              windDirection={this.state.windDirection}
              changeWindDirection={this.changeWindDirection.bind(this)}
              shootDirection={this.state.shootDirection}
              changeShootDirection={this.changeShootDirection.bind(this)} />
            {this.roundSteps}
            <Step>
              <StepLabel>{t('assessment:newAssessment.confirmStep.title')}</StepLabel>
              <StepContent>
                <Grid container justify="center" >
                  <Grid item xs={4}>
                    <h4>
                      {t('assessment:report.overviewTitle')}
                    </h4>
                    <p>
                      {
                        this.state.date ?
                          `${this.state.date.toJSON().substr(0,10)}` : ''
                      }
                    </p>
                    <p>
                      {
                        this.state.distance ?
                          `${this.state.distance}m` : ''
                      }
                    </p>
                    <p>
                      {
                        this.state.eventId ?
                          `Event: ${this.state.eventId}` : ''
                      }
                    </p>
                    <p>
                      {
                        this.state.target ?
                          `${this.state.target.name}` : ''
                      }
                    </p>
                    <h4 key={0}>
                      {t('assessment:report.weatherTitle')}
                    </h4>
                    <table style={{width: '100%'}} key={1}>
                      <tbody>
                        <tr>
                          <td width={'1%'} rowSpan={2}>
                            {CurrentWeather ? <CurrentWeather
                               height={'48pt'} style={{padding: '5pt'}} /> : ''}
                          </td>
                          { this.state.windSpeed ?
                            [<td width={'1%'}
                                 key={0}
                                 style={{
                                   textAlign: 'right',
                                 }}>
                              <p>
                                {t('assessment:report.windLabel')}
                              </p>
                            </td>,
                            <td width={'1%'}
                                key={1}>
                              <Compass
                                direction={this.state.windDirection}
                                height={'24pt'} />
                            </td>,
                            <td width={'99%'}
                                key={2}>
                              <p>
                                {this.state.windSpeed}
                                {t('assessment:report.windSpeedInfo',
                                   this.state)}
                              </p>
                            </td>] : [] }
                        </tr>
                        <tr>
                          { this.state.shootDirection ?
                            [<td width={'1%'}
                                 key={0}
                                 style={{
                                   textAlign: 'right',
                                 }}>
                              <p>
                                {t('assessment:report.targetLabel', this.state)}
                              </p>
                            </td>,
                            <td width={'1%'}
                                key={1}>
                              <Compass
                                direction={this.state.shootDirection}
                                height={'24pt'} />
                            </td>]
                             : [] }
                        </tr>
                      </tbody>
                    </table>
                  </Grid>
                  {this.state.rounds.map(round => (
                    <Grid item xs={4} >
                      <AssessmentArrowTable
                        data={round} />
                    </Grid>
                  ))}
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
