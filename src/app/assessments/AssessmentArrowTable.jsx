const React = require('react');

const MUI = require('app/common/MaterialUI');
const i18nextReact = require('global/i18nextReact');

const valueConverter = require('global/ValueConverter');

const AssessmentArrowTableRow = require('app/assessments/AssessmentArrowTableRow');

const styles = {
  arrowSize: 30
};

const AssessmentArrowTable = React.createClass({
  propTypes: {
    // TODO declare a class to validate
    data: React.PropTypes.object,
    deleteEnd: React.PropTypes.func,
    t: React.PropTypes.func
  },
  render: function() {
    const t = this.props.t;

    var rows = this.props.data.ends.map(function(end, endIndex) {
      return (<AssessmentArrowTableRow
                end={end}
                endIndex={endIndex}
                deleteEnd={this.props.deleteEnd}
                roundIndex={this.props.data.index} />);
    }, this);

    return (
      <table style={{width: '100%'}}>
        <thead>
          <tr>
            <th style={{color:MUI.palette.accent3Color}}>
              {t('assessment:rings')}
            </th>
            <th style={{color:MUI.palette.accent3Color}}>
              {t('assessment:total')}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows}
          {this.props.data.totalScore ? <tr>
            <th style={{textAlign: 'right',color:MUI.palette.accent3Color}}>
              {t('assessment:totalPoints')}
            </th>
            <th>{this.props.data.totalScore}</th>
          </tr> : null}
          {this.props.data.totalScore ? <tr>
            <th style={{textAlign: 'right',color:MUI.palette.accent3Color}}>
              {t('assessment:totalTens')}
            </th>
            <th>{this.props.data.tens}</th>
          </tr> : null}
          {this.props.data.totalScore ? <tr>
            <th style={{textAlign: 'right',color:MUI.palette.accent3Color}}>
              {t('assessment:totalXs')}
            </th>
            <th>{this.props.data.xs}</th>
          </tr> : null}
        </tbody>
      </table>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['assessment'],
                                               AssessmentArrowTable);
