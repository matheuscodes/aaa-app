const React = require('react');
const moment = require('moment');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');

const NewSeasonGoal = require('app/seasons/NewSeasonGoal');

const NewSeasonCardForm = React.createClass({
  propTypes: {
    t: React.PropTypes.func
  },
  getInitialState: function(){
    return {season: this.props.season}
  },
  changeName: function(event) {
    this.state.season.name = event.target.value;
  },
  changeEquipment: function(event, index, value) {
    this.state.season.equipmentId = value;
  },
  getEquipments: function(){
    return this.props.equipment.map(function(equipment) {
      return (
        <MUI.MenuItem
          key={'aaa-equipmentChoice_' + equipment.id}
          value={equipment.id}
          primaryText={equipment.name} />
      );
    });
  },
  changeWeekPlan: function(index,value) {
    this.state.season.changeWeekPlan(index,value);
    this.setState(this.state);
  },
  changeWeekTargetShare: function(index,value) {
    this.state.season.changeWeekTargetShare(index,value);
    this.setState(this.state);
  },
  getWeekPlans: function(){
    return this.state.season.goals.map(function(goal, index) {
      return ( <NewSeasonGoal
                  key={'aaa-seasonWeekGoals_' + index}
                  goal={goal}
                  goalIndex={index}
                  changeWeekPlan={this.changeWeekPlan}
                  changeWeekShare={this.changeWeekTargetShare} /> );
    },this);
  },
  changeStart: function(event, date) {
    this.state.season.start = date;
    this.state.season.updateWeeks();
    this.setState(this.state);
  },
  changeEnd: function(event, date) {
    this.state.season.end = date;
    this.state.season.updateWeeks();
    this.setState(this.state);
  },
  render: function() {
    const t = this.props.t;

    return (
      <MUI.GridList cols={4} padding={10} >
        <MUI.GridTile cols={4} >
          <MUI.TextField
            style={{width: '100%'}}
            id={'aaa-newSeasonName'}
            defaultValue={this.props.season.name}
            onChange={this.changeName}
            hintText={t('season:newSeason.nameTextField.hint')}
            floatingLabelText={t('season:newSeason.nameTextField.label')} />
        </MUI.GridTile>
        <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
          <MUI.SelectField
            style={{width: '100%'}}
            id={'aaa-newSeasonEquipment'}
            value={this.props.season.equipmentId}
            onChange={this.changeEquipment}
            floatingLabelFixed={true}
            floatingLabelText={
              t('season:newSeason.equipmentSelectField.label')
            } >
            <MUI.MenuItem
              value={undefined}
              primaryText={
                t('season:newSeason.equipmentSelectField.undefined')
              } />
            {this.getEquipments()}
          </MUI.SelectField>
        </MUI.GridTile>
        <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
          <MUI.DatePicker
            id={'aaa-seasonStartDate'}
            floatingLabelText={t('season:newSeason.startDateDatepicker.label')}
            autoOk={true}
            defaultDate={this.props.season.start}
            onChange={this.changeStart} />
        </MUI.GridTile>
        <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
          <MUI.DatePicker
            id={'aaa-seasonEndDate'}
            floatingLabelText={t('season:newSeason.endDateDatepicker.label')}
            autoOk={true}
            defaultDate={this.props.season.end}
            onChange={this.changeEnd} />
        </MUI.GridTile>
        {this.getWeekPlans()}
      </MUI.GridList>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['season'], NewSeasonCardForm);
