const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const WeatherConditions = require('constants/WeatherConditions');
const Compass = require('svg/icon/Compass');
const WeatherIcons = require('svg/icon/Weather');
const EndDistributionGraph = require('svg/EndDistributionGraph');
const DistributionComparisonGraph = require('svg/DistributionComparisonGraph');

const AssessmentArrowTable = require('app/assessments/AssessmentArrowTable');
const Waiting = require('app/common/Waiting');

const AssessmentReport = React.createClass({
  propTypes: {
    // TODO declare a class to validate
    data: React.PropTypes.object,
    onDelete: React.PropTypes.func,
    t: React.PropTypes.func,
    assessmentId: React.PropTypes.number
  },
  getInitialState: function(){
    return {called:false,assessment:{}};
  },
  onDelete: function() {
    this.props.onDelete(this.props.assessmentId);
  },
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.open === true && !this.state.called){
      var callbacks = {
        context: this,
        success: function(assessment) {
          console.log({assessment:assessment,called:false})
          this.setState({assessment:assessment,called:false});
        }
      };
      API.assessments.reportById(this.props.assessmentId, callbacks);
      this.state.called = true;
      this.setState(this.state);
    }
  },
  render: function() {
    const t = this.props.t;

    let rounds = <Waiting />;
    if (typeof this.state.assessment.rounds !== 'undefined') {
      if(this.state.assessment.rounds.length > 0){
        rounds = this.state.assessment.rounds.map(
          function(round, roundIndex) {
            round.index = roundIndex;
            var summary = {
              values: {
                averageScore: round.averageScores
              },
              counts: {
                xs: round.xCount,
                tens: round.tenCount
              },
              minAverage: round.minAverage,
              maxAverage: round.maxAverage,
              maxCount: round.maxCount,
              endCount: round.endCount
            };
            return (
              <MUI.GridTile
                key={'aaa-assessmentRound_' + roundIndex}
                style={MUI.styles.GridTile} cols={8} >
                <MUI.GridList cellHeight={'auto'} cols={2} padding={10} >
                  <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
                    <AssessmentArrowTable data={round} />
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
    if(typeof this.state.assessment.ringComparison !== 'undefined'){
      comparison = (
        <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
          <DistributionComparisonGraph data={this.state.assessment.ringComparison} />
        </MUI.GridTile>
      );
    }

    const CurrentWeather = WeatherIcons[WeatherConditions[this.state.assessment.weather]];

    return (
      <MUI.Dialog
          title={ this.state.assessment.event ? this.state.assessment.event.name :
                  t('assessment:report.title', this.props.data)}
          modal={false}
          actions={[
            <MUI.FloatingActionButton
              mini={true}
              secondary={true}
              style={{margin: '5pt'}}
              onTouchTap={this.onDelete}>
              <MUI.icons.action.delete />
            </MUI.FloatingActionButton>
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
              {this.state.assessment.targetName ? this.state.assessment.targetName : ''}
            </p>
            <p>
              {t('assessment:report.totalPoints', this.props.data)} <br/>
              {t('assessment:report.averagePoints', this.props.data)}
            </p>
            {
              this.state.assessment.weather ?
              [
                <h4>
                  {t('assessment:report.weatherTitle', this.props.data)}
                </h4>,
                <table style={{width: '100%'}}>
                  <tbody>
                    <tr>
                      <td width={'1%'} rowSpan={2}>
                        <CurrentWeather
                           height={'48pt'} style={{padding: '5pt'}} />
                      </td>
                      { this.state.assessment.windSpeed ?
                        [<td width={'1%'} style={{textAlign: 'right',color:MUI.palette.accent3Color}}>
                          <p>
                            {t('assessment:report.windLabel')}
                          </p>
                        </td>,
                        <td width={'1%'}>
                          <Compass direction={this.state.assessment.windDirection} height={'24pt'} />
                        </td>,
                        <td width={'99%'} style={{color:MUI.palette.accent3Color}}>
                          <p>
                            {this.state.assessment.windSpeed}
                            {t('assessment:report.windSpeedInfo', this.state.assessment)}
                          </p>
                        </td>] : [] }
                    </tr>
                    <tr>
                      { this.state.assessment.shootDirection ?
                        [<td width={'1%'} style={{textAlign: 'right',color:MUI.palette.accent3Color}}>
                          <p>
                            {t('assessment:report.targetLabel')}
                          </p>
                        </td>,
                        <td width={'1%'}>
                          <Compass direction={this.state.assessment.shootDirection} height={'24pt'} />
                        </td>]
                         : [] }
                    </tr>
                  </tbody>
                </table>
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
});

module.exports = i18nextReact.setupTranslation(['assessment'],
                                               AssessmentReport);
