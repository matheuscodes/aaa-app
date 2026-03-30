import React from 'react';
import { withTranslation } from 'react-i18next'

import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';

import ArrowTrainingTypes from 'constants/ArrowTrainingTypes';


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
export default withTranslation('training')(TypesStep);
