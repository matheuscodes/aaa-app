import React from 'react'

import Grid from '@mui/material/Grid';


class AboutTrainings extends React.Component {
  render() {
    return (
      <Grid container spacing={2}>
        <Grid size={4}>
          <div><img src='img/new_training.png' width={'100%'} alt="" /></div>
        </Grid>
        <Grid size={8}>
          <div><img src='img/trainings.png' width={'100%'} alt="" /></div>
        </Grid>
      </Grid>
    );
  }
}

export default AboutTrainings;
