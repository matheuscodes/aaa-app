import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {}

class AboutReports extends React.Component {
  render() {
    return (
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <div><img src='img/report.png' width={'100%'} alt="" /></div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AboutReports);
