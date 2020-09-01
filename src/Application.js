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
import AlertTitle from '@material-ui/lab/AlertTitle';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Footer from "app/common/Footer"
import Header from "app/common/Header"
import LoginPage from "app/login/LoginPage"
import SeasonsPage from "app/seasons/SeasonsPage"
import TrainingsPage from "app/trainings/TrainingsPage"
import AssessmentsPage from "app/assessments/AssessmentsPage"
import ReportsPage from "app/reports/ReportsPage"
import AboutPage from "app/static/AboutPage"
import TermsPage from "app/static/TermsPage"
import ForgottenPage from "app/login/ForgottenPage"
import NewLoginPage from "app/login/NewLoginPage"
import ConfirmLoginPage from "app/login/ConfirmLoginPage"
import HomePage from "app/homescreen/HomePage"
import SettingsPage from "app/settings/SettingsPage"
import TrainerRequestsPage from "app/trainer/TrainerRequestsPage"
import TrainerArchersPage from "app/trainer/TrainerArchersPage"
import TrainerReportsPage from "app/trainer/TrainerReportsPage"

import RoutePaths from 'global/RoutePaths'
import getLocalArcher from 'api/helpers/getLocalArcher'

const styles = {}

class Application extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      alarms: {},
      alarmCount: 0,
      cookieAccepted: this.cookieAccepted,
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

  handleCookieClose(event) {
    const state = this.state;
    document.cookie = "cookieTerms=accepted"
    state.cookieAccepted = this.cookieAccepted;
    this.setState(state);
  }

  get cookieAccepted() {
    return !(document.cookie && document.cookie.includes("cookieTerms=accepted"))
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
          <Route path={RoutePaths.login}>
            <Header title={t('login:appBarTitle')} archer={archer} />
            <LoginPage messenger={this} />
          </Route>
          <Route path={RoutePaths.home}>
            <Header title={t('home:appBarTitle')} archer={archer} />
            <HomePage messenger={this} />
          </Route>
          <Route path={RoutePaths.settings}>
            <Header title={t('settings:appBarTitle')} archer={archer} />
            <SettingsPage messenger={this} />
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
          <Route path={RoutePaths.forgotten}>
            <Header title={t('login:resetAppBarTitle')} archer={archer} />
            <ForgottenPage messenger={this} />
          </Route>
          <Route path={RoutePaths.newLogin}>
            <Header title={t('login:newLoginAppBarTitle')} archer={archer} />
            <NewLoginPage messenger={this} />
          </Route>
          <Route path={RoutePaths.confirmLogin}>
            <Header title={t('login:confirmLoginAppBarTitle')} archer={archer} />
            <ConfirmLoginPage messenger={this} />
          </Route>
          <Route path={RoutePaths.trainer.requests}>
            <Header title={t('login:trainerRequestsAppBarTitle')} archer={archer} />
            <TrainerRequestsPage messenger={this} />
          </Route>
          <Route path={RoutePaths.trainer.archers}>
            <Header title={t('login:trainerArchersAppBarTitle')} archer={archer} />
            <TrainerArchersPage messenger={this} />
          </Route>
          <Route path={RoutePaths.trainer.reports}>
            <Header title={t('login:trainerArchersAppBarTitle')} archer={archer} />
            <TrainerReportsPage messenger={this} />
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
          <Snackbar open={this.state.cookieAccepted}  style={{width:'90%', minWidth:'90%'}} >
            <Alert  severity="info" style={{width:'100%', minWidth:'100%'}}
                    action={
                      <Button color="inherit" size="small" onClick={this.handleCookieClose.bind(this)}>
                        OK
                      </Button>
                    }>
              <AlertTitle>{t("common:cookies.title")}</AlertTitle>
              <Typography>
                {t("common:cookies.message")} <a href={RoutePaths.terms}>{t("common:cookies.link")}</a>
              </Typography>
            </Alert>
          </Snackbar>
        <Footer />
      </Router>
    );
  }
}

export default withTranslation()(withStyles(styles)(Application));
