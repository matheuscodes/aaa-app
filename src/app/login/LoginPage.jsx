import React from 'react';
import withRouter from 'global/withRouter'
import { withTranslation } from 'react-i18next'


import LoginCard from 'app/login/LoginCard';
import LogoName from 'svg/LogoName';
import Grid from '@mui/material/Grid';


class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { messenger } = this.props;
    return (
      <div style={{'backgroundColor':'white', padding:'10pt'}}>
        <Grid justifyContent="center" container>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <LogoName />
          </Grid>
          <Grid justifyContent="center" container>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <LoginCard messenger={messenger} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withTranslation('login')(withRouter(LoginPage));
