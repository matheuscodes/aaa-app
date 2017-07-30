import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

import MUI from 'app/common/MaterialUI';

import i18nextReact from 'global/i18nextReact';
import valueConverter from 'global/ValueConverter';

import ArrowRingRow from 'app/assessments/ArrowRingRow';

import RaisedButton from 'components/RaisedButton';


@autobind
class NewAssessmentEnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false, arrows: []};
  }

  handleOpen(event, index, value) {
    this.state.open = true;
    this.setState(this.state);
  }

  handleClose(event, index, value) {
    this.state.open = false;
    this.state.arrows = [];
    this.setState(this.state);
  }

  handleSubmit(event, index, value) {
    this.props.addEnd(this.props.roundIndex, this.state.arrows);
    this.state.open = false;
    this.state.arrows = [];
    this.setState(this.state);
  }

  pushArrowM() {
    this.state.arrows.push('M');
    this.setState(this.state);
  }

  pushArrow1() {
    this.state.arrows.push('1');
    this.setState(this.state);
  }

  pushArrow2() {
    this.state.arrows.push('2');
    this.setState(this.state);
  }

  pushArrow3() {
    this.state.arrows.push('3');
    this.setState(this.state);
  }

  pushArrow4() {
    this.state.arrows.push('4');
    this.setState(this.state);
  }

  pushArrow5() {
    this.state.arrows.push('5');
    this.setState(this.state);
  }

  pushArrow6() {
    this.state.arrows.push('6');
    this.setState(this.state);
  }

  pushArrow7() {
    this.state.arrows.push('7');
    this.setState(this.state);
  }

  pushArrow8() {
    this.state.arrows.push('8');
    this.setState(this.state);
  }

  pushArrow9() {
    this.state.arrows.push('9');
    this.setState(this.state);
  }

  pushArrow10() {
    this.state.arrows.push('10');
    this.setState(this.state);
  }

  pushArrowX() {
    this.state.arrows.push('X');
    this.setState(this.state);
  }

  undo() {
    this.state.arrows.pop();
    this.setState(this.state);
  }

  render() {
    const t = this.props.t;
    const actions = ['X', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1', 'M']
      .map(function(value) {
        return (
          <RaisedButton
            style={this.props.style.arrowButton}
            labelColor={valueConverter.color[value]}
            id={'aaa-newAssessmentEndArrow_' + value}
            backgroundColor={valueConverter.backgroundColor[value]}
            label={value}
            onTouchTap={this[['pushArrow',value].join('')]} />
        );
      }, this);
    actions.push(<br/>);
    actions.push(<br/>);
    actions.push(
      <RaisedButton
        style={this.props.style}
        label={t('assessment:undoEnd')}
        primary={false}
        onTouchTap={this.undo} />
    );
    actions.push(
      <RaisedButton
        style={this.props.style}
        label={t('assessment:submitEnd')}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit} />
    );

    return (
      <div style={this.props.style}>
        <RaisedButton
          style={this.props.style.mainButton}
          label={t('assessment:addEnd')}
          onTouchTap={this.handleOpen} />
        <MUI.Dialog
          contentStyle={this.props.style.Dialog.contentStyle}
          actionsContainerStyle={this.props.style.Dialog.actionsContainerStyle}
          title={t('assessment:newEndTitle')}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose} >
          <ArrowRingRow
            rows={2}
            style={this.props.style.arrowRow}
            arrows={this.state.arrows}
            arrowSize={this.props.style.arrow.width} />
        </MUI.Dialog>
      </div>
    );
  }
}

module.exports = i18nextReact.setupTranslation(['assessment'],
                                               NewAssessmentEnd);
