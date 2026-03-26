import React from 'react';
import { withTranslation } from 'react-i18next'

import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FloatingActionButton from '@mui/material/Fab';
import Icon from '@mui/material/Icon';


class DistancesStep extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  createNewDistances(){
    if (typeof this.state.newDistances === 'undefined' ||
        this.state.newDistances === '') {
      this.props.messenger.showMessage(
        this.props.t('training:messages.emptyError'),
        "ERROR"
      );
      return;
    } else {
      const distances = [];
      let error = false;
      this.state.newDistances.split(',').forEach(string => {
          const number = string.replace('m','').replace('M','').trim();
          const distance = parseFloat(number);
          if(!number.match('^[0-9]*$') || isNaN(distance)) {
            this.props.messenger.showMessage(
              this.props.t('training:messages.notANumberError'),
              "ERROR"
            );
            error = true;
          } else {
            distances.push(distance);
          }
      });
      if(!error && distances.length > 0){
        distances.forEach(distance => {
          this.props.setArrowDistances({[distance]:true});
        });
        this.setState(this.state);
      }
    }
  }

  changeNewDistances(event) {
    this.state.newDistances = event.target.value;
  }

  render(){
    const { t } = this.props;
    return (
      <Step {...this.props}>
        <StepLabel>{t('training:newTraining.ArrowsSteps.DistancesStep.title')}</StepLabel>
        <StepContent>
          <FormGroup>
            <Grid container>
              {
                Object.keys(this.props.arrowDistances).map((distance, index) => (
                  <Grid item xs={4} key={index} >
                    <FormControlLabel
                      control={<Checkbox checked={this.props.arrowDistances[distance]} onChange={(event) => {
                        this.props.setArrowDistances({[distance]:event.target.checked});
                      }} />}
                      label={`${distance}m`} />
                  </Grid>
                ))
              }
              <Grid item container>
                <Grid item xs={4}>
                  <TextField fullWidth
                    id="newTrainingCardNewDistance"
                    onChange={this.changeNewDistances.bind(this)}
                    hintText={t('training:newTraining.distanceTextField.hint')}
                    label={t('training:newTraining.distanceTextField.label')} />
                </Grid>
                <Grid item xs={4}>
                  <FloatingActionButton
                    onClick={this.createNewDistances.bind(this)} >
                    <Icon>add_box</Icon>
                  </FloatingActionButton>
                </Grid>
              </Grid>
            </Grid>
          </FormGroup>
        </StepContent>
      </Step>
    );
  }
}

export default withTranslation('training')(DistancesStep);
