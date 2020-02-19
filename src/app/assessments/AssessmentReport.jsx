import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

import i18nextReact from 'global/i18nextReact';
import MUI from 'app/common/MaterialUI';
import API from 'api';

import WeatherConditions from 'constants/WeatherConditions';
import Compass from 'svg/icon/Compass';
import WeatherIcons from 'svg/icon/Weather';
import EndDistributionGraph from 'svg/EndDistributionGraph';
import DistributionComparisonGraph from 'svg/DistributionComparisonGraph';

import AssessmentArrowTable from 'app/assessments/AssessmentArrowTable';
import Waiting from 'app/common/Waiting';

@autobind
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
              <MUI.GridTile
                key={'aaa-assessmentRound_' + roundIndex}
                style={MUI.styles.GridTile} cols={8} >
                <MUI.GridList cellHeight={'auto'} cols={2} padding={10} >
                  <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
                    <AssessmentArrowTable
                      style={this.props.style}
                      data={round} />
                  </MUI.GridTile>
                  <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
                    <EndDistributionGraph
                      id={'aaa-assessmentGraph_' + roundIndex}
                      height={'230pt'}
                      data={summary} />
                  </MUI.GridTile>
                </MUI.GridList>
              </MUI.GridTile>
            );
          },
        this);
      } else {
        rounds = (
          <MUI.GridTile
            style={MUI.styles.GridTile} cols={8} >
            {t('assessment:report.noRounds')}
          </MUI.GridTile>
        );
      }
    }

    let comparison = <MUI.GridTile cols={8} ><Waiting /></MUI.GridTile>;
    if (typeof this.state.assessment.ringComparison !== 'undefined') {
      comparison = (
        <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
          <DistributionComparisonGraph
            data={this.state.assessment.ringComparison} />
        </MUI.GridTile>
      );
    }

    const CurrentWeather =
          WeatherIcons[WeatherConditions[this.state.assessment.weather]];

    return (
      <MUI.Dialog
          title={ this.state.assessment.event ?
                    this.state.assessment.event.name :
                    t('assessment:report.title', this.props.data)}
          modal={false}
          actions={[
            <MUI.FloatingActionButton
              key={0}
              mini={true}
              secondary={true}
              style={{margin: '5pt'}}
              onTouchTap={this.onDelete}>
              <MUI.icons.action.delete />
            </MUI.FloatingActionButton>,
          ]}
          autoScrollBodyContent={true}
          open={this.props.open}
          onRequestClose={this.props.handleClose} >

        <MUI.GridList cellHeight={'auto'} cols={8} padding={10} >
          <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
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
                               color: MUI.palette.accent3Color,
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
                            key={2}
                            style={{color: MUI.palette.accent3Color}}>
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
                               color: MUI.palette.accent3Color,
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
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
            <h4>
              {t('assessment:report.comparisonTitle')}
            </h4>
            {comparison}
          </MUI.GridTile>
          {rounds}
        </MUI.GridList>
      </MUI.Dialog>
    );
  }
}

AssessmentReport.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  open: MUI.Dialog.propTypes.open,
  onDelete: PropTypes.func,
  handleClose: PropTypes.func,
  assessmentId: PropTypes.number,
  endIndex: PropTypes.number,
  t: PropTypes.func,
};

module.exports = i18nextReact.setupTranslation(['assessment'],
                                               AssessmentReport);
