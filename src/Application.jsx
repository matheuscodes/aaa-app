import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { withTranslation } from 'react-i18next'

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
        <Routes>
          <Route path="/" element={<><Header title={t('login:appBarTitle')} archer={archer} /><LoginPage messenger={this}/></>} />
          <Route path={RoutePaths.login} element={<><Header title={t('login:appBarTitle')} archer={archer} /><LoginPage messenger={this} /></>} />
          <Route path={RoutePaths.home} element={<><Header title={t('home:appBarTitle')} archer={archer} /><HomePage messenger={this} /></>} />
          <Route path={RoutePaths.settings} element={<><Header title={t('settings:appBarTitle')} archer={archer} /><SettingsPage messenger={this} /></>} />
          <Route path={RoutePaths.seasons} element={<><Header title={t('season:appBarTitle')} archer={archer} /><SeasonsPage messenger={this} /></>} />
          <Route path={RoutePaths.trainings} element={<><Header title={t('training:appBarTitle')} archer={archer} /><TrainingsPage messenger={this} /></>} />
          <Route path={RoutePaths.assessments} element={<><Header title={t('assessment:appBarTitle')} archer={archer} /><AssessmentsPage messenger={this} /></>} />
          <Route path={RoutePaths.reports} element={<><Header title={t('report:appBarTitle')} archer={archer} /><ReportsPage messenger={this} /></>} />
          <Route path={RoutePaths.about} element={<><Header title={t('about:appBarTitle')} archer={archer} /><AboutPage messenger={this} /></>} />
          <Route path={RoutePaths.terms} element={<><Header title={t('terms:appBarTitle')} archer={archer} /><TermsPage messenger={this} /></>} />
          <Route path={RoutePaths.forgotten} element={<><Header title={t('login:resetAppBarTitle')} archer={archer} /><ForgottenPage messenger={this} /></>} />
          <Route path={RoutePaths.newLogin} element={<><Header title={t('login:newLoginAppBarTitle')} archer={archer} /><NewLoginPage messenger={this} /></>} />
          <Route path={RoutePaths.confirmLogin} element={<><Header title={t('login:confirmLoginAppBarTitle')} archer={archer} /><ConfirmLoginPage messenger={this} /></>} />
          <Route path={RoutePaths.trainer.requests} element={<><Header title={t('trainer:trainerRequestsAppBarTitle')} archer={archer} /><TrainerRequestsPage messenger={this} /></>} />
          <Route path={RoutePaths.trainer.archers} element={<><Header title={t('trainer:trainerArchersAppBarTitle')} archer={archer} /><TrainerArchersPage messenger={this} /></>} />
          <Route path={RoutePaths.trainer.reports} element={<><Header title={t('trainer:trainerReportsAppBarTitle')} archer={archer} /><TrainerReportsPage messenger={this} /></>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <div style={{'backgroundColor':'white', padding:'10pt'}}>
          {Object.keys(this.state.alarms).map((alarm) =>
            <Snackbar key={alarm} open={alarm} autoHideDuration={6000} onClose={this.handleAlarmClose.bind(this,alarm)}>
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

export default withTranslation()(Application);
