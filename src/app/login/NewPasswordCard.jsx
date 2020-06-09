import React from 'react';
import { withRouter } from 'react-router'
import { withTranslation } from 'react-i18next'
import RoutePaths from 'global/RoutePaths'

import { withStyles } from '@material-ui/core/styles';

import API from 'api';
import passwordCheck from 'global/passwordCheck';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Grid from '@material-ui/core/Grid';

const styles = {
  instructionText: {textAlign:"justify"}
}

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
    const { t, classes } = this.props;

    return (
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <Typography>
                <p className={classes.instructionText}>{t('login:changePasswordInstructionText')}</p>
              </Typography>
            </Grid>
            <Grid item xs={12} >
              <TextField
                style={{width:'100%'}}
                id={'aaa-loginPassword'}
                onChange={this.changePassword.bind(this)}
                type={'password'}
                helperText={this.checkedPassword.text}
                error={this.checkedPassword.error}
                label={t('login:passwordTextField.label')} />
            </Grid>
            <Grid item xs={12} >
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

export default withTranslation('login')(withRouter(withStyles(styles)(NewPasswordCard)));
