import React from 'react'
import { withRouter } from 'react-router'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import API from 'api'
import RoutePaths from 'global/RoutePaths'

import Waiting from 'app/common/Waiting'

import NewSeasonCard from 'app/seasons/NewSeasonCard'
import SeasonTile from 'app/seasons/SeasonTile'

const styles = {}

class SeasonsPage extends React.Component {
  updateSeasonsList() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function(list) {
        var current = this.state;
        current.editSeason = false;
        delete current.seasonId;
        current.seasons = list;
        this.setState(current);
      },
      error: function(error) {
        this.showMessage(t('season:messages.listError'), "ERROR");
        if(API.isAuthError(error)){
          this.props.history.push(RoutePaths.login)
        }
      }
    };
    API.seasons.getList(callbacks);
  }
  constructor (props) {
    super(props);
    this.state = {editSeason: false};
  }
  componentDidMount() {
    this.updateSeasonsList();
  }
  closeEdit(refresh) {
    if (refresh) {
      this.updateSeasonsList();
    } else {
      var current = this.state;
      current.editSeason = false;
      delete current.seasonId;
      this.setState(current);
    }
  }
  editSeason(seasonId) {
    var current = this.state;
    current.editSeason = true;
    current.seasonId = seasonId;
    this.setState(current);
  }
  newSeason() {
    var current = this.state;
    current.editSeason = true;
    this.setState(current);
  }
  deleteSeason(seasonId) {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function() {
        this.showMessage(t('season:messages.deleted'), "MESSAGE");
        this.updateSeasonsList();
      },
      warning: function() {
        this.showMessage(t('season:messages.deleted'), "WARNING");
      },
      error: function() {
        this.showMessage(t('season:messages.deletedError'), "ERROR");
      }
    };
    API.seasons.delete(seasonId, callbacks);
  }
  showMessage(message, type) {
    if(typeof this.props.messenger !== 'undefined'){
      this.props.messenger.showMessage(message, type);
    }
  }
  subscribe(sender) {
    this.messenger = sender;
  }
  render() {
    const t = this.props.t;
    var seasons;
    if (typeof this.state.seasons !== 'undefined') {
      seasons = this.state.seasons.map(function(season, index) {
        console.log(season)
        return (
          <Grid item
            key={'aaa-season_' + season.id}
            xs={12}
            lg={6} >
            <SeasonTile
              seasonId={season.id}
              data={season}
              onDelete={this.deleteSeason.bind(this)}
              onEdit={this.editSeason.bind(this)} />
          </Grid>
        );
      }, this);
    }
    return (
      <div style={{'backgroundColor':'white', padding:'10pt'}}>
        <Button
          style={{marginBottom:'10pt'}}
          fullWidth={true}
          color="primary"
          variant="contained"
          onClick={this.newSeason.bind(this)} >
          {t('season:newSeason.button')}
        </Button>
        <Grid container spacing={2}>
          {(seasons || <Grid item xs={12} ><Waiting /></Grid>)}
        </Grid>
        <NewSeasonCard
          messenger={this.props.messenger}
          seasonId={this.state.seasonId}
          open={this.state.editSeason}
          onRequestClose={this.closeEdit.bind(this)} />
      </div>
    );
  }
};

export default withTranslation('season')(withRouter(withStyles(styles)(SeasonsPage)));
