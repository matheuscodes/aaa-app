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
import NewTrainerDialog from 'app/settings/NewTrainerDialog'

const styles = { }

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {newTrainer:false};
  }

  newTrainer() {
    this.setState({newTrainer:true});
  }

  closeNewTrainer() {
    this.setState({newTrainer:false});
  }

  render() {
    const { t } = this.props;
    return (
      <div style={{'backgroundColor':'white', padding:'10pt'}}>
        <Grid container spacing={2} >
          <Grid item xs={12} md={12} >
            <Card>
              <CardHeader
                title={t('settings:trainer.title')}
                subheader={t('settings:trainer.subtitle')} />
              <CardContent>
                <Button
                  style={{marginBottom:'10pt'}}
                  fullWidth={true}
                  color="primary"
                  variant="contained"
                  onClick={this.newTrainer.bind(this)} >
                  {t('settings:trainer.newTrainerButton')}
                </Button>
                {this.newTrainer ?
                  <NewTrainerDialog
                    messenger={this.props.messenger}
                    open={this.state.newTrainer}
                    onRequestClose={this.closeNewTrainer.bind(this)} /> : ""}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withTranslation('settings')(withRouter(withStyles(styles)(SettingsPage)));
