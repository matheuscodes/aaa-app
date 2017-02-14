const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');

const styles = {
  gridList: {
    width: '100%'
  }
};

const AboutTrainings = React.createClass({
  propTypes: {
    t: React.PropTypes.func.isRequired
  },
  render: function() {
    const t = this.props.t;
    return (
      <MUI.GridList style={styles.gridList} cellHeight={'auto'} cols={8} padding={10} >
        <MUI.GridTile style={MUI.styles.GridTile} cols={3} >
          <div><img src='img/new_training.png' width={'100%'} /></div>
        </MUI.GridTile>
        <MUI.GridTile style={MUI.styles.GridTile} cols={5} >
          <div><img src='img/trainings.png' width={'100%'} /></div>
        </MUI.GridTile>
      </MUI.GridList>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['common','about'], AboutTrainings);
