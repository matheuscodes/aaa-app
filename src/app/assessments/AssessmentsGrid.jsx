import React from 'react';

import { withTranslation } from 'react-i18next'

import Grid from '@mui/material/Grid';

import Waiting from 'app/common/Waiting';
import AssessmentTile from 'app/assessments/AssessmentTile';


function AssessmentsGrid(props) {
  return (
    <Grid container spacing={2}>
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

export default withTranslation('assessment')(AssessmentsGrid);
