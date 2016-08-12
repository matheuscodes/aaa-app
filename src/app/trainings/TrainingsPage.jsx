'use strict'

var React = require('react');
var MUI = require('app/common/MaterialUI');

var BaseLayout = require('app/common/BaseLayout.jsx');
var TrainingList = require('app/trainings/TrainingList.jsx');
var NewTrainingCard = require('app/trainings/NewTrainingCard.jsx');

var styles = {
  gridList: {
    width: '100%'
  }
}

module.exports = React.createClass({
  render: function() {
    return (
      <BaseLayout layoutName='trainingsPage' userAgent={this.props.userAgent} languages={this.props.languages} title='Welcome to Advanced Archery' >
        <MUI.GridList cellHeight={'unset'} cols={4} padding={10} style={styles.gridList} >
          <MUI.GridTile style={{padding:'5pt'}}
            cols={2} >
            <NewTrainingCard />
          </MUI.GridTile>
          <MUI.GridTile style={{padding:'5pt'}}
            cols={2} >
            <TrainingList />
          </MUI.GridTile>
        </MUI.GridList>
      </BaseLayout>
    );
  }
});
