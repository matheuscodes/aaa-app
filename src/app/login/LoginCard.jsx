import React from 'react';
import { withRouter } from 'react-router'
import { withTranslation } from 'react-i18next'
import RoutePaths from 'global/RoutePaths'

import { withStyles } from '@material-ui/core/styles';

import API from 'api';
import downloadFile from 'api/helpers/DownloadFile';
import getLocalArcher from 'api/helpers/getLocalArcher';

import LoginCardStyle from 'app/login/LoginCard.style';
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

const styles = {}

class LoginCard extends React.Component {

  constructor(props) {
    super(props);
    this.style = new LoginCardStyle(this.props.styleProvider);
    this.state = {login: {}};
  }

  componentDidMount() {
    const selected = Math.floor(Math.random() * 17);
    let callbacks = {
      context: this,
      200: function(request) {
        let current = this.state;
        current.image = selected;
        try{
          current.imageData = JSON.parse(request.responseText);
          this.setState(current);
        } catch(e) {
          console.log(e)
        }

      },
      failure: function(request) {
        // TODO handle me
        console.log('ERROR DOWNLOADING IMAGE INFO', request);
      },
    };
    if (typeof getLocalArcher() === 'undefined') {
      downloadFile('img/' + selected + '.json', callbacks);
    } else {
      this.props.history.push(RoutePaths.home);
    }
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
    API.login(this.state.login, callbacks);
  }

  changeEmail(event) {
    let current = this.state;
    current.login.email = event.target.value;
  }

  changePassword(event) {
    let current = this.state;
    current.login.password = event.target.value;
  }

  render() {
    const t = this.props.t;

    const subtitle = this.state.imageData ?
                     t('login:photoSubtitle', this.state.imageData) : '';

    let title = '';
    if (typeof this.state.imageData !== 'undefined' &&
        typeof this.state.imageData.title !== 'undefined') {
      title = (
        <a href={this.state.imageData.source}>
          {this.state.imageData.title}
        </a>
      );
    }

    return (
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={`/img/${this.state.image}.jpg`}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography style={{fontSize:'10pt'}}>
              {title}
            </Typography>
            <Typography style={{fontSize:'7pt'}}>
              {subtitle}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardContent>
          <Grid container>
            <Grid item xs={12} >
              <TextField
                style={{width:'100%'}}
                id={'aaa-loginEmail'}
                onChange={this.changeEmail.bind(this)}
                label={t('login:emailTextField.label')} />
            </Grid>
            <Grid item xs={12} >
              <TextField
                style={{width:'100%'}}
                id={'aaa-loginPassword'}
                onChange={this.changePassword.bind(this)}
                type={'password'}
                label={t('login:passwordTextField.label')} />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            style={{width:'100%'}}
            color="primary"
            variant="contained"
            onClick={this.doLogin.bind(this)}
            endIcon={<ChevronRightIcon />}>
            {t('login:loginButton.label')}
            </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withTranslation('login')(withRouter(withStyles(styles)(LoginCard)));
