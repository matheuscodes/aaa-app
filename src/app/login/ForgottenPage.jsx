import React from 'react';
import { withRouter } from 'react-router'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';

import ForgottenCard from 'app/login/ForgottenCard';
import NewPasswordCard from 'app/login/NewPasswordCard';
import LogoName from 'svg/LogoName';
import Grid from '@material-ui/core/Grid';

import RoutePaths from 'global/RoutePaths'
const styles = {}

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
        <Grid justify="center" container>
          <Grid item xs={12} sm={6} lg={3}>
            <LogoName />
          </Grid>
          <Grid justify="center" container>
            <Grid item xs={12} sm={6} lg={3}>
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

export default withTranslation('login')(withRouter(withStyles(styles)(ForgottenPage)));
