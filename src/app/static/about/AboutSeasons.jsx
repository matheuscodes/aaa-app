import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {}

class AboutSeasons extends React.Component {
  render() {
    return (
      <Grid container spacing={2} >
        <Grid item xs={4} >
          <div><img src='img/new_season.png' width={'100%'} alt="" /></div>
          <div><img src='img/new_season_created.png' width={'100%'} alt="" /></div>
        </Grid>
        <Grid item xs={8} >
          <div><img src='img/seasons.png' width={'100%'} alt="" /></div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AboutSeasons);
