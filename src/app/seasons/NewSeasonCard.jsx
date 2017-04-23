const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const NewSeasonForm = require('app/seasons/NewSeasonForm');
const Waiting = require('app/common/Waiting');

import Season from 'model/Season';

const NewSeasonCard = React.createClass({
  propTypes: {
    seasonId: React.PropTypes.number,
    onRequestClose: React.PropTypes.func,
    t: React.PropTypes.func
  },
  getInitialState: function() {
    return {equipment: []};
  },
  componentDidMount: function() {
    this.updateContent();
  },
  componentDidUpdate: function(prevProps) {
    if(this.props.seasonId !== prevProps.seasonId){
      this.updateContent();
    }
  },
  updateContent: function() {
    if (typeof this.props.seasonId === 'undefined') {
      API.equipment.getList(this, function(list) {
        this.setState({equipment: list, season: new Season()});
      });
    } else {
      var callbacks = {
        context: this,
        success: function(season) {
          API.equipment.getList(this, function(list) {
            this.setState({equipment: list, season: season});
          });
        }
      };
      API.seasons.getById(this.props.seasonId, callbacks);
      this.state.season = null;
      this.setState(this.state);
    }
  },
  submitSeason: function() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function() {
        this.showMessage(t('season:messages.newSaved'), "MESSAGE");
        this.handleClose(true);
      },
      warning: function() {
        this.showMessage(t('season:messages.newSaved'), "WARNING");
      },
      error: function() {
        this.showMessage(t('season:messages.newError'), "ERROR");
      }
    };
    API.seasons.save(this.state.season, callbacks);
  },
  handleClose: function(refresh) {
    const initial = this.getInitialState();
    this.setState(initial);
    this.props.onRequestClose(refresh);
  },
  showMessage: function(message, type) {
    if(typeof this.props.messenger !== 'undefined'){
      this.props.messenger.sendMessage({
        text: message,
        open: true,
        type: type
      });
    }
  },
  render: function() {
    const t = this.props.t;

    const actions = [];

    actions.push(
      <MUI.FloatingActionButton
        mini={true} secondary={true}
        style={{margin: 5}}
        onTouchTap={this.handleClose}>
        <MUI.icons.navigation.cancel />
      </MUI.FloatingActionButton>
    );

    actions.push(
      <MUI.FloatingActionButton
        style={{margin: 5}}
        onTouchTap={this.submitSeason} >
        <MUI.icons.action.backup />
      </MUI.FloatingActionButton>
    );

    return (
      <MUI.Dialog
          title={t('season:newSeason.title')}
          autoDetectWindowHeight={true}
          contentStyle={{width:'100%', maxWidth: 'none'}}
          modal={false}
          actions={actions}
          open={this.props.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}>
        <div>
          <h5>{t('season:newSeason.subtitle')}</h5>
          {this.state.season ?
            <NewSeasonForm
              equipment={this.state.equipment}
              season={this.state.season} /> : <Waiting />}
        </div>
      </MUI.Dialog>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['season'], NewSeasonCard);
