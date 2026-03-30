import React from 'react'

import { withStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import ReportCard from 'app/reports/ReportCard'

import API from 'api'

const styles = { }

class ReportsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {seasons:[]}
  }

  componentDidMount() {
    var callbacks = {
      context: this,
      success: function(seasons) {
        var current = this.state;
        current.seasons = seasons;
        this.setState(current);
      },
      error: console.log,
    };
    API.seasons.getList(callbacks);
  }

  render() {
    return (
      <div style={{'backgroundColor':'white', padding:'10pt'}}>
        <Grid container spacing={2} >
          <Grid item xs={12} >
              <ReportCard seasons={this.state.seasons} messenger={this.props.messenger} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ReportsPage);
