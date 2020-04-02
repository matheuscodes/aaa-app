import React from 'react'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {}

class AboutSeasons extends React.Component {
  render() {
    const t = this.props.t;
    return (
      <Grid container spacing={2} >
        <Grid item xs={4} >
          <div><img src='img/new_season.png' width={'100%'} /></div>
          <div><img src='img/new_season_created.png' width={'100%'} /></div>
        </Grid>
        <Grid item xs={8} >
          <div><img src='img/seasons.png' width={'100%'} /></div>
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation('common','about')(withStyles(styles)(AboutSeasons));
