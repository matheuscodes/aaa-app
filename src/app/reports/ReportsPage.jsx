'use strict'

var React = require('react');
var MUI = require('app/common/MaterialUI');

var BaseLayout = require('app/common/BaseLayout.jsx');
var ReportCard = require('app/reports/ReportCard.jsx');

var styles = {
  gridList: {
    width: '100%'
  }
}

module.exports = React.createClass({
  render: function() {
    return (
      <BaseLayout switcher={this.props.switcher} layoutName='reportsPage' userAgent={this.props.userAgent} languages={this.props.languages} title='Welcome to Advanced Archery' >
        <MUI.GridList cellHeight={'unset'} cols={1} padding={10} style={styles.gridList} >
          <MUI.GridTile style={{padding:'5pt'}} cols={1} >
            <ReportCard />
          </MUI.GridTile>
        </MUI.GridList>
      </BaseLayout>
    );
  }
});
