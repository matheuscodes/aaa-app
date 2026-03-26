import React from 'react'

import Grid from '@mui/material/Grid';


class AboutAssessments extends React.Component {
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={4} >
          <div><img src='img/new_assessment.png' width={'100%'} alt="" /></div>
          <div style={{textAlign:'center'}}><img src='img/new_end.png' width={'50%'} alt="" /></div>
        </Grid>
        <Grid item xs={8} >
          <div><img src='img/assessments.png' width={'100%'} alt="" /></div>
          <div><img src='img/assessment_details.png' width={'100%'} alt="" /></div>
        </Grid>
      </Grid>
    );
  }
}

export default AboutAssessments;
