import React from 'react'

import Grid from '@mui/material/Grid';


class AboutSeasons extends React.Component {
  render() {
    return (
      <Grid container spacing={2} >
        <Grid size={4}>
          <div><img src='img/new_season.png' width={'100%'} alt="" /></div>
          <div><img src='img/new_season_created.png' width={'100%'} alt="" /></div>
        </Grid>
        <Grid size={8}>
          <div><img src='img/seasons.png' width={'100%'} alt="" /></div>
        </Grid>
      </Grid>
    );
  }
}

export default AboutSeasons;
