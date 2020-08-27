import React from 'react'
import {Bar} from 'react-chartjs-2';
import { withRouter } from 'react-router'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import API from 'api'
import RoutePaths from 'global/RoutePaths'
import TrainerRequestTile from 'app/trainer/TrainerRequestTile'
import Waiting from 'app/common/Waiting';

const styles = { }

class TrainerRequestsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.updateContent();
  }

  getInitialState() {
    return {};
  }

  componentDidUpdate() {
    this.updateContent();
  }

  showMessage(message, type) {
    if(typeof this.props.messenger !== 'undefined'){
      this.props.messenger.showMessage(message, type);
    }
  }

  updateContent() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function(list) {
        this.setState({requests: list});
      },
      failure: function() {
        this.showMessage(t('trainer:requests.listError'), "ERROR");
        this.setState({requests: []});
      }
    };
    if(typeof this.state.requests === 'undefined'){
      API.trainers.getTrainerRequests(callbacks);
    }
  }

  rejectArcher(archer) {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function() {
        this.setState(this.getInitialState());
        this.updateContent();
      },
      failure: function() {
        this.showMessage(t('trainer:requests.rejectError'), "ERROR");
      }
    };
    API.trainers.deleteArcherToTrainer(archer, callbacks);
  }

  approveArcher(archer) {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function() {
        this.setState(this.getInitialState());
        this.updateContent();
      },
      failure: function() {
        this.showMessage(t('trainer:requests.approveError'), "ERROR");
      }
    };
    API.trainers.putArcherToTrainer(archer, callbacks);
  }

  render() {
    const { t } = this.props;
    let requests;
    if (typeof this.state.requests !== 'undefined') {
      requests = this.state.requests.map(function(request, index) {
        return (
          <Grid item
            key={'aaa-request_' + request.archerId}
            xs={12}
            lg={6} >
            <TrainerRequestTile
              data={request}
              onApprove={this.approveArcher.bind(this)}
              onReject={this.rejectArcher.bind(this)} />
          </Grid>
        );
      }, this);
    }
    return (
      <div style={{'backgroundColor':'white', padding:'10pt'}}>
        <Grid container spacing={2} >
          <Grid item xs={12} md={12} >
            <Card>
              <CardHeader
                title={t('trainer:requests.title')}
                subheader={t('trainer:requests.subtitle')} />
              <CardContent>
                <Grid container spacing={2}>
                  {(requests || <Grid item xs={12} ><Waiting /></Grid>)}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withTranslation('trainer')(withRouter(withStyles(styles)(TrainerRequestsPage)));
