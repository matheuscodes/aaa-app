import React from 'react';
import Alert from '@material-ui/lab/Alert';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';

import Footer from "app/common/Footer"
import Header from "app/common/Header"
import LoginPage from "app/login/LoginPage"

import RoutePaths from 'global/RoutePaths'
import getLocalArcher from 'api/helpers/getLocalArcher'

const styles = {}

class Application extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      alarms: {},
      alarmCount: 0,
    }
  }

  showMessage(message, type) {
    console.log(message, type)
    const alarm = this.state.alarmCount++;
    this.state.alarms[alarm] = {
      text: message,
      type: type,
    };
    this.setState(this.state)
    setTimeout(this.closeAlarm.bind(this),2000,alarm)
  }

  closeAlarm(alarm) {
    delete this.state.alarms[alarm];
    this.setState(this.state);
  }

  render() {
    const { t } = this.props;
    const archer = getLocalArcher();
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Header title={t('login:appBarTitle')} archer={archer} />
            <LoginPage messenger={this}/>
          </Route>
          <Route path={RoutePaths.home}>
            <Header title={t('home:appBarTitle')} archer={archer} />
            <div style={{'backgroundColor':'white', padding:'10pt'}}>
              <p>Homepage</p>
            </div>
          </Route>
          <Route path={RoutePaths.login}>
            <Header title={t('login:appBarTitle')} archer={archer} />
            <LoginPage messenger={this} />
          </Route>
          <Redirect from='*' to='/' />
        </Switch>
        <div style={{'backgroundColor':'white', padding:'10pt'}}>
          {Object.keys(this.state.alarms).map((alarm) =>
            <Alert style={{margin:'10pt'}} severity={this.state.alarms[alarm].type.toLowerCase()}>
              {this.state.alarms[alarm].text}
            </Alert>)}
        </div>
        <Footer />
      </Router>
    );
  }
}

export default withTranslation()(withStyles(styles)(Application));
