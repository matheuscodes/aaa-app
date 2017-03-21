const React = require('react');
const moment = require('moment');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const NewSeasonCardGoal = require('app/seasons/NewSeasonCardGoal');
const Waiting = require('app/common/Waiting');
const Notice = require('app/common/Notice');

function newSeason(context) {
  const t = context.props.t;

  var equipment = context.state.equipment.map(function(equipment) {
    return (
      <MUI.MenuItem
        key={'aaa-equipmentChoice_' + equipment.id}
        value={equipment.id}
        primaryText={equipment.name} />
    );
  });

  var weekPlans = context.state.season.goals.map(function(goal, index) {
    return ( <NewSeasonCardGoal
                goal={goal}
                goalIndex={index}
                changeWeekPlan={context.changeWeekPlan}
                changeWeekShare={context.changeWeekShare} /> );
  });

  return (
    <MUI.GridList cellHeight={'auto'} cols={4} padding={10} >
      <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
        <MUI.TextField
          style={{width: '100%'}}
          id={'aaa-newSeasonName'}
          defaultValue={context.state.season.name}
          onChange={context.changeName}
          hintText={t('season:newSeason.nameTextField.hint')}
          floatingLabelText={t('season:newSeason.nameTextField.label')} />
      </MUI.GridTile>
      <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
        <MUI.SelectField
          style={{width: '100%'}}
          id={'aaa-newSeasonEquipment'}
          value={context.state.season.equipmentId}
          onChange={context.changeEquipment}
          floatingLabelFixed={true}
          floatingLabelText={
            t('season:newSeason.equipmentSelectField.label')
          } >
          <MUI.MenuItem
            value={undefined}
            primaryText={
              t('season:newSeason.equipmentSelectField.undefined')
            } />
          {equipment}
        </MUI.SelectField>
      </MUI.GridTile>
      <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
        <MUI.DatePicker
          id={'aaa-seasonStartDate'}
          floatingLabelText={t('season:newSeason.startDateDatepicker.label')}
          autoOk={true}
          defaultDate={context.state.season.start}
          onChange={context.changeStart} />
      </MUI.GridTile>
      <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
        <MUI.DatePicker
          id={'aaa-seasonEndDate'}
          floatingLabelText={t('season:newSeason.endDateDatepicker.label')}
          autoOk={true}
          defaultDate={context.state.season.end}
          onChange={context.changeEnd} />
      </MUI.GridTile>
      {weekPlans}
    </MUI.GridList>
  );
}

const NewSeasonCard = React.createClass({
  propTypes: {
    seasonId: React.PropTypes.number,
    onClose: React.PropTypes.func,
    t: React.PropTypes.func
  },
  getInitialState: function() {
    return {equipment: []};
  },
  componentDidMount: function() {
    if (typeof this.props.seasonId === 'undefined') {
      API.equipment.getList(this, function(list) {
        this.setState({equipment: list, season: {goals: []}});
      });
    } else {
      var callbacks = {
        context: this,
        success: function(season) {
          API.equipment.getList(this, function(list) {
            this.setState({equipment: list, season: season});
          });
        }
      };
      API.seasons.getById(this.props.seasonId, callbacks);
    }
  },
  changeWeekPlan: function(index,value) {
    var current = this.state;
    current.season.goals[index].arrowCount = value;
  },
  changeWeekShare: function(index,value) {
    var current = this.state;
    current.season.goals[index].targetShare = value;
  },
  changeName: function(event) {
    var current = this.state;
    current.season.name = event.target.value;
  },
  updateWeeks: function(current) {
    if (typeof current.season.start !== 'undefined' &&
        typeof current.season.end !== 'undefined') {
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      const oneDay = oneWeek / 7;
      var weeks = {};
      var weekStart = current.season.start.getTime();
      var weekEnd = current.season.end.getTime();
      var stop = weekEnd + oneDay;
      for (var i = weekStart; i < stop; i += oneWeek) {
        var week1 = moment(i).isoWeek();
        weeks[week1] = {week: week1, arrowCount: 0, targetShare: 0};
        if (typeof current.season.id !== 'undefined') {
          weeks[week1].seasonId = current.season.id;
        }
      }
      current.season.goals.forEach(function(value) {
        if (typeof weeks[value.week] !== 'undefined') {
          weeks[value.week] = value;
        }
      });
      current.season.goals = [];
      for (var j = weekStart; j < stop; j += oneWeek) {
        var week2 = moment(j).isoWeek();
        current.season.goals.push(weeks[week2]);
      }
    }
  },
  changeStart: function(event, date) {
    var current = this.state;
    current.season.start = date;
    this.updateWeeks(current);
    this.setState(current);
  },
  changeEnd: function(event, date) {
    var current = this.state;
    current.season.end = date;
    this.updateWeeks(current);
    this.setState(current);
  },
  changeEquipment: function(event, index, value) {
    var current = this.state;
    current.season.equipmentId = value;
    this.setState(current);
  },
  showMessage: function(message, type) {
    var current = this.state;
    current.message = {
      text: message,
      open: true,
      type: type
    };
    this.setState(current);
  },
  hideMessage: function() {
    var current = this.state;
    current.message.open = false;
    this.setState(current);
  },
  submitSeason: function() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function() {
        this.showMessage(t('season:messages.newSaved'), "MESSAGE");
        this.props.onClose(true);
      },
      warning: function() {
        this.showMessage(t('season:messages.newSaved'), "WARNING");
      },
      error: function() {
        this.showMessage(t('season:messages.newError'), "ERROR");
      }
    };
    API.seasons.save(this.state.season, callbacks);
  },
  render: function() {
    const t = this.props.t;

    var message = '';
    if (typeof this.state.message !== 'undefined') {
      message = (
        <Notice message={this.state.message} onClose={this.hideMessage} />
      );
    }
    return (
      <MUI.Card>
        <MUI.CardHeader
          title={t('season:newSeason.title')}
          subtitle={t('season:newSeason.subtitle')} />
        <MUI.CardText>
          {this.state.season ? newSeason(this) : <Waiting />}
        </MUI.CardText>
        <MUI.CardActions style={{textAlign: 'right'}}>
          <MUI.FloatingActionButton
            mini={true} secondary={true}
            style={{margin: '5pt'}}
            onTouchTap={this.props.onClose}>
            <MUI.icons.navigation.cancel />
          </MUI.FloatingActionButton>
          <MUI.FloatingActionButton
            style={{margin: '5pt'}}
            onTouchTap={this.submitSeason} >
            <MUI.icons.action.backup />
          </MUI.FloatingActionButton>
        </MUI.CardActions>
        {message}
      </MUI.Card>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['season'], NewSeasonCard);
