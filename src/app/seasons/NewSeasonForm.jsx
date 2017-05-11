const React = require('react');
const moment = require('moment');

const getLocalArcher = require('api/helpers/getLocalArcher');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const NewSeasonGoal = require('app/seasons/NewSeasonGoal');
const SeasonGraph = require('svg/SeasonGraph');
const Waiting = require('app/common/Waiting');

const NewSeasonCardForm = React.createClass({
  propTypes: {
    t: React.PropTypes.func
  },
  getInitialState: function(){
    return {
      season: this.props.season,
      events: [],
      chosen:{},
      disabled:{},
      disabledTrainers:{},
      registeredEvents:[],
      trainers: getLocalArcher().trainers}
  },
  componentDidMount: function(){
    this.loadRegisteredEvents();
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
    this.loadRegisteredEvents();
  },
  changeEnd: function(event, date) {
    this.state.season.end = date;
    this.state.season.updateWeeks();
    this.setState(this.state);
    this.loadRegisteredEvents();
  },
  loadEvents: function(){
    const callbacks = {
      context: this,
      success: function(list) {
        this.state.events = list;
        this.setState(this.state);
      }
    };
    if(this.state.season.start && this.state.season.end){
      this.state.events = null;
      API.events.getPublicEvents(callbacks,
                                 this.state.season.start,
                                 this.state.season.end);
      this.setState(this.state);
    }
  },
  loadRegisteredEvents: function() {
    const callbacks = {
      context: this,
      success: function(events) {
        this.state.registeredEvents = events;
        events.forEach((event) => {
          this.state.chosen[event.id] = true;
        },this);
        this.setState(this.state);
        this.loadEvents();
      },
      error: function(){
        this.loadEvents();
      }
    };
    API.events.getList(callbacks, this.state.season.start, this.state.season.end);
  },
  getEvents: function() {
    const t = this.props.t;

    if(this.state.events && this.state.events.length > 0)
      return this.state.events.map( (event,index) => {
        function checkFunction(ignoreThis, isInputChecked){
          this.state.disabled[event.id] = true;
          const callbacks = {
            context: this,
            success: function() {
              this.state.chosen[event.id] = isInputChecked;
              this.state.disabled[event.id] = false;
              this.state.registeredEvents.push(event);
              this.setState(this.state);
              this.showMessage(t('season:messages.registerSuccess'), "SUCCESS");
            },
            error: function() {
              this.state.chosen[event.id] = !isInputChecked;
              this.state.disabled[event.id] = false;
              this.setState(this.state);
              this.showMessage(t('season:messages.registerError'), "ERROR");
            }
          };
          if(isInputChecked){
            API.events.register(event.id,callbacks);
          } else {
            API.events.unregister(event.id,callbacks);
          }
          this.setState(this.state);
        }
        return <MUI.ListItem
          key={['aaa-events', index].join('_')}
          leftCheckbox={<MUI.Checkbox
                          checked={this.state.chosen[event.id]}
                          disabled={this.state.disabled[event.id] === true}
                          onCheck={checkFunction.bind(this)}/>}
          primaryText={t('season:newSeason.events.primaryText',event)}
          secondaryText={t('season:newSeason.events.secondaryText',event)} />
      }, this);
    else if(this.state.events === null){
      return <Waiting />;
    }
    return t('season:newSeason.events.noEvents');
  },
  getTrainers: function() {
    const t = this.props.t;

    if(this.state.trainers && this.state.trainers.length > 0) {
      return this.state.trainers.map( (trainer,index) => {
        function checkTrainerFunction(ignoreThis, isInputChecked){
          const callbacks = {
            context: this,
            success: function() {
              this.state.season.setPermission(trainer.trainerId,isInputChecked);
              this.state.disabledTrainers[trainer.trainerId] = false;
              this.setState(this.state);
              this.showMessage(t('season:messages.permissionSuccess'), "SUCCESS");
            },
            error: function() {
              this.state.season.setPermission(trainer.trainerId,!isInputChecked);
              this.state.disabledTrainers[trainer.trainerId] = false;
              this.setState(this.state);
              this.showMessage(t('season:messages.permissionError'), "ERROR");
            }
          };
          if(this.state.season.id){
            this.state.disabledTrainers[trainer.trainerId] = true;
            if(isInputChecked){
              API.seasons.permit(this.state.season.id,trainer.trainerId,callbacks);
            } else {
              API.seasons.deny(this.state.season.id,trainer.trainerId,callbacks);
            }
          } else {
            this.state.season.setPermission(trainer.trainerId,isInputChecked);
            this.state.disabledTrainers[trainer.trainerId] = false;
          }
          this.setState(this.state);
        }
        return <MUI.ListItem
          key={['aaa-events', index].join('_')}
          leftCheckbox={<MUI.Checkbox
                          checked={this.state.season.permissions[trainer.trainerId]}
                          disabled={this.state.disabledTrainers[trainer.trainerId] === true}
                          onCheck={checkTrainerFunction.bind(this)}/>}
          primaryText={t('season:newSeason.trainers.primaryText',trainer)} />
      }, this);
    }
    return t('season:newSeason.trainers.noTrainers');
  },
  showMessage: function(message, type) {
    if(typeof this.props.messenger !== 'undefined'){
      this.props.messenger.sendMessage({
        text: message,
        open: true,
        type: type
      });
    }
  },
  render: function() {
    const t = this.props.t;

    return (
      <MUI.GridList cellHeight={'auto'} cols={8} padding={10} >
        <MUI.GridTile style={MUI.styles.GridTile} cols={8} >
          <MUI.GridList cellHeight={'auto'} cols={6} padding={10} >
            <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
              <MUI.TextField
                style={{width: '100%'}}
                id={'aaa-newSeasonName'}
                defaultValue={this.props.season.name}
                onChange={this.changeName}
                hintText={t('season:newSeason.nameTextField.hint')}
                floatingLabelText={t('season:newSeason.nameTextField.label')} />
            </MUI.GridTile>
            <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
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
            <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
              <MUI.DatePicker
                id={'aaa-seasonStartDate'}
                floatingLabelText={t('season:newSeason.startDateDatepicker.label')}
                autoOk={true}
                defaultDate={this.props.season.start}
                maxDate={this.props.season.end}
                onChange={this.changeStart} />
            </MUI.GridTile>
            <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
              <MUI.DatePicker
                id={'aaa-seasonEndDate'}
                floatingLabelText={t('season:newSeason.endDateDatepicker.label')}
                autoOk={true}
                defaultDate={this.props.season.end}
                minDate={this.props.season.start}
                onChange={this.changeEnd} />
            </MUI.GridTile>
          </MUI.GridList>
        </MUI.GridTile>
        <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
          <MUI.List>
            <MUI.Subheader>
              {t('season:newSeason.trainers.subheader')}
            </MUI.Subheader>
            {this.getTrainers()}
          </MUI.List>
        </MUI.GridTile>
        <MUI.GridTile style={MUI.styles.GridTile} cols={6} >
          <SeasonGraph style={{maxHeight:300}} data={this.state.season} events={this.state.registeredEvents} />
        </MUI.GridTile>
        <MUI.GridTile style={MUI.styles.GridTile} cols={5} >
          <MUI.GridList cellHeight={'auto'} cols={5} padding={10} >
            {this.getWeekPlans()}
          </MUI.GridList>
        </MUI.GridTile>
        <MUI.GridTile style={MUI.styles.GridTile} cols={3} >
          <MUI.List>
            <MUI.Subheader>
              {t('season:newSeason.events.subheader')}
            </MUI.Subheader>
            {this.getEvents()}
          </MUI.List>
        </MUI.GridTile>
      </MUI.GridList>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['season'], NewSeasonCardForm);
