import React from 'react'
import withRouter from 'global/withRouter'
import { withTranslation } from 'react-i18next'

import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';

import ReportCard from 'app/reports/ReportCard'

import API from 'api'


class TrainerReportsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pupils:[]}
  }

  componentDidMount() {
    this.updatePupils();
  }

  updatePupils() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function(list) {
        this.setState({pupils: list});
      },
      failure: function() {
        this.showMessage(t('trainer:reports.listPupilsError'), "ERROR");
        this.setState({pupils: []});
      }
    };
    API.trainers.getTrainerArchers(callbacks);
  }

  updateSeasons() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function(list) {
        this.setState({seasons: list});
      },
      failure: function() {
        this.showMessage(t('trainer:reports.listSeasonsError'), "ERROR");
      }
    };
    API.trainers.seasons.list(this.state.pupilId, callbacks);
  }

  changePupil(event) {
    var pupil = this.state.pupils[event.target.value];
    var current = this.state;
    current.selectedPupil = pupil;
    current.pupilId = pupil.archerId;
    this.setState(current);
    this.updateSeasons();
  }

  showMessage(message, type) {
    if(typeof this.props.messenger !== 'undefined'){
      this.props.messenger.showMessage(message, type);
    }
  }

  render() {
    const t = this.props.t;

    var pupils = this.state.pupils.map(function(pupil, index) {
      return (
        <MenuItem key={'aaa-reportPupil_' + index} value={index} >{pupil.name}</MenuItem>
      );
    });

    return (
      <div style={{'backgroundColor':'white', padding:'10pt'}}>
        <Card>
          <CardHeader
            title={t('trainer:report.cardTitle')}
            subheader={t('trainer:report.cardSubtitle')} />
          <CardContent>
            <Grid container spacing={2} >
              <Grid item xs={12} >
                <InputLabel htmlFor="aaa-reportPupil">
                  {t('trainer:report.pupilSelectField.label')}
                </InputLabel>
                <Select fullWidth
                  labelId="aaa-reportPupil"
                  id="aaa-reportPupil"
                  value={this.state.pupilId}
                  onChange={this.changePupil.bind(this)} >
                  {pupils}
                </Select>
              </Grid>
              <Grid item xs={12} >
                {this.state.seasons ? <ReportCard
                  messenger={this.props.messenger} 
                  pupilId={this.state.pupilId}
                  seasons={this.state.seasons} /> : ''}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withTranslation('common', 'trainer')(withRouter(TrainerReportsPage));
