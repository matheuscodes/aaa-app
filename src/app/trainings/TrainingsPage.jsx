var React = require('react');
var BaseLayout = require('app/common/BaseLayout.jsx');

var MUI = require('app/common/MaterialUI');

//var TrainingList = require('app/trainings/TrainingList.jsx');
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
            key={'aaa-newTraining'}
            cols={2} >
            <NewTrainingCard />
          </MUI.GridTile>
        </MUI.GridList>
        { /*<div className='mdl-cell--12-col'>
          <button id='aaa_new_training' className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'>
            <i className='material-icons'>add</i> Text['add_new_training']
          </button>
          <div className='mdl-tooltip' htmlFor='aaa_new_training'>Text['add_new_training']</div>
        </div>
        <div id='aaa_training_page_content' className='mdl-grid mdl-cell--12-col'>
          <div style={{position: 'relative'}}>
            <ReactMDL.IconButton name="more_vert" id="demo-menu-top-right" />
            <ReactMDL.Menu target="demo-menu-top-right" valign="top" align="right">
                <ReactMDL.MenuItem>Some Action</ReactMDL.MenuItem>
                <ReactMDL.MenuItem>Another Action</ReactMDL.MenuItem>
                <ReactMDL.MenuItem disabled>Disabled Action</ReactMDL.MenuItem>
                <ReactMDL.MenuItem>Yet Another Action</ReactMDL.MenuItem>
            </ReactMDL.Menu>
          </div>
        </div>*/}
      </BaseLayout>
    );
  }
});
