const React = require('react');

const MUI = require('app/common/MaterialUI');
const i18nextReact = require('global/i18nextReact');

const valueConverter = require('global/ValueConverter');

const styles = {
  arrowSize: 30
};

const AssessmentArrowTable = React.createClass({
  propTypes: {
    deleteEnd: React.PropTypes.func,
    t: React.PropTypes.func
  },
  deleteEnd: function() {
    this.props.deleteEnd(this.props.roundIndex, this.props.endIndex);
  },
  render: function() {
    const t = this.props.t;

    var total = 0;
    var arrows = this.props.end.map(function(arrow, arrowIndex) {
      total += valueConverter.integer[arrow];
      return (
        <MUI.Avatar
          key={arrowIndex.toString()}
          color={valueConverter.color[arrow]}
          backgroundColor={valueConverter.backgroundColor[arrow]}
          size={styles.arrowSize} >{arrow}</MUI.Avatar>
      );
    }, this);

    return (
      <tr>
        <td style={{display: 'block', maxWidth: (styles.arrowSize * 6)}} >
          {arrows}
        </td>
        <td>
          {total}
          {this.props.deleteEnd ?
            <MUI.FlatButton
              onTouchTap={this.deleteEnd}
              secondary={true}
              icon={<MUI.icons.navigation.cancel />}
              style={{margin: 2, minWidth: null}} /> : null}
        </td>
      </tr>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['assessment'],
                                               AssessmentArrowTable);
