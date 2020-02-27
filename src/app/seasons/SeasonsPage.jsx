import React from 'react'

import i18nextReact from 'global/i18nextReact'
import MUI from 'app/common/MaterialUI'
import API from 'api'

import PageSwitcher from 'app/common/PageSwitcher'
import Waiting from 'app/common/Waiting'
import Notice from 'app/common/Notice'

import BaseLayout from 'app/common/BaseLayout'
import NewSeasonCard from 'app/seasons/NewSeasonCard'
import SeasonTile from 'app/seasons/SeasonTile'

const SeasonsPage = React.createClass({
  propTypes: {
    switcher: React.PropTypes.instanceOf(PageSwitcher),
    userAgent: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.bool]).isRequired,
    t: React.PropTypes.func
  },
  updateSeasonsList: function() {
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
          this.props.switcher.switchTo('loginPage');
        }
      }
    };
    API.seasons.getList(callbacks);
  },
  getInitialState: function() {
    return {editSeason: false};
  },
  componentDidMount: function() {
    this.updateSeasonsList();
  },
  closeEdit: function(refresh) {
    if (refresh) {
      this.updateSeasonsList();
    } else {
      var current = this.state;
      current.editSeason = false;
      delete current.seasonId;
      this.setState(current);
    }
  },
  editSeason: function(seasonId) {
    var current = this.state;
    current.editSeason = true;
    current.seasonId = seasonId;
    this.setState(current);
  },
  newSeason: function() {
    var current = this.state;
    current.editSeason = true;
    this.setState(current);
  },
  showMessage: function(message, type) {
    var current = this.state;
    current.message = {
      text: message,
      open: true,
      type: type
    };
    this.setState(current);
  },
  deleteSeason: function(seasonId) {
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
  },
  showMessage: function(message, type) {
    if(typeof this.messenger !== 'undefined'){
      this.messenger.sendMessage({
        text: message,
        open: true,
        type: type
      });
    }
  },
  subscribe: function(sender) {
    this.messenger = sender;
  },
  render: function() {
    const t = this.props.t;
    var seasons;
    if (typeof this.state.seasons !== 'undefined') {
      seasons = this.state.seasons.map(function(season, index) {
        return (
          <MUI.GridTile
            key={'aaa-season_' + season.id}
            style={MUI.styles.GridTile}
            cols={2} >
            <SeasonTile
              seasonId={season.id}
              data={season}
              onDelete={this.deleteSeason}
              onEdit={this.editSeason} />
          </MUI.GridTile>
        );
      }, this);
    }

    return (
      <BaseLayout
        switcher={this.props.switcher}
        layoutName="seasonsPage"
        userAgent={this.props.userAgent}
        styleProvider={this.props.styleProvider}
        messageSubscriber={this}
        title={t('season:appBarTitle')} >
        <MUI.GridList
          cellHeight={'auto'}
          cols={4}
          padding={10}
          style={{width: '100%'}} >
          <MUI.GridTile cols={4} style={MUI.styles.GridTile} >
            <MUI.RaisedButton
              label={t('season:newSeason.button')}
              fullWidth={true}
              primary={true}
              onTouchTap={this.newSeason} />
          </MUI.GridTile>
          {(seasons || <MUI.GridTile cols={4} ><Waiting /></MUI.GridTile>)}
        </MUI.GridList>
        <NewSeasonCard
          messenger={this.messenger}
          seasonId={this.state.seasonId}
          open={this.state.editSeason}
          onRequestClose={this.closeEdit} />
      </BaseLayout>
    );
  }
});

export default i18nextReact.setupTranslation(['season'], SeasonsPage);
