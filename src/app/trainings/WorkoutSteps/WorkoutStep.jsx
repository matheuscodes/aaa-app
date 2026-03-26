import React from 'react';
import { withTranslation } from 'react-i18next'

import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';


function WorkoutStep(props) {
  const { t } = props;
  return (
    <Step {...props}>
      <StepLabel>{t('training:newTraining.WorkoutSteps.WorkoutStep.title')}</StepLabel>
      <StepContent>
        <div>
          <div>
            {props.t('training:newTraining.WorkoutSteps.comingSoon')}
          </div>
          <img src={'img/workout.png'} alt=""/>
        </div>
      </StepContent>
    </Step>
  );
}
export default withTranslation('training')(WorkoutStep);
