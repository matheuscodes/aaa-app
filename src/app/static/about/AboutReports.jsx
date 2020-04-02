import React from 'react'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {}

class AboutReports extends React.Component {
  render() {
    const t = this.props.t;
    return (
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <div><img src='img/report.png' width={'100%'} /></div>
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation('common','about')(withStyles(styles)(AboutReports));
