import React from 'react';
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

const styles = {}

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
          <img src={'img/workout.png'} />
        </div>
      </StepContent>
    </Step>
  );
}
export default withTranslation('training')(withStyles(styles)(WorkoutStep));
