import React from 'react';

import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import FloatingActionButton from '@material-ui/core/fab';
import TextField from '@material-ui/core/TextField';

import valueConverter from 'global/ValueConverter';

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

const styles = {}

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
      <div>
        <Button onClick={this.handleOpen.bind(this)}>
          {t('assessment:addTotal')}
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose.bind(this)}>
          <DialogTitle>
            {t('assessment:newRound.title')}
          </DialogTitle>
          <DialogContent>
            <TextField
              id={'aaa-newRoundRings'}
              onChange={this.changeRings.bind(this)}
              hintText={t('assessment:newRound.ringsTextField.hint')}
              floatingLabelText={t('assessment:newRound.ringsTextField.label')} />
            <TextField
              id={'aaa-newRoundArrows'}
              onChange={this.changeArrows.bind(this)}
              hintText={t('assessment:newRound.arrowsTextField.hint')}
              floatingLabelText={
                t('assessment:newRound.arrowsTextField.label')
              } />
            <TextField
              id={'aaa-newRoundEnds'}
              onChange={this.changeEnds.bind(this)}
              hintText={t('assessment:newRound.endsTextField.hint')}
              floatingLabelText={t('assessment:newRound.endsTextField.label')} />
          </DialogContent>
          <DialogActions>
            <Button color="primary"
              keyboardFocused={true}
              onClick={this.handleSubmit.bind(this)}>
              {t('assessment:newRound.submit')}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withTranslation('assessment')(withStyles(styles)(NewAssessmentRound));
