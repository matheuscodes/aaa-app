import React from 'react'

import i18nextReact from 'global/i18nextReact'
import MUI from 'app/common/MaterialUI'

const styles = {
  gridList: {
    width: '100%'
  }
};

const AboutReports = React.createClass({
  propTypes: {
    t: React.PropTypes.func.isRequired
  },
  render: function() {
    const t = this.props.t;
    return (
      <MUI.GridList style={styles.gridList} cellHeight={'auto'} cols={1} padding={10} >
        <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
          <div><img src='img/report.png' width={'100%'} /></div>
        </MUI.GridTile>
      </MUI.GridList>
    );
  }
});

export default i18nextReact.setupTranslation(['common','about'], AboutReports);
