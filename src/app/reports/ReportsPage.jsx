const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');

const BaseLayout = require('app/common/BaseLayout');
const ReportCard = require('app/reports/ReportCard');

const styles = {
  gridList: {
    width: '100%'
  }
};

const ReportsPage = React.createClass({
  render: function() {
    const t = this.props.t;
    return (
      <BaseLayout switcher={this.props.switcher} layoutName="reportsPage" userAgent={this.props.userAgent} languages={this.props.languages} title={t('report:appBarTitle')} >
        <MUI.GridList cellHeight={'auto'} cols={1} padding={10} style={styles.gridList} >
          <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
            <ReportCard switcher={this.props.switcher} />
          </MUI.GridTile>
        </MUI.GridList>
      </BaseLayout>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['report'], ReportsPage);
