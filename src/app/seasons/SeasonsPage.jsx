'use strict';

var React = require('react');
var MUI = require('app/common/MaterialUI');
var API = require('api');

var Waiting = require('app/common/Waiting.jsx');
var Notice = require('app/common/Notice.jsx');

var BaseLayout = require('app/common/BaseLayout.jsx');
var NewSeasonCard = require('app/seasons/NewSeasonCard.jsx');
var SeasonTile = require('app/seasons/SeasonTile.jsx');

module.exports = React.createClass({
  updateSeasonsList: function() {
    var callbacks = {
      context: this,
      success: function(list) {
        var current = this.state;
        current.editSeason = false;
        current.seasonId ? delete current.seasonId : null;
        current.seasons = list;
        this.setState(current);
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
    }
    else {
      var current = this.state;
      current.editSeason = false;
      current.seasonId ? delete current.seasonId : null;
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
  hideMessage: function() {
    var current = this.state;
    current.message.open = false;
    this.setState(current);
  },
  deleteSeason: function(seasonId) {
    var callbacks = {
      context: this,
      success: function() {
        this.showMessage("Text[season deleted]", "MESSAGE");
        this.updateSeasonsList();
      },
      warning: function() {
        this.showMessage("Text[season deleted]", "WARNING");
      },
      error: function() {
        this.showMessage("Text[season not deleted]", "ERROR");
      }
    };
    API.seasons.delete(seasonId, callbacks);
  },
  render: function() {
    var seasons;
    if (typeof this.state.seasons !== 'undefined') {
      seasons = this.state.seasons.map(function(season, index) {
        return (
          <MUI.GridTile key={'aaa-season_' + season.id} style={{padding: '5pt'}} cols={2} >
            <SeasonTile seasonId={season.id} data={season} readOnly={this.state.seasonId ? false : true} onDelete={this.deleteSeason} onEdit={this.editSeason} />
          </MUI.GridTile>
        );
      }, this);
    }

    var seasonList = (
      <MUI.GridList cellHeight={'auto'} cols={2} padding={10} >
        {seasons ? seasons : <Waiting />}
      </MUI.GridList>
    );

    return (
      <BaseLayout switcher={this.props.switcher} layoutName="seasonsPage" userAgent={this.props.userAgent} languages={this.props.languages} title="Text[seasons]" >
        <MUI.GridList cellHeight={'unset'} cols={4} padding={10} style={{width: '100%'}} >
          <MUI.GridTile style={{padding: '5pt'}}
            cols={this.state.editSeason ? 2 : 4} >
            {this.state.editSeason ? <NewSeasonCard seasonId={this.state.seasonId} onClose={this.closeEdit} /> : <MUI.RaisedButton label="Text[new season]" fullWidth={true} primary={true} onTouchTap={this.newSeason} /> }
          </MUI.GridTile>
          {this.state.editSeason ? seasonList : (seasons ? seasons : <Waiting />)}
        </MUI.GridList>
        {this.state.message ? <Notice message={this.state.message} onClose={this.hideMessage}/> : null}
      </BaseLayout>
    );
  }
});
