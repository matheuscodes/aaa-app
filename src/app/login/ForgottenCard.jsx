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

const styles = {
  instructionText: {textAlign:"justify"}
}


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
    const { t, classes } = this.props;

    return (
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={12} >
              <Typography>
                <p className={classes.instructionText}>{ !this.state.reset ? t('login:forgottenInstructionText') : t('login:forgottenConfirmationText') }</p>
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

export default withTranslation('login')(withRouter(withStyles(styles)(ForgottenCard)));
