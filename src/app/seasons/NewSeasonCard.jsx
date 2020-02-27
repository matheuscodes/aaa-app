import React from 'react'

import i18nextReact from 'global/i18nextReact'
import MUI from 'app/common/MaterialUI'
import API from 'api'

import NewSeasonForm from 'app/seasons/NewSeasonForm'
import Waiting from 'app/common/Waiting'

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
      success: function(response) {
        if(!this.state.season.id){
          //FIXME for pete's sake... remove this and do it properly.
          const seasonId = parseInt(response.responseText,10);
          Object.keys(this.state.season.permissions).forEach(trainerId => {
            if(this.state.season.permissions[trainerId]){
              API.seasons.permit(seasonId,trainerId,{
                context:this,
                success:() => {},
                warning:() => {},
                error:() => {}
              });
            }
          },this);
        }
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
              messenger={this.props.messenger}
              equipment={this.state.equipment}
              season={this.state.season} /> : <Waiting />}
        </div>
      </MUI.Dialog>
    );
  }
});

export default i18nextReact.setupTranslation(['season'], NewSeasonCard);
