const React = require('react');

const MUI = require('app/common/MaterialUI');
const API = require('api');
const i18nextReact = require('global/i18nextReact');

const downloadFile = require('api/helpers/DownloadFile');

const Notice = require('app/common/Notice.jsx');
const PageSwitcher = require('app/common/PageSwitcher');

const LoginCard = React.createClass({
  propTypes: {
    switcher: React.PropTypes.instanceOf(PageSwitcher),
    t: React.PropTypes.func
  },
  getInitialState: function() {
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
        console.log("ERROR", request);
      }
    };
    downloadFile('img/' + selected + '.json', callbacks);
  },
  doLogin: function() {
    var callbacks = {
      context: this,
      success: function(request) {
        this.showMessage('Text [login succeeded]', 'MESSAGE');
        this.props.switcher.switchTo('loginPage');
      },
      error: function(request) {
        this.showMessage('Text [login failed]', 'ERROR');
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
          overlay={ <MUI.CardTitle title={title} subtitle={subtitle} /> } >
          <div style={{height: 300, width: '100%', background}} />
        </MUI.CardMedia>
        <MUI.CardText>
          <MUI.GridList cellHeight={'auto'} cols={1} padding={10} >
            <MUI.GridTile style={{padding: '5pt'}} cols={1} >
              <MUI.TextField
                style={{width: '100%'}}
                id={'aaa-loginEmail'}
                onChange={this.changeEmail}
                hintText={t('login:emailTextField.hint')}
                floatingLabelText={t('login:emailTextField.label')} />
            </MUI.GridTile>
            <MUI.GridTile style={{padding: '5pt'}} cols={1} >
              <MUI.TextField
                style={{width: '100%'}}
                id={'aaa-loginPassword'}
                onChange={this.changePassword}
                hintText={t('login:passwordTextField.hint')}
                floatingLabelText={t('login:passwordTextField.label')} />
            </MUI.GridTile>
          </MUI.GridList>
        </MUI.CardText>
        <MUI.CardActions>
          <MUI.RaisedButton
            style={{width: '100%'}}
            label={t('login:loginButton.label')}
            labelPosition="before"
            primary={true}
            onTouchTap={this.doLogin}
            icon={<MUI.icons.navigation.chevron_right />} />
        </MUI.CardActions>
        {message}
      </MUI.Card>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['login'], LoginCard);
