import React from 'react'

import Grid from '@mui/material/Grid';


class AboutReports extends React.Component {
  render() {
    return (
      <Grid container spacing={2} >
        <Grid size={12}>
          <div><img src='img/report.png' width={'100%'} alt="" /></div>
        </Grid>
      </Grid>
    );
  }
}

export default AboutReports;
