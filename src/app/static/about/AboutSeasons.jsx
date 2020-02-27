import React from 'react'

import i18nextReact from 'global/i18nextReact'
import MUI from 'app/common/MaterialUI'

const styles = {
  gridList: {
    width: '100%'
  }
};

const AboutSeasons = React.createClass({
  propTypes: {
    t: React.PropTypes.func.isRequired
  },
  render: function() {
    const t = this.props.t;
    return (
      <MUI.GridList style={styles.gridList} cellHeight={'auto'} cols={8} padding={10} >
        <MUI.GridTile style={MUI.styles.GridTile} cols={3} >
          <div><img src='img/new_season.png' width={'100%'} /></div>
          <div><img src='img/new_season_created.png' width={'100%'} /></div>
        </MUI.GridTile>
        <MUI.GridTile style={MUI.styles.GridTile} cols={5} >
          <div><img src='img/seasons.png' width={'100%'} /></div>
        </MUI.GridTile>
      </MUI.GridList>
    );
  }
});

export default i18nextReact.setupTranslation(['common','about'], AboutSeasons);
