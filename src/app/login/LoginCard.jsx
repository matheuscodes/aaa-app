import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

import MUI from 'app/common/MaterialUI';

import API from 'api';
import downloadFile from 'api/helpers/DownloadFile';
import getLocalArcher from 'api/helpers/getLocalArcher';

import i18nextReact from 'global/i18nextReact';
import pageSwitcherType from 'global/ReactPageSwitcherType';
import LoginCardStyle from 'app/login/LoginCard.style';
import TextField from 'components/TextField';

@autobind
class LoginCard extends React.Component {
  static get propTypes() {
    return {
      switcher: pageSwitcherType,
      styleProvider: PropTypes.object,
      messenger: PropTypes.object,
      t: PropTypes.func,
    };
  }

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
        current.imageData = JSON.parse(request.responseText);
        this.setState(current);
      },
      failure: function(request) {
        // TODO handle me
        console.log('ERROR DOWNLOADING IMAGE INFO', request);
      },
    };
    if (typeof getLocalArcher() === 'undefined') {
      downloadFile('img/' + selected + '.json', callbacks);
    } else {
      this.props.switcher.switchTo('homePage');
    }
  }

  doLogin() {
    const {t, messenger, switcher} = this.props;
    let callbacks = {
      context: this,
      success: function(request) {
        messenger.showMessage(t('login:messages.login'), 'MESSAGE');
        switcher.switchTo('homePage');
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
      title = (<a
        style={{color: 'inherit', textDecoration: 'none'}}
        href={this.state.imageData.source}>
        {this.state.imageData.title}
      </a>);
    }

    const background = this.state.image ?
                        `url("img/${this.state.image}.jpg") center / cover` :
                        '';

    return (
      <MUI.Card>
        <MUI.CardMedia
          overlay={
            <MUI.CardTitle
              style={this.style.CardTitle}
              titleStyle={this.style.CardTitle.titleStyle}
              subtitleStyle={this.style.CardTitle.subtitleStyle}
              title={title}
              subtitle={subtitle} /> } >
          <div style={this.style.archeryImage(background)} />
        </MUI.CardMedia>
        <MUI.CardText>
          <MUI.GridList
            cellHeight={'auto'}
            cols={1}
            padding={this.style.defaultPadding} >
            <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
              <TextField
                style={this.style}
                id={'aaa-loginEmail'}
                onChange={this.changeEmail}
                hintText={t('login:emailTextField.hint')}
                floatingLabelText={t('login:emailTextField.label')} />
            </MUI.GridTile>
            <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
              <TextField
                style={this.style}
                id={'aaa-loginPassword'}
                onChange={this.changePassword}
                type={'password'}
                hintText={t('login:passwordTextField.hint')}
                floatingLabelText={t('login:passwordTextField.label')} />
            </MUI.GridTile>
          </MUI.GridList>
        </MUI.CardText>
        <MUI.CardActions>
          <div style={this.style.loginButtonContainer}>
            <MUI.RaisedButton
              style={this.style.loginButton}
              buttonStyle={this.style.loginButton}
              labelStyle={this.style.loginButton}
              label={t('login:loginButton.label')}
              labelPosition="before"
              primary={true}
              type={'submit'}
              onTouchTap={this.doLogin}
              icon={<MUI.icons.navigation.chevron_right
                      style={this.style.loginIcon } />} />
          </div>
        </MUI.CardActions>
      </MUI.Card>
    );
  }
}

export default i18nextReact.setupTranslation(['login'], LoginCard);
