import React from 'react';
import withRouter from 'global/withRouter'
import { withTranslation } from 'react-i18next'


import NewLoginCard from 'app/login/NewLoginCard';
import LogoName from 'svg/LogoName';
import Grid from '@mui/material/Grid';


class NewLoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { messenger } = this.props;
    return (
      <div style={{'backgroundColor':'white', padding:'10pt'}}>
        <Grid size={12} sx={{justifyContent: 'center'}} container>
          <Grid size={12} sx={{justifyContent: 'center'}} container>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <LogoName />
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} container>
            <Grid size={12}>
              <NewLoginCard messenger={messenger} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withTranslation('login')(withRouter(NewLoginPage));
