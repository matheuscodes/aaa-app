import React from 'react';
import withRouter from 'global/withRouter'
import { withTranslation } from 'react-i18next'


import ForgottenCard from 'app/login/ForgottenCard';
import NewPasswordCard from 'app/login/NewPasswordCard';
import LogoName from 'svg/LogoName';
import Grid from '@mui/material/Grid';


class ForgottenPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { messenger, location} = this.props;
    const extract = location.search ? location.search.match(/token=([^=]*)&email=([^=]*)/) : null;
    const email = extract ? extract[2] : undefined;
    const token = extract ? extract[1] : undefined;

    return (
      <div style={{'backgroundColor':'white', padding:'10pt'}}>
        <Grid justifyContent="center" container>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <LogoName />
          </Grid>
          <Grid justifyContent="center" container>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              { email && token ? <NewPasswordCard messenger={messenger} token={token} email={email}/> :
                  <ForgottenCard messenger={messenger} />
              }
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withTranslation('login')(withRouter(ForgottenPage));
