const React = require('react');

const MUI = require('app/common/MaterialUI');
const i18nextReact = require('global/i18nextReact');

const EndDistributionGraph = require('svg/EndDistributionGraph.jsx');

const AssessmentArrowTable = require(
                                  'app/assessments/AssessmentArrowTable.jsx'
                                );

const AssessmentReport = React.createClass({
  propTypes: {
    // TODO declare a class to validate
    data: React.PropTypes.object,
    onDelete: React.PropTypes.func,
    t: React.PropTypes.func,
    assessmentId: React.PropTypes.number
  },
  onDelete: function() {
    this.props.onDelete(this.props.assessmentId);
  },
  render: function() {
    const t = this.props.t;

    var rounds = this.props.data.rounds ? this.props.data.rounds.map(
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
            style={{padding: '5pt'}} cols={8} >
            <MUI.GridList cellHeight={'auto'} cols={2} padding={10} >
              <MUI.GridTile style={{padding: '5pt'}} cols={1} >
                <AssessmentArrowTable data={round} />
              </MUI.GridTile>
              <MUI.GridTile style={{padding: '5pt'}} cols={1} >
                <EndDistributionGraph
                  id={'aaa-assessmentGraph_' + roundIndex}
                  height={'230pt'}
                  data={summary} />
              </MUI.GridTile>
            </MUI.GridList>
          </MUI.GridTile>
        );
      },
    this) : null;

    return (
      <MUI.GridList cellHeight={'auto'} cols={8} padding={10} >
        <MUI.GridTile style={{padding: '5pt'}} cols={7} >
          <p style={{margin: 0}}>
            {t('assessment:report.totalPoints', this.props.data)} <br/>
            {t('assessment:report.totalPoints', this.props.data)} <br/>
            {t('assessment:report.averagePoints', this.props.data)}
            {this.props.data.verifierArcher ? <br/> +
              t('assessment:report.verifiedArcher', this.props.data) : null}
            {this.props.data.verifierAdmin ? <br/> +
              t('assessment:report.verifiedAdmin', this.props.data) : null}
          </p>
        </MUI.GridTile>
        <MUI.GridTile style={{padding: '5pt'}} cols={1} >
          <MUI.FloatingActionButton
            mini={true}
            secondary={true}
            style={{margin: '5pt'}}
            onTouchTap={this.onDelete}>
            <MUI.icons.action.delete />
          </MUI.FloatingActionButton>
        </MUI.GridTile>
        {rounds}
      </MUI.GridList>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['assessment'],
                                               AssessmentReport);
