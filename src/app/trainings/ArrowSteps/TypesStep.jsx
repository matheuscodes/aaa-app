import React from 'react';
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

import ArrowTrainingTypes from 'constants/ArrowTrainingTypes';

const styles = {}

function TypesStep(props) {
  const { t } = props;
  return (
    <Step {...props}>
      <StepLabel>{t('training:newTraining.ArrowsSteps.TypesStep.title')}</StepLabel>
      <StepContent>
        <FormGroup>
          <Grid container>
            {ArrowTrainingTypes.map((type, index) => (
              <Grid item xs={6} key={index} >
                <FormControlLabel
                  control={<Checkbox checked={props.arrowTrainingTypes[type]} onChange={(event) => {
                    props.setArrowTrainingTypes({[type]:event.target.checked});
                  }} />}
                  label={
                    props.t(`training:arrowTrainingTypes.${type}`)
                  } />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      </StepContent>
    </Step>
  );
}
export default withTranslation('training')(withStyles(styles)(TypesStep));
