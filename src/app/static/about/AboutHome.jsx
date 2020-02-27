import React from 'react'

import i18nextReact from 'global/i18nextReact'
import MUI from 'app/common/MaterialUI'

const styles = {
  gridList: {
    width: '100%'
  }
};

const AboutHome = React.createClass({
  propTypes: {
    t: React.PropTypes.func.isRequired
  },
  render: function() {
    const t = this.props.t;
    return (
      <MUI.GridList style={styles.gridList} cellHeight={'auto'} cols={13} padding={10} >
        <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
          <div><img src='img/home_counts.png' width={'100%'} /></div>
        </MUI.GridTile>
        <MUI.GridTile style={MUI.styles.GridTile} cols={3} >
          <div><img src='img/home_ring_distribution.png' width={'100%'} /></div>
        </MUI.GridTile>
        <MUI.GridTile style={MUI.styles.GridTile} cols={3} >
          <div><img src='img/home_end_overview.png' width={'100%'} /></div>
        </MUI.GridTile>
        <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
          <div><img src='img/home_events.png' width={'100%'} /></div>
        </MUI.GridTile>
        <MUI.GridTile style={MUI.styles.GridTile} cols={3} >
          <div><img src='img/home_year_overview.png' width={'100%'} /></div>
        </MUI.GridTile>
      </MUI.GridList>
    );
  }
});

export default i18nextReact.setupTranslation(['common','about'], AboutHome);
