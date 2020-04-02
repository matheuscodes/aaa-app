import React from 'react'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {}

class AboutHome extends React.Component {
  render() {
    const t = this.props.t;
    return (
      <Grid container spacing={2} >
        <Grid item xs={2} >
          <div><img src='img/home_counts.png' width={'100%'} /></div>
        </Grid>
        <Grid item xs={2} >
          <div><img src='img/home_ring_distribution.png' width={'100%'} /></div>
        </Grid>
        <Grid item xs={3} >
          <div><img src='img/home_end_overview.png' width={'100%'} /></div>
        </Grid>
        <Grid item xs={2} >
          <div><img src='img/home_events.png' width={'100%'} /></div>
        </Grid>
        <Grid item xs={3} >
          <div><img src='img/home_year_overview.png' width={'100%'} /></div>
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation('common','about')(withStyles(styles)(AboutHome));
