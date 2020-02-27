import React from 'react'

import i18nextReact from 'global/i18nextReact'
import MUI from 'app/common/MaterialUI'

import BaseLayout from 'app/common/BaseLayout'
import ReportCard from 'app/reports/ReportCard'

const styles = {
  gridList: {
    width: '100%'
  }
};

const ReportsPage = React.createClass({
  render: function() {
    const t = this.props.t;
    return (
      <BaseLayout
        switcher={this.props.switcher}
        layoutName="reportsPage"
        userAgent={this.props.userAgent}
        styleProvider={this.props.styleProvider}
        languages={this.props.languages}
        title={t('report:appBarTitle')} >
        <MUI.GridList cellHeight={'auto'} cols={1} padding={10} style={styles.gridList} >
          <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
            <ReportCard switcher={this.props.switcher} />
          </MUI.GridTile>
        </MUI.GridList>
      </BaseLayout>
    );
  }
});

export default i18nextReact.setupTranslation(['report'], ReportsPage);
