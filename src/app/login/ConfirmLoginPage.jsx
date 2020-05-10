import React from 'react';
import { withRouter } from 'react-router'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';

import NewLoginCard from 'app/login/NewLoginCard';
import LogoName from 'svg/LogoName';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import RoutePaths from 'global/RoutePaths'
import API from 'api';

const styles = {}

class ConfirmLoginPage extends React.Component {

  constructor(props) {
    super(props);
    const {t, location} = this.props;
    this.state = {
      title: () => t('login:confirmation.waiting.title'),
      message: () => t('login:confirmation.waiting.message'),
    };
    let callbacks = {
      context: this,
      success: function(request) {
        this.setState({
          title: () => t('login:confirmation.success.title'),
          message: () => t('login:confirmation.success.message'),
        });
      },
      error: function(request) {
        this.setState({
          title: t('login:confirmation.failure.title'),
          message: t('login:confirmation.failure.message'),
        });
      },
    };
    API.confirm(location.search, callbacks);
  }

  render() {
    return (
      <div style={{'backgroundColor':'white', padding:'10pt'}}>
        <Grid justify="center" container>
          <Grid item xs={12} sm={6} lg={3}>
            <LogoName />
          </Grid>
          <Grid justify="center" container>
            <Grid item xs={12} sm={6} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h4">{this.state.title()}</Typography>
                <Typography>{this.state.message()}</Typography>
              </CardContent>
            </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withTranslation('login')(withRouter(withStyles(styles)(ConfirmLoginPage)));
