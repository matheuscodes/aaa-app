import React from 'react';
import withRouter from 'global/withRouter'
import { withTranslation } from 'react-i18next'


import API from 'api';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Grid from '@mui/material/Grid';


class ForgottenCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {login: {}};
  }

  doReset() {
    const {t, messenger} = this.props;
    let callbacks = {
      context: this,
      success: function(request) {
        messenger.showMessage(t('login:messages.reset'), 'SUCCESS');
        const newstate = this.state;
        newstate.reset = true;
        this.setState(newstate);
      },
      error: function(request) {
        messenger.showMessage(t('login:messages.loginError'), 'ERROR');
      },
    };
    API.reset(this.state.login, callbacks);
  }

  changeEmail(event) {
    let current = this.state;
    current.login.email = event.target.value;
  }

  render() {
    const { t } = this.props;

    return (
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={12} >
              <Typography>
                <p style={{textAlign:"justify"}}>{ !this.state.reset ? t('login:forgottenInstructionText') : t('login:forgottenConfirmationText') }</p>
              </Typography>
            </Grid>
            {!this.state.reset ? <Grid item xs={12} >
              <TextField
                style={{width:'100%'}}
                id={'aaa-loginEmail'}
                onChange={this.changeEmail.bind(this)}
                label={t('login:emailTextField.label')} />
            </Grid> : ''}
          </Grid>
        </CardContent>
        <CardActions>
          { !this.state.reset ?<Button
            style={{width:'100%'}}
            color="primary"
            variant="contained"
            onClick={this.doReset.bind(this)}
            endIcon={<ChevronRightIcon />}>
            {t('login:forgottenButton.label')}
            </Button> : "" }
        </CardActions>
      </Card>
    );
  }
}

export default withTranslation('login')(withRouter(ForgottenCard));
