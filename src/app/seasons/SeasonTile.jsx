import React from 'react'

import i18nextReact from 'global/i18nextReact'
import MUI from 'app/common/MaterialUI'

import Waiting from 'app/common/Waiting'
import SeasonGraph from 'svg/SeasonGraph'

import API from 'api'

const SeasonTile = React.createClass({
  propTypes: {
    // TODO create class to validate
    data: React.PropTypes.object,
    seasonId: React.PropTypes.number,
    onEdit: React.PropTypes.func,
    onDelete: React.PropTypes.func,
    t: React.PropTypes.func
  },
  getInitialState: function() {
    return this.props.data; // TODO maybe remove this?
  },
  componentWillReceiveProps: function() {
    var callbacks = {
      context: this,
      success: function(season) {
        this.setState(season);
      }
    };
    API.seasons.getById(this.props.seasonId, callbacks);
  },
  onDelete: function() {
    this.props.onDelete(this.props.seasonId);
  },
  onEdit: function() {
    this.props.onEdit(this.props.seasonId);
  },
  getCardActions: function() {
    return (
      <MUI.CardActions style={{textAlign: 'right'}}>
        <MUI.FloatingActionButton
          mini={true}
          onTouchTap={this.onEdit}
          style={{margin: '5pt'}}>
          <MUI.icons.editor.mode_edit />
        </MUI.FloatingActionButton>
        <MUI.FloatingActionButton
          mini={true}
          onTouchTap={this.onDelete}
          secondary={true} style={{margin: '5pt'}}>
          <MUI.icons.action.delete />
        </MUI.FloatingActionButton>
      </MUI.CardActions>
    );
  },
  render: function() {
    const t = this.props.t;

    return (
      <MUI.Paper zDepth={1}>
        <MUI.Card>
          <MUI.CardHeader
            title={this.state.name}
            subtitle={t('season:tile.subtitle', this.state)} />
          <MUI.CardText>
            {this.state.goals ? <SeasonGraph data={this.state} events={this.state.events} /> : <Waiting />}
          </MUI.CardText>
          {this.props.readOnly ? '' : this.getCardActions()}
        </MUI.Card>
      </MUI.Paper>
    );
  }
});

export default i18nextReact.setupTranslation(['season'], SeasonTile);
