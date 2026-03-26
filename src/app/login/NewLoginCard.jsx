import React from 'react';
import { withRouter } from 'react-router'
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
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormGroup';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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
        messenger.showMessage(t('login:messages.createError'), 'ERROR');
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
    this.setState(current);
  }

  changeBirthYear(event) {
    let current = this.state;
    current.login.birthYear = event.target.value;
  }

  get passwordsMatch() {
    return this.state.login.credentials.password === this.state.confirmPassword
  }

  get checkedPassword() {
    return passwordCheck(this.state.login.credentials.password, this.props.t);
  }

  get canSubmit() {
    return this.state.login.credentials.password
          && this.state.login.credentials.email
          && this.state.login.name
          && this.state.login.birthYear
          && this.state.login.gender
          && !this.checkedPassword.error && this.passwordsMatch
          && this.state.termsConfirmation
  }

  toggleTermsConfirmation() {
    let current = this.state;
    current.termsConfirmation = !current.termsConfirmation;
    this.setState(current);
  }

  render() {
    const { t } = this.props;

    return (
      <Card>
        <CardContent>
          <FormControl>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <Typography style={{textAlign:"justify"}}>
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
                  {t('login:loginGenderSelectField.label')}
                </InputLabel>
                <Select fullWidth
                  labelId="aaa-loginGender"
                  id="aaa-loginGender"
                  value={this.state.login.gender ? this.state.login.gender : ""}
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
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={!!this.state.termsConfirmation} onChange={this.toggleTermsConfirmation.bind(this)} />}
                  label={
                    <Typography>
                      {t('login:termsConfirmation')+" "}
                      <Link underline="hover" href={RoutePaths.terms} target="_blank">{t('login:terms')}</Link>
                    </Typography>
                  }
                />
              </FormGroup>
            </Grid>
          </FormControl>
        </CardContent>
        <CardActions>
          <Button
            style={{width:'100%'}}
            color="primary"
            variant="contained"
            onClick={this.createNewLogin.bind(this)}
            endIcon={<ChevronRightIcon />}
            disabled={!this.canSubmit}>
            {t('login:newLoginButton.label')}
            </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withTranslation('login')(withRouter(NewLoginCard));
