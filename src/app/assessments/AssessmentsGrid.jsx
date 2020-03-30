import React from 'react';

import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Waiting from 'app/common/Waiting';
import AssessmentTile from 'app/assessments/AssessmentTile';

const styles = {}

function AssessmentsGrid(props) {
  return (
    <Grid container>
      {
        props.assessments ?
          props.assessments.map((assessment, index) => {
            return (
              <Grid item key={`aaa-assessment_${assessment.date}`} xs={3} >
                <AssessmentTile
                  data={assessment}
                  onDelete={props.deleteAssessment} />
              </Grid>
            );
          }) : <Grid item xs={12} ><Waiting /></Grid>
      }
    </Grid>
  );
}

export default withTranslation('assessment')(withStyles(styles)(AssessmentsGrid));
