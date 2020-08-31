import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ReportCard from 'app/reports/ReportCard'

import API from 'api'

const styles = { }

class TrainerReportsPage extends React.Component {
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
            <ReportCard seasons={this.state.seasons}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TrainerReportsPage);
