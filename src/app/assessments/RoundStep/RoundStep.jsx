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
  return (
      <Step {...props}>
        <StepLabel>
          {props.t('assessment:newAssessment.baseStep.title')}
        </StepLabel>
        <StepContent>
          <Grid container>
            <Grid item xs={6} >
              <NewAssessmentEnd
                roundIndex={props.index}
                addEnd={props.addEnd} />
            </Grid>
            <Grid item xs={6} >
              <NewAssessmentRound
                roundIndex={props.index}
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
