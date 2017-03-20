const React = require('react');
const moment = require('moment');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const Waiting = require('app/common/Waiting');
const Notice = require('app/common/Notice');

const NewSeasonCardGoal = React.createClass({
  propTypes: {
    onClose: React.PropTypes.func,
    t: React.PropTypes.func
  },
  changeWeekPlan: function(event) {
    this.props.changeWeekPlan(this.props.goalIndex, event.target.value);
  },
  changeWeekShare: function(event) {
    this.props.changeWeekShare(this.props.goalIndex, event.target.value);
  },
  render: function() {
    const t = this.props.t;

    return (
      <MUI.GridTile
        style={MUI.styles.GridTile} cols={1} >
        <MUI.GridList cellHeight={'auto'} cols={1} padding={10} >
          <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
            <MUI.TextField
              style={{width: '100%'}}
              id={['aaa-newSeasonArrowCount_', this.props.goalIndex].join('')}
              defaultValue={this.props.goal.arrowCount}
              onChange={this.changeWeekPlan}
              hintText={
                t('season:newSeason.arrowCountTextField.hint', this.props.goal)
              }
              floatingLabelText={
                t('season:newSeason.arrowCountTextField.label', this.props.goal)
              } />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
            <MUI.TextField
              style={{width: '100%'}}
              id={['aaa-newSeasonTargetShare_', this.props.goalIndex].join('')}
              defaultValue={this.props.goal.targetShare}
              onChange={this.changeWeekShare}
              hintText={
                t('season:newSeason.targetShareTextField.hint', this.props.goal)
              }
              floatingLabelText={
              t('season:newSeason.targetShareTextField.label', this.props.goal)
              } />
          </MUI.GridTile>
        </MUI.GridList>
      </MUI.GridTile>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['season'], NewSeasonCardGoal);
