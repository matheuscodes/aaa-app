import React from 'react';
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

const styles = {}

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
export default withTranslation('training')(withStyles(styles)(NeurobicsStep));
