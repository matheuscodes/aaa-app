'use strict';

var React = require('react');
var MUI = require('app/common/MaterialUI');

var valueConverter = require('global/ValueConverter');

var styles = {
  arrowSize: 40,
  arrowButtonSize: 60
};

module.exports = React.createClass({
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
    var actions = ['X', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1', 'M'].map(function(value) {
      return (
        <MUI.RaisedButton
          id={'aaa-newAssessmentEndArrow_' + value}
          style={{maxWidth: styles.arrowButtonSize, minWidth: styles.arrowButtonSize}}
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
        label="Text[Submit]"
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
        <MUI.RaisedButton label="Text[add set]" onTouchTap={this.handleOpen} />
        <MUI.Dialog
          contentStyle={{maxWidth: (5 * styles.arrowButtonSize)}}
          title="Text[new end]"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose} >
          {arrows}
        </MUI.Dialog>
      </div>
    );
  }
});
