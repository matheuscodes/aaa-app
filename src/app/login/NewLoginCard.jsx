import React from 'react';
import { withRouter } from 'react-router'
import { withTranslation } from 'react-i18next'
import RoutePaths from 'global/RoutePaths'

import { withStyles } from '@material-ui/core/styles';

import API from 'api';
import downloadFile from 'api/helpers/DownloadFile';
import getLocalArcher from 'api/helpers/getLocalArcher';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {}

class NewLoginCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {login: { credentials: {}}};
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
        messenger.showMessage(t('login:messages.loginError'), 'ERROR');
      },
    };
    API.newLogin(this.state.login, callbacks);
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

  changeEmail(event) {
    let current = this.state;
    current.login.credentials.email = event.target.value;
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

  changeFullName(event) {
    let current = this.state;
    current.login.name = event.target.value;
  }

  changeGender(event) {
    let current = this.state;
    current.login.gender = event.target.value;
  }

  changeBirthYear(event) {
    let current = this.state;
    current.login.birthYear = event.target.value;
  }

  get passwordsMatch() {
    return this.state.login.credentials.password === this.state.confirmPassword
  }

  render() {
    const { t } = this.props;

    return (
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <Typography>
                { !this.state.reset ? t('login:newLoginInstructionText') : t('login:newLoginConfirmationText') }
              </Typography>
            </Grid>
            <Grid item xs={12} >
              <TextField
                style={{width:'100%'}}
                id={'aaa-loginFullName'}
                onChange={this.changeFullName.bind(this)}
                label={t('login:fullNameTextField.label')} />
            </Grid>
            <Grid item xs={12} >
              <TextField
                style={{width:'100%'}}
                id={'aaa-loginEmail'}
                onChange={this.changeEmail.bind(this)}
                label={t('login:emailTextField.label')} />
            </Grid>
            <Grid item xs={6} >
              <TextField
                style={{width:'100%'}}
                id={'aaa-loginBirthYear'}
                onChange={this.changeBirthYear.bind(this)}
                label={t('login:birthYearTextField.label')} />
            </Grid>
            <Grid item xs={6} >
              <InputLabel htmlFor="aaa-loginGender">
                {t('report:loginGenderSelectField.label')}
              </InputLabel>
              <Select fullWidth
                labelId="aaa-loginGender"
                id="aaa-loginGender"
                value={this.state.login.gender}
                onChange={this.changeGender.bind(this)} >
                <MenuItem value="male" >{t('login:genderMenuItem.male')}</MenuItem>
                <MenuItem value="female" >{t('login:genderMenuItem.female')}</MenuItem>
                <MenuItem value="other" >{t('login:genderMenuItem.other')}</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} >
              <TextField
                style={{width:'100%'}}
                id={'aaa-loginPassword'}
                onChange={this.changePassword.bind(this)}
                type={'password'}
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
            endIcon={<ChevronRightIcon />}>
            {t('login:newLoginButton.label')}
            </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withTranslation('login')(withRouter(withStyles(styles)(NewLoginCard)));
