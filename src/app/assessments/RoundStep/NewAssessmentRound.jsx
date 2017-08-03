import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

import MUI from 'app/common/MaterialUI';
import i18nextReact from 'global/i18nextReact';

import valueConverter from 'global/ValueConverter';

import TextField from 'components/TextField';

function createRound(rings, arrows, ends) {
  const endSize = Math.floor(arrows / ends);
  const endPoints = Math.floor(rings / ends);
  let endRest = rings % ends;
  const allEnds = [];
  for (let i = 0; i < ends; i += 1) {
    const allArrows = [];
    let arrowPoints;
    let arrowRest;
    if (endRest > 0) {
      arrowPoints = Math.floor((endPoints + 1) / endSize);
      arrowRest = (endPoints + 1) % endSize;
      endRest -= 1;
    } else {
      arrowPoints = Math.floor(endPoints / endSize);
      arrowRest = endPoints % endSize;
    }

    for (let j = 0; j < endSize; j += 1) {
      if (arrowRest > 0) {
        allArrows.push(valueConverter.letter[arrowPoints + 1]);
        arrowRest -= 1;
      } else {
        allArrows.push(valueConverter.letter[arrowPoints]);
      }
    }
    allEnds.push(allArrows);
  }
  return {ends: allEnds};
}

@autobind
class NewAssessmentRound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false, rings: 0, arrows: 0, ends: 0};
  }

  handleOpen() {
    this.state.open = true;
    this.setState(this.state);
  }

  handleClose() {
    this.setState({open: false, rings: 0, arrows: 0, ends: 0});
  }

  handleSubmit() {
    this.props.addRound(this.props.roundIndex, createRound(this.state.rings,
                                                           this.state.arrows,
                                                           this.state.ends));
    this.handleClose();
  }

  changeRings(event) {
    this.state.rings = event.target.value;
    this.setState(this.state);
  }

  changeArrows(event) {
    this.state.arrows = event.target.value;
    this.setState(this.state);
  }

  changeEnds(event) {
    this.state.ends = event.target.value;
    this.setState(this.state);
  }

  render() {
    const t = this.props.t;
    return (
      <div style={this.props.style ? this.props.style : null}>
        <MUI.RaisedButton
          style={this.props.style.mainButton}
          label={t('assessment:addTotal')}
          onTouchTap={this.handleOpen} />
        <MUI.Dialog
          contentStyle={this.props.style.Dialog.contentStyle}
          actionsContainerStyle={this.props.style.Dialog.actionsContainerStyle}
          title={t('assessment:newRound.title')}
          titleStyle={this.props.style.h3}
          actions={
            <MUI.RaisedButton
              style={this.props.style}
              label={t('assessment:newRound.submit')}
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.handleSubmit} />
          }
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          repositionOnUpdate={true}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true} >
          <TextField
            style={this.props.style}
            id={'aaa-newRoundRings'}
            onChange={this.changeRings}
            type={'number'}
            hintText={t('assessment:newRound.ringsTextField.hint')}
            floatingLabelText={t('assessment:newRound.ringsTextField.label')} />
          <TextField
            style={this.props.style}
            id={'aaa-newRoundArrows'}
            onChange={this.changeArrows}
            type={'number'}
            hintText={t('assessment:newRound.arrowsTextField.hint')}
            floatingLabelText={
              t('assessment:newRound.arrowsTextField.label')
            } />
          <TextField
            style={this.props.style}
            id={'aaa-newRoundEnds'}
            onChange={this.changeEnds}
            type={'number'}
            hintText={t('assessment:newRound.endsTextField.hint')}
            floatingLabelText={t('assessment:newRound.endsTextField.label')} />
        </MUI.Dialog>
      </div>
    );
  }
}

NewAssessmentRound.propTypes = {
  t: PropTypes.func.isRequired,
  style: PropTypes.object,
  addRound: PropTypes.func,
  roundIndex: PropTypes.number,
};

module.exports = i18nextReact.setupTranslation(['assessment'],
                                               NewAssessmentRound);
