const React = require('react');

const MUI = require('app/common/MaterialUI');
const i18nextReact = require('global/i18nextReact');

const valueConverter = require('global/ValueConverter');

const styles = {
  arrowSize: 40,
  arrowButtonSize: 60
};

const NewAssessmentEnd = React.createClass({
  propTypes: {
    style: React.PropTypes.object,
    addEnd: React.PropTypes.func,
    t: React.PropTypes.func,
    roundIndex: React.PropTypes.number
  },
  getInitialState: function() {
    return {open: false, arrows: []};
  },
  handleOpen: function(event, index, value) {
    var current = this.state;
    current.open = true;
    this.setState(current);
  },
  handleClose: function(event, index, value) {
    var current = this.state;
    current.open = false;
    current.arrows = [];
    this.setState(current);
  },
  handleSubmit: function(event, index, value) {
    var current = this.state;
    this.props.addEnd(this.props.roundIndex, current.arrows);
    current.open = false;
    current.arrows = [];
    this.setState(current);
  },
  pushArrow: function(event) {
    var current = this.state;
    current.arrows.push(event.target.id.split('_')[1]);
    this.setState(current);
  },
  render: function() {
    const t = this.props.t;
    var actions = ['X', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1', 'M']
      .map(function(value) {
        return (
        <MUI.RaisedButton
          id={'aaa-newAssessmentEndArrow_' + value}
          style={{
            maxWidth: styles.arrowButtonSize,
            minWidth: styles.arrowButtonSize
          }}
          backgroundColor={valueConverter.backgroundColor[value]}
          labelStyle={{color: valueConverter.color[value]}}
          label={value}
          onTouchTap={this.pushArrow} />
      );
      }, this);
    actions.push(<br/>);
    actions.push(<br/>);
    actions.push(
      <MUI.RaisedButton
        label={t('assessment:submitEnd')}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit} />
    );
    // FIXME this is a CTRL+C from AssessmentArrowTable, modularize.
    var arrows = this.state.arrows.map(function(arrow, arrowIndex) {
      return (
        <MUI.Avatar
          key={'aaa-newAssessmentEndNewArrow_' + arrowIndex}
          color={valueConverter.color[arrow]}
          backgroundColor={valueConverter.backgroundColor[arrow]}
          size={styles.arrowSize} >{arrow}</MUI.Avatar>
      );
    }, this);

    return (
      <div style={this.props.style ? this.props.style : null}>
        <MUI.RaisedButton
          label={t('assessment:addEnd')}
          onTouchTap={this.handleOpen} />
        <MUI.Dialog
          contentStyle={{maxWidth: (5 * styles.arrowButtonSize)}}
          title={t('assessment:newEndTitle')}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose} >
          <div style={{height:styles.arrowSize*2}}>
            {arrows}
          </div>
        </MUI.Dialog>
      </div>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['assessment'],
                                               NewAssessmentEnd);
