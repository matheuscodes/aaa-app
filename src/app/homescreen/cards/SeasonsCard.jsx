import React from 'react'

import i18nextReact from 'global/i18nextReact'
import MUI from 'app/common/MaterialUI'
import API from 'api'

import SeasonTile from 'app/seasons/SeasonTile'
import Waiting from 'app/common/Waiting'
import RoutePaths from 'global/RoutePaths'

const SeasonsCard = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    var callbacks = {
      context: this,
      success: function(list) {
        var current = this.state;
        current.seasons = list;
        this.setState(current);
      },
      error: function(error){
        if(API.isAuthError(error)){
          this.props.history.push(RoutePaths.login);
        }
      },
    };
    API.seasons.getActive(callbacks);
  },
  render: function() {
    const t = this.props.t;
    var seasons;
    if (typeof this.state.seasons !== 'undefined') {
      seasons = this.state.seasons.map(function(season, index) {
        return (
          <MUI.GridTile
            key={'aaa-season_' + season.id} style={MUI.styles.GridTile} cols={2} >
            <SeasonTile
              seasonId={season.id}
              data={season}
              readOnly={true} />
          </MUI.GridTile>
        );
      }, this);
    }
    return (
      <MUI.Card>
        <MUI.CardHeader
          title={t('home:seasons.title')}
          subtitle={t('home:seasons.subtitle')} />
        <MUI.CardText>
          <MUI.GridList
            cellHeight={'auto'}
            cols={2}
            padding={10}
            style={{width: '100%'}} >
            {(seasons || <Waiting />)}
          </MUI.GridList>
        </MUI.CardText>
      </MUI.Card>
    );
  }
});

export default i18nextReact.setupTranslation(['home', 'season'], SeasonsCard);
