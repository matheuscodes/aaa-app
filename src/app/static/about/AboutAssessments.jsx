const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');

const styles = {
  gridList: {
    width: '100%'
  }
};

const AboutAssessments = React.createClass({
  propTypes: {
    t: React.PropTypes.func.isRequired
  },
  render: function() {
    const t = this.props.t;
    return (
      <MUI.GridList style={styles.gridList} cellHeight={'auto'} cols={8} padding={10} >
        <MUI.GridTile style={MUI.styles.GridTile} cols={3} >
          <div><img src='img/new_assessment.png' width={'100%'} /></div>
          <div style={{textAlign:'center'}}><img src='img/new_end.png' width={'50%'} /></div>
        </MUI.GridTile>
        <MUI.GridTile style={MUI.styles.GridTile} cols={5} >
          <div><img src='img/assessments.png' width={'100%'} /></div>
          <div><img src='img/assessment_details.png' width={'100%'} /></div>
        </MUI.GridTile>
      </MUI.GridList>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['common','about'], AboutAssessments);
