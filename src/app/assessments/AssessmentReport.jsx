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
import FloatingActionButton from '@material-ui/core/fab';

import API from 'api';

import WeatherConditions from 'constants/WeatherConditions';
import Compass from 'svg/icon/Compass';
import WeatherIcons from 'svg/icon/Weather';
import EndDistributionGraph from 'svg/EndDistributionGraph';
import DistributionComparisonGraph from 'svg/DistributionComparisonGraph';

import AssessmentArrowTable from 'app/assessments/AssessmentArrowTable';
import Waiting from 'app/common/Waiting';

const styles = {}

class AssessmentReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {called: false, assessment: {}};
  }

  onDelete() {
    this.props.onDelete(this.props.seasonId, this.props.assessmentId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open === true && !this.state.called) {
      let callbacks = {
        context: this,
        success(assessment) {
          this.setState({assessment: assessment, called: false});
        },
      };
      API.assessments.reportById(this.props.assessmentId, this.props.seasonId, callbacks);
      this.setState(Object.assign(this.state, {
        called: true,
      }));
    }
  }

  render() {
    const t = this.props.t;

    let rounds = <Waiting />;
    if (typeof this.state.assessment.rounds !== 'undefined') {
      if (this.state.assessment.rounds.length > 0) {
        rounds = this.state.assessment.rounds.map(
          function(round, roundIndex) {
            round.index = roundIndex;
            let summary = {
              values: {
                averageScore: round.averageScores,
              },
              counts: {
                xs: round.xCount,
                tens: round.tenCount,
              },
              minAverage: round.minAverage,
              maxAverage: round.maxAverage,
              maxCount: round.maxCount,
              endCount: round.endCount,
            };

            return (
              <Grid item xs={12} key={'aaa-assessmentRound_' + roundIndex} >
                <Grid container>
                  <Grid xs={6} >
                    <AssessmentArrowTable
                      style={this.props.style}
                      data={round} />
                  </Grid>
                  <Grid xs={6} >
                    <EndDistributionGraph
                      id={'aaa-assessmentGraph_' + roundIndex}
                      height={'230pt'}
                      data={summary} />
                  </Grid>
                </Grid>
              </Grid>
            );
          },
        this);
      } else {
        rounds = (
          <Grid xs={12} >
            {t('assessment:report.noRounds')}
          </Grid>
        );
      }
    }

    let comparison = <Grid xs={12} ><Waiting /></Grid>;
    if (typeof this.state.assessment.ringComparison !== 'undefined') {
      comparison = (
        <Grid xs={6}>
          <DistributionComparisonGraph
            data={this.state.assessment.ringComparison} />
        </Grid>
      );
    }

    const CurrentWeather =
          WeatherIcons[WeatherConditions[this.state.assessment.weather]];

    return (
      <Dialog open={this.props.open} onClose={this.handleClose.bind(this)} fullScreen>
        <DialogTitle>
          { this.state.assessment.event ?
                    this.state.assessment.event.name :
                    t('assessment:report.title', this.props.data)}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} >
            <Grid item xs={6}>
              <h4>
                {t('assessment:report.overviewTitle', this.props.data)}
              </h4>
              <p>
                {
                  this.state.assessment.targetName ?
                    this.state.assessment.targetName : ''
                }
              </p>
              <p>
                {t('assessment:report.totalPoints', this.props.data)} <br/>
                {t('assessment:report.averagePoints', this.props.data)}
              </p>
              {
                this.state.assessment.weather ?
                [
                  <h4 key={0}>
                    {t('assessment:report.weatherTitle', this.props.data)}
                  </h4>,
                  <table style={{width: '100%'}} key={1}>
                    <tbody>
                      <tr>
                        <td width={'1%'} rowSpan={2}>
                          <CurrentWeather
                             height={'48pt'} style={{padding: '5pt'}} />
                        </td>
                        { this.state.assessment.windSpeed ?
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
                              direction={this.state.assessment.windDirection}
                              height={'24pt'} />
                          </td>,
                          <td width={'99%'}
                              key={2}>
                            <p>
                              {this.state.assessment.windSpeed}
                              {t('assessment:report.windSpeedInfo',
                                 this.state.assessment)}
                            </p>
                          </td>] : [] }
                      </tr>
                      <tr>
                        { this.state.assessment.shootDirection ?
                          [<td width={'1%'}
                               key={0}
                               style={{
                                 textAlign: 'right',
                               }}>
                            <p>
                              {t('assessment:report.targetLabel')}
                            </p>
                          </td>,
                          <td width={'1%'}
                              key={1}>
                            <Compass
                              direction={this.state.assessment.shootDirection}
                              height={'24pt'} />
                          </td>]
                           : [] }
                      </tr>
                    </tbody>
                  </table>,
                ] : []
              }
            </Grid>
            <Grid item xs={6}>
              <h4>
                {t('assessment:report.comparisonTitle')}
              </h4>
              {comparison}
            </Grid>
            {rounds}
          </Grid>
        </DialogContent>
        <DialogActions>
          <FloatingActionButton
            color="secondary"
            onClick={this.onDelete.bind(this)}>
            <Icon>delete</Icon>
          </FloatingActionButton>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withTranslation('assessment')(withStyles(styles)(AssessmentReport));
