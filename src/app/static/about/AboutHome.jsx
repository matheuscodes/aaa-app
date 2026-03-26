import React from 'react'

import Grid from '@mui/material/Grid';


class AboutHome extends React.Component {
  render() {
    return (
      <Grid container spacing={2} >
        <Grid item xs={6} >
          <div><img src='img/home_ring_distribution.png' width={'100%'} alt="" /></div>
        </Grid>
        <Grid item xs={6} >
          <div><img src='img/home_year_overview.png' width={'100%'} alt="" /></div>
        </Grid>
      </Grid>
    );
  }
}

export default AboutHome;
