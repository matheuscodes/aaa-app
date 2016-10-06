var React = require('react');
var Moment = require('moment');

var MUI = require('app/common/MaterialUI');
var API = require('api');
var Waiting = require('app/common/Waiting.jsx');
var Notice = require('app/common/Notice.jsx');

function NewSeason(context) {
  var equipment = context.state.equipment.map(function(equipment) {
    return (
      <MUI.MenuItem
        key={'aaa-equipmentChoice_' + equipment.id}
        value={equipment.id}
        primaryText={equipment.name} />
    );
  });

  var weekPlans = context.state.season.goals.map(function(goal, index) {
    return (
      <MUI.GridTile key={'aaa-newSeasonGoal_' + index} style={{padding: '5pt'}} cols={1} >
        <MUI.GridList cellHeight={'auto'} cols={1} padding={10} >
          <MUI.GridTile style={{padding: '5pt'}} cols={1} >
            <MUI.TextField
              style={{width: '100%'}}
              id={'aaa-newSeasonArrowCount_' + index}
              defaultValue={goal.arrowCount}
              onChange={context.changeWeekPlan}
              hintText={"Text[count] week " + goal.week}
              floatingLabelText={"Text[count] week " + goal.week} />
          </MUI.GridTile>
          <MUI.GridTile style={{padding: '5pt'}} cols={1} >
            <MUI.TextField
              style={{width: '100%'}}
              id={'aaa-newSeasonTargetShare_' + index}
              defaultValue={goal.targetShare}
              onChange={context.changeWeekShare}
              hintText={"Text[share] week " + goal.week}
              floatingLabelText={"Text[share] week " + goal.week} />
          </MUI.GridTile>
        </MUI.GridList>
      </MUI.GridTile>
    );
  });

  return (
    <MUI.GridList cellHeight={'auto'} cols={4} padding={10} >
      <MUI.GridTile style={{padding: '5pt'}} cols={4} >
        <MUI.TextField
          style={{width: '100%'}}
          id={'aaa-newSeasonName'}
          defaultValue={context.state.season.name}
          onChange={context.changeName}
          hintText={"Text[name]"}
          floatingLabelText={"Text[name]"} />
      </MUI.GridTile>
      <MUI.GridTile style={{padding: '5pt'}} cols={4} >
        <MUI.SelectField
          style={{width: '100%'}}
          id={'aaa-newSeasonEquipment'}
          value={context.state.season.equipmentId}
          onChange={context.changeEquipment}
          floatingLabelFixed={true} >
          <MUI.MenuItem value={undefined} primaryText={"Text[no equipment]"} />
          {equipment}
        </MUI.SelectField>
      </MUI.GridTile>
      <MUI.GridTile style={{padding: '5pt'}} cols={2} >
        <MUI.DatePicker
          id={'aaa-seasonStartDate'}
          floatingLabelText="Text[Season start date]"
          autoOk={true}
          defaultDate={context.state.season.start}
          onChange={context.changeStart} />
      </MUI.GridTile>
      <MUI.GridTile style={{padding: '5pt'}} cols={2} >
        <MUI.DatePicker
          id={'aaa-seasonEndDate'}
          floatingLabelText="Text[Season start date]"
          autoOk={true}
          defaultDate={context.state.season.end}
          onChange={context.changeEnd} />
      </MUI.GridTile>
      {weekPlans}
    </MUI.GridList>
  );
}

module.exports = React.createClass({
  getInitialState: function() {
    return {equipment: []};
  },
  componentDidMount: function() {
    if (typeof this.props.seasonId !== 'undefined') {
      API.seasons.getById(this.props.seasonId, this, function(season) {
        API.equipment.getList(this, function(list) {
          this.setState({equipment: list, season: season});
        });
      });
    }
    else {
      API.equipment.getList(this, function(list) {
        this.setState({equipment: list, season: {goals: []}});
      });
    }
  },
  changeWeekPlan: function(event) {
    var current = this.state;
    var index = event.target.id.split('_')[1];
    current.season.goals[index].arrowCount = event.target.value;
    // TODO verify if this is not required, removed for performance.
    // this.setState(current);
  },
  changeWeekShare: function(event) {
    var current = this.state;
    var index = event.target.id.split('_')[1];
    current.season.goals[index].targetShare = event.target.value;
    // TODO verify if this is not required, removed for performance.
    // this.setState(current);
  },
  changeName: function(event) {
    var current = this.state;
    current.season.name = event.target.value;
    // TODO verify if this is not required, removed for performance.
    // this.setState(current);
  },
  updateWeeks: function(current) {
    if (typeof current.season.start !== 'undefined' && typeof current.season.end !== 'undefined') {
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      const oneDay = oneWeek / 7;
      var weeks = {};
      var weekStart = current.season.start.getTime();
      var weekEnd = current.season.end.getTime();
      var stop = weekEnd + oneDay;
      for (var i = weekStart; i < stop; i += oneWeek) {
        var week = Moment(i).isoWeek();
        weeks[week] = {week: week, arrowCount: 0, targetShare: 0};
        current.season.id ? weeks[week].seasonId = current.season.id : null;
      }
      current.season.goals.forEach(function(value) {
        weeks[value.week] ? weeks[value.week] = value : null;
      });
      current.season.goals = [];
      for (var i = weekStart; i < stop; i += oneWeek) {
        var week = Moment(i).isoWeek();
        current.season.goals.push(weeks[week]);
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
    var callbacks = {
      context: this,
      success: function() {
        this.showMessage("Text[season saved]", "MESSAGE");
        this.props.onClose(true);
      },
      warning: function() {
        this.showMessage("Text[season saved]", "WARNING");
      },
      error: function() {
        this.showMessage("Text[season not saved]", "ERROR");
      }
    };
    API.seasons.save(this.state.season, callbacks);
  },
  render: function() {
    return (
      <MUI.Card>
        <MUI.CardHeader
          title="Text[new season title]"
          subtitle="Text[new season subtitle]" />
        <MUI.CardText>
          {this.state.season ? NewSeason(this) : <Waiting />}
        </MUI.CardText>
        <MUI.CardActions style={{textAlign: 'right'}}>
          <MUI.FloatingActionButton mini={true} secondary={true} style={{margin: '5pt'}} onTouchTap={this.props.onClose}>
            <MUI.icons.navigation.cancel />
          </MUI.FloatingActionButton>
          <MUI.FloatingActionButton style={{margin: '5pt'}} onTouchTap={this.submitSeason} >
            <MUI.icons.action.backup />
          </MUI.FloatingActionButton>
        </MUI.CardActions>
        {this.state.message ? <Notice message={this.state.message} onClose={this.hideMessage}/> : null}
      </MUI.Card>
    );
  }
});
