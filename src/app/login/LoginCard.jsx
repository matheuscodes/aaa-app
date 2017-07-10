const React = require('react');

const MUI = require('app/common/MaterialUI');
const API = require('api');
const i18nextReact = require('global/i18nextReact');

const downloadFile = require('api/helpers/DownloadFile');

const Notice = require('app/common/Notice');
const PageSwitcher = require('app/common/PageSwitcher');
const getLocalArcher = require('api/helpers/getLocalArcher');

import { Style } from 'global/StyleProvider';

class LoginCardStyle extends Style {
  get cardWidth() {
    return this.styleProvider.select({
      phone: this.styleProvider.percent(100),
      tablet: this.styleProvider.percent(50),
      desktop: this.styleProvider.percent(100/3),
    });
  }

  get loginButton() {
    return {
      width: '100%',
      fontSize: `${this.baseFontsize * 1.1}px`,
      lineHeight: `${this.baseLineHeight * 1.5}px`,
      height: `${this.baseLineHeight * 1.5}px`,
    }
  }

  get loginIcon() {
    return {
      height: `${this.baseLineHeight * 1.5}px`,
      width: `${this.baseLineHeight * 1.5}px`,
    }
  }

  get loginButtonContainer() {
    return {
      margin: 0,
      padding: `${0.1 * this.defaultPadding}px 0`,
    }
  }

  archeryImage(background) {
    return {
      height:`${6 * this.baseLineHeight}px`,
      width: '100%',
      background,
    }
  }

  get CardTitle() {
    return {
      height: `${this.baseLineHeight}px`,
      titleStyle: {
        fontSize: `${0.75 * this.baseFontsize}px`,
        lineHeight: `${0.75 * this.baseLineHeight}px`,
      },
      subtitleStyle: {
        fontSize: `${0.5 * this.baseFontsize}px`,
        lineHeight: `${0.5 * this.baseLineHeight}px`,
      },
    }
  }
}

const LoginCard = React.createClass({
  propTypes: {
    switcher: React.PropTypes.instanceOf(PageSwitcher),
    t: React.PropTypes.func
  },
  getInitialState: function() {
    this.style = new LoginCardStyle(this.props.styleProvider);
    return {login: {}};
  },
  componentDidMount: function() {
    const selected = Math.floor(Math.random() * 17);
    var callbacks = {
      context: this,
      200: function(request) {
        var current = this.state;
        current.image = selected;
        current.imageData = JSON.parse(request.responseText);
        this.setState(current);
      },
      failure: function(request) {
        // TODO handle me
        console.log("ERROR DOWNLOADING IMAGE INFO", request);
      }
    };
    if(typeof getLocalArcher() === 'undefined'){
      downloadFile('img/' + selected + '.json', callbacks);
    } else {
      this.props.switcher.switchTo('homePage');
    }
  },
  doLogin: function() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function(request) {
        this.showMessage(t('login:messages.login'), 'MESSAGE');
        this.props.switcher.switchTo('homePage');
      },
      error: function(request) {
        this.showMessage(t('login:messages.loginError'), 'ERROR');
      }
    };
    API.login(this.state.login, callbacks);
  },
  showMessage: function(message, type) {
    var current = this.state;
    current.message = {
      text: message,
      open: true,
      type: type
    };
    this.setState(current);
  },
  hideMessage: function() {
    var current = this.state;
    current.message.open = false;
    this.setState(current);
  },
  changeEmail: function(event) {
    var current = this.state;
    current.login.email = event.target.value;
  },
  changePassword: function(event) {
    var current = this.state;
    current.login.password = event.target.value;
  },
  render: function() {
    const t = this.props.t;

    var subtitle = '';
    if (typeof this.state.imageData !== 'undefined') {
      subtitle = t('login:photoSubtitle', this.state.imageData);
    }

    var title = '';
    if (typeof this.state.imageData !== 'undefined' &&
       typeof this.state.imageData.title !== 'undefined') {
      title = (<a
        style={{color: 'inherit', textDecoration: 'none'}}
        href={this.state.imageData.source}>
        {this.state.imageData.title}
      </a>);
    }

    var background = '';
    if (typeof this.state.image !== 'undefined') {
      background = ['url("img/',
                    this.state.image,
                    '.jpg") center / cover'].join('');
    }

    var message = '';
    if (typeof this.state.message !== 'undefined') {
      message = (
        <Notice message={this.state.message} onClose={this.hideMessage} />
      );
    }

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
          <MUI.GridList cellHeight={this.style.TextField.height} cols={1} padding={5} >
            <MUI.GridTile cols={1} >
              <MUI.TextField
                style={this.style.TextField}
                inputStyle={this.style.TextField.inputStyle}
                errorStyle={this.style.TextField.errorStyle}
                hintStyle={this.style.TextField.hintStyle}
                floatingLabelStyle={this.style.TextField.floatingLabelStyle}
                underlineStyle={this.style.TextField.underlineStyle}
                floatingLabelShrinkStyle={this.style.TextField.floatingLabelShrinkStyle}
                id={'aaa-loginEmail'}
                onChange={this.changeEmail}
                hintText={t('login:emailTextField.hint')}
                floatingLabelText={t('login:emailTextField.label')} />
            </MUI.GridTile>
            <MUI.GridTile cols={1} >
              <MUI.TextField
                style={this.style.TextField}
                inputStyle={this.style.TextField.inputStyle}
                errorStyle={this.style.TextField.errorStyle}
                hintStyle={this.style.TextField.hintStyle}
                floatingLabelStyle={this.style.TextField.floatingLabelStyle}
                floatingLabelShrinkStyle={this.style.TextField.floatingLabelShrinkStyle}
                id={'aaa-loginPassword'}
                onChange={this.changePassword}
                type='password'
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
        {message}
      </MUI.Card>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['login'], LoginCard);
