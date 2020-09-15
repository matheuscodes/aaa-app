import React from 'react';

import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Grid from '@material-ui/core/Grid';

import NewAssessmentEnd from 'app/assessments/RoundStep/NewAssessmentEnd';
import NewAssessmentRound from 'app/assessments/RoundStep/NewAssessmentRound';
import AssessmentArrowTable from 'app/assessments/AssessmentArrowTable';

const styles = {}

function RoundStep(props) {
  const { t } = props;
  return (
      <Step {...props}>
        <StepLabel>
          {`${t('assessment:newAssessment.roundStep.title')} ${props.roundIndex + 1}`}
        </StepLabel>
        <StepContent>
          <Grid container spacing={2}>
            <Grid item xs={6} >
              <NewAssessmentEnd
                roundIndex={props.roundIndex}
                addEnd={props.addEnd} />
            </Grid>
            <Grid item xs={6} >
              <NewAssessmentRound
                roundIndex={props.roundIndex}
                addRound={props.addRound} />
            </Grid>
            <Grid item xs={12}>
              <AssessmentArrowTable
                data={props.round}
                deleteEnd={props.deleteEnd} />
            </Grid>
          </Grid>
        </StepContent>
      </Step>
  );
}

export default withTranslation('assessment')(withStyles(styles)(RoundStep));
