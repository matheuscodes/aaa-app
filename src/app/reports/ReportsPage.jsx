import React from 'react'
import { withRouter } from 'react-router'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ReportCard from 'app/reports/ReportCard'

const styles = { }

class ReportsPage extends React.Component {
  render() {
    return (
      <div style={{'backgroundColor':'white', padding:'10pt'}}>
        <Grid container spacing={2} >
          <Grid item xs={12} >
            <ReportCard />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ReportsPage);
