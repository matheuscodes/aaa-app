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
import TrainerArcherTile from 'app/trainer/TrainerArcherTile'
import Waiting from 'app/common/Waiting';

const styles = { }

class TrainerArchersPage extends React.Component {
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
        this.setState({archers: list});
      },
      failure: function() {
        this.showMessage(t('trainer:archers.listError'), "ERROR");
        this.setState({archers: []});
      }
    };
    if(typeof this.state.archers === 'undefined'){
      API.trainers.getTrainerArchers(callbacks);
    }
  }

  render() {
    const { t } = this.props;
    let archers;
    if (typeof this.state.archers !== 'undefined') {
      archers = this.state.archers.map(function(archer, index) {
        return (
          <Grid item
            key={'aaa-request_' + archer.archerId}
            xs={12}
            lg={12} >
            <TrainerArcherTile
              data={archer}
              messenger={this.props.messenger}/>
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
                title={t('trainer:archers.title')}
                subheader={t('trainer:archers.subtitle')} />
              <CardContent>
                <Grid container spacing={2}>
                  {(archers || <Grid item xs={12} ><Waiting /></Grid>)}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withTranslation('trainer')(withRouter(withStyles(styles)(TrainerArchersPage)));
