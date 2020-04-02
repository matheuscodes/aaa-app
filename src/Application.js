import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import Footer from "app/common/Footer"
import Header from "app/common/Header"
import LoginPage from "app/login/LoginPage"
import SeasonsPage from "app/seasons/SeasonsPage"
import TrainingsPage from "app/trainings/TrainingsPage"
import AssessmentsPage from "app/assessments/AssessmentsPage"
import ReportsPage from "app/reports/ReportsPage"
import AboutPage from "app/static/AboutPage"
import TermsPage from "app/static/TermsPage"

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
  }

  handleAlarmClose(alarm) {
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
          <Route path={RoutePaths.seasons}>
            <Header title={t('season:appBarTitle')} archer={archer} />
            <SeasonsPage messenger={this} />
          </Route>
          <Route path={RoutePaths.trainings}>
            <Header title={t('training:appBarTitle')} archer={archer} />
            <TrainingsPage messenger={this} />
          </Route>
          <Route path={RoutePaths.assessments}>
            <Header title={t('assessment:appBarTitle')} archer={archer} />
            <AssessmentsPage messenger={this} />
          </Route>
          <Route path={RoutePaths.reports}>
            <Header title={t('report:appBarTitle')} archer={archer} />
            <ReportsPage messenger={this} />
          </Route>
          <Route path={RoutePaths.about}>
            <Header title={t('about:appBarTitle')} archer={archer} />
            <AboutPage messenger={this} />
          </Route>
          <Route path={RoutePaths.terms}>
            <Header title={t('terms:appBarTitle')} archer={archer} />
            <TermsPage messenger={this} />
          </Route>
          <Redirect from='*' to='/' />
        </Switch>
        <div style={{'backgroundColor':'white', padding:'10pt'}}>
          {Object.keys(this.state.alarms).map((alarm) =>
            <Snackbar open={alarm} autoHideDuration={6000} onClose={this.handleAlarmClose.bind(this,alarm)}>
              <Alert elevation={6} variant="filled" style={{margin:'10pt'}} severity={this.state.alarms[alarm].type.toLowerCase()}>
                {this.state.alarms[alarm].text}
              </Alert>
            </Snackbar>)}
        </div>
        <Footer />
      </Router>
    );
  }
}

export default withTranslation()(withStyles(styles)(Application));
