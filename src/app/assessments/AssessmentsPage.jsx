'use strict'

var React = require('react');
var MUI = require('app/common/MaterialUI');

var BaseLayout = require('app/common/BaseLayout.jsx');
var AssessmentList = require('app/assessments/AssessmentList.jsx');
var NewAssessmentCard = require('app/assessments/NewAssessmentCard.jsx');

var styles = {
  gridList: {
    width: '100%'
  }
}

module.exports = React.createClass({
  render: function() {
    return (
      <BaseLayout layoutName='assessmentsPage' userAgent={this.props.userAgent} languages={this.props.languages} title='Welcome to Advanced Archery' >
        <MUI.GridList cellHeight={'unset'} cols={4} padding={10} style={styles.gridList} >
          <MUI.GridTile style={{padding:'5pt'}}
            cols={2} >
            <NewAssessmentCard />
          </MUI.GridTile>
          <MUI.GridTile style={{padding:'5pt'}}
            cols={2} >
            <AssessmentList />
          </MUI.GridTile>
        </MUI.GridList>
      </BaseLayout>
    );
  }
});
