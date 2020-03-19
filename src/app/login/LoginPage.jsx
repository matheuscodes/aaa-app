import React from 'react';
import { withRouter } from 'react-router'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';

import MessageablePage from 'components/MessageablePage';
import LoginCard from 'app/login/LoginCard';
import LogoName from 'svg/LogoName';
import Grid from '@material-ui/core/Grid';

const styles = {}

class LoginPageStyle {
  get card() {
    return {
      padding: this.styleProvider.select({
        phone: `${this.defaultPadding}`,
        tablet: `${this.defaultPadding} ${this.styleProvider.percent(15)}`,
        desktop: `${this.defaultPadding} ${this.styleProvider.percent(30)}`,
      }),
    }
  }

  get logo() {
    return {
      height: this.styleProvider.select({
        phone: this.styleProvider.percent(20),
        tablet: this.styleProvider.percent(14),
        desktop: this.styleProvider.percent(8),
      }),
      width: '100%',
      padding: '12px',
    }
  }
}


class LoginPage extends MessageablePage {

  constructor(props) {
    super(props);
    this.style = new LoginPageStyle(this.props.styleProvider);
    this.state = {};
  }

  render() {
    const { messenger } = this.props;
    return (
      <div>
        <Grid justify="center" container>
          <Grid item xs={12} sm={6} lg={3}>
            <LogoName />
          </Grid>
          <Grid justify="center" container>
            <Grid item xs={12} sm={6} lg={3}>
              <LoginCard messenger={messenger} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withTranslation('login')(withRouter(withStyles(styles)(LoginPage)));
