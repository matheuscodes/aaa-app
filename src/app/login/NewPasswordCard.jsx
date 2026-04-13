import React from 'react';
import withRouter from 'global/withRouter'
import { withTranslation } from 'react-i18next'
import RoutePaths from 'global/RoutePaths'


import API from 'api';
import passwordCheck from 'global/passwordCheck';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Grid from '@mui/material/Grid';

class NewPasswordCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {login: { credentials: {email:props.email, token:props.token}}};
  }

  createNewLogin() {
    const {t, messenger} = this.props;
    let callbacks = {
      context: this,
      success: function(request) {
        messenger.showMessage(t('login:messages.newLogin'), 'SUCCESS');
        this.doLogin();
      },
      error: function(request) {
        messenger.showMessage(t('login:messages.resetError'), 'ERROR');
      },
    };
    API.replaceLogin(this.state.login.credentials, callbacks);
  }

  doLogin() {
    const {t, messenger} = this.props;
    let callbacks = {
      context: this,
      success: function(request) {
        messenger.showMessage(t('login:messages.login'), 'SUCCESS');
        this.props.history.push(RoutePaths.home);
      },
      error: function(request) {
        messenger.showMessage(t('login:messages.loginError'), 'ERROR');
      },
    };
    API.login(this.state.login.credentials, callbacks);
  }

  changePassword(event) {
    let current = this.state;
    current.login.credentials.password = event.target.value;
    this.setState(current);
  }

  changeConfirmPassword(event) {
    let current = this.state;
    current.confirmPassword = event.target.value;
    this.setState(current);
  }

  get passwordsMatch() {
    return this.state.login.credentials.password === this.state.confirmPassword
  }

  get checkedPassword() {
    return passwordCheck(this.state.login.credentials.password, this.props.t);
  }

  get canSubmit() {
    return this.state.login.credentials.password && !this.checkedPassword.error && this.passwordsMatch
  }

  render() {
    const { t } = this.props;

    return (
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography>
                <p style={{textAlign:"justify"}}>{t('login:changePasswordInstructionText')}</p>
              </Typography>
            </Grid>
            <Grid size={12}>
              <TextField
                style={{width:'100%'}}
                id={'aaa-loginPassword'}
                onChange={this.changePassword.bind(this)}
                type={'password'}
                helperText={this.checkedPassword.text}
                error={this.checkedPassword.error}
                label={t('login:passwordTextField.label')} />
            </Grid>
            <Grid size={12}>
              <TextField
                style={{width:'100%'}}
                id={'aaa-loginConfirmPassword'}
                onChange={this.changeConfirmPassword.bind(this)}
                type={'password'}
                helperText={this.state.confirmPassword ? !this.passwordsMatch ? t('login:confirmPasswordTextField.errorMatch') : undefined : undefined}
                error={this.state.confirmPassword ? !this.passwordsMatch : false}
                label={t('login:confirmPasswordTextField.label')} />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            style={{width:'100%'}}
            color="primary"
            variant="contained"
            onClick={this.createNewLogin.bind(this)}
            endIcon={<ChevronRightIcon />}
            disabled={!this.canSubmit}>
            {t('login:changePassword.label')}
            </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withTranslation('login')(withRouter(NewPasswordCard));
