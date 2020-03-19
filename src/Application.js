import Alert from '@material-ui/lab/Alert';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import A3Footer from "app/common/Footer"
import A3LoginPage from "app/login/LoginPage"

import React, { Suspense } from 'react';

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <div>Loading...</div>
  </div>
);

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
    return (
      <Router>
        <Suspense fallback={<Loader />}>
          <div style={{'backgroundColor':'white', padding:'10pt'}}>
            <Switch>
              <Route exact path="/">
                <A3LoginPage messenger={this}/>
              </Route>
              <Route path="/about">
                <p>About</p>
              </Route>
              <Route path="/login">
                <A3LoginPage messenger={this} />
              </Route>
            </Switch>
            {Object.keys(this.state.alarms).map((alarm) =>
              <Alert style={{margin:'10pt'}} severity={this.state.alarms[alarm].type.toLowerCase()}>
                {this.state.alarms[alarm].text}
              </Alert>)}
          </div>
          <A3Footer />
        </Suspense>
      </Router>
    );
  }
}

export default Application;
