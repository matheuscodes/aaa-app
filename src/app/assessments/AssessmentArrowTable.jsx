const React = require('react');

const MUI = require('app/common/MaterialUI');
const i18nextReact = require('global/i18nextReact');

const valueConverter = require('global/ValueConverter');

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
  deleteEnd: function(event) {
    var data = event.target.id.split('_');
    // data[1] == data.index == roundIndex
    // data[2] == endIndex
    this.props.deleteEnd(data[1], data[2]);
  },
  render: function() {
    const t = this.props.t;

    var rows = this.props.data.ends.map(function(end, endIndex) {
      var total = 0;
      var arrows = end.map(function(arrow, arrowIndex) {
        total += valueConverter.integer[arrow];
        return (
          <MUI.Avatar
            key={[ // TODO maybe simplify this
              'aaa-assessmentArrow_',
              this.props.data.index, '_',
              endIndex, '_', arrowIndex
            ].join('')}
            color={valueConverter.color[arrow]}
            backgroundColor={valueConverter.backgroundColor[arrow]}
            size={styles.arrowSize} >{arrow}</MUI.Avatar>
        );
      }, this);
      return (
        <tr key={'aaa-assessmentRow_' + this.props.data.index + '_' + endIndex}>
          <td style={{display: 'block', maxWidth: (styles.arrowSize * 6)}} >
            {arrows}
          </td>
          <td >
            {total}
            {this.props.deleteEnd ?
              <MUI.FlatButton
                id={[
                  'aaa-assessmentDelete_',
                  this.props.data.index, '_',
                  endIndex
                ].join('')}
                onTouchTap={this.deleteEnd}
                secondary={true}
                icon={<MUI.icons.navigation.cancel />}
                style={{margin: 2, minWidth: null}} /> : null}
          </td>
        </tr>
      );
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
