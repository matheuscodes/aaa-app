import React from 'react';
import { withTranslation } from 'react-i18next'

import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';


function NeurobicsStep(props) {
  const { t } = props;
  return (
    <Step {...props}>
      <StepLabel>{t('training:newTraining.NeurobicsSteps.NeurobicsStep.title')}</StepLabel>
      <StepContent>
        <div>
          <div>
            {props.t('training:newTraining.NeurobicsSteps.comingSoon')}
          </div>
          <img src={'img/neurobics.png'} alt=""/>
        </div>
      </StepContent>
    </Step>
  );
}
export default withTranslation('training')(NeurobicsStep);
