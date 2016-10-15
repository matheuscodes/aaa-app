const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const PageSwitcher = require('app/common/PageSwitcher');
const Waiting = require('app/common/Waiting.jsx');
const Notice = require('app/common/Notice.jsx');

const BaseLayout = require('app/common/BaseLayout.jsx');
const NewSeasonCard = require('app/seasons/NewSeasonCard.jsx');
const SeasonTile = require('app/seasons/SeasonTile.jsx');

const SeasonsPage = React.createClass({
  propTypes: {
    switcher: React.PropTypes.instanceOf(PageSwitcher),
    userAgent: React.PropTypes.string,
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
        if (error instanceof ReferenceError) {
          if (error.message === 'Missing Token.') {
            this.props.switcher.switchTo('loginPage');
          }
        }
        this.showMessage(t('season:messages.listError'), "ERROR");
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
  hideMessage: function() {
    var current = this.state;
    current.message.open = false;
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
  render: function() {
    const t = this.props.t;
    var seasons;
    if (typeof this.state.seasons !== 'undefined') {
      seasons = this.state.seasons.map(function(season, index) {
        return (
          <MUI.GridTile
            key={'aaa-season_' + season.id} style={{padding: '5pt'}} cols={2} >
            <SeasonTile
              seasonId={season.id}
              data={season}
              readOnly={!this.state.seasonId}
              onDelete={this.deleteSeason}
              onEdit={this.editSeason} />
          </MUI.GridTile>
        );
      }, this);
    }

    var message = '';
    if (typeof this.state.message !== 'undefined') {
      message = (
        <Notice message={this.state.message} onClose={this.hideMessage} />
      );
    }

    var newSeasonButton = (
      <MUI.RaisedButton
        label={t('season:newSeason.button')}
        fullWidth={true}
        primary={true}
        onTouchTap={this.newSeason} />
    );

    var editSeason = '';
    if (this.state.editSeason) {
      editSeason = (
        <NewSeasonCard
          seasonId={this.state.seasonId}
          onClose={this.closeEdit} />
      );
    }

    return (
      <BaseLayout
        switcher={this.props.switcher}
        layoutName="seasonsPage"
        userAgent={this.props.userAgent}
        title={t('season:title')} >
        <MUI.GridList
          cellHeight={'unset'}
          cols={4}
          padding={10}
          style={{width: '100%'}} >
          <MUI.GridTile style={{padding: '5pt'}}
            cols={this.state.editSeason ? 2 : 4} >
            {(editSeason || newSeasonButton)}
          </MUI.GridTile>
          {(seasons || <Waiting />)}
        </MUI.GridList>
        {message}
      </BaseLayout>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['season'], SeasonsPage);
