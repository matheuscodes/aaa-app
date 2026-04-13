import React from 'react'
import {Bar} from 'react-chartjs-2';
import withRouter from 'global/withRouter'
import { withTranslation } from 'react-i18next'

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

import API from 'api'
import RoutePaths from 'global/RoutePaths'
import NewTrainerDialog from 'app/settings/NewTrainerDialog'


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
          <Grid size={{ xs: 12, md: 12 }}>
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

export default withTranslation('settings')(withRouter(SettingsPage));
