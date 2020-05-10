import React from 'react'
import { withTranslation } from 'react-i18next'

import getLocalArcher from 'api/helpers/getLocalArcher'

import API from 'api'

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {KeyboardDatePicker} from '@material-ui/pickers';

import NewSeasonGoal from 'app/seasons/NewSeasonGoal'
import SeasonGraph from 'svg/SeasonGraph'
import Waiting from 'app/common/Waiting'


const styles = {}

class NewSeasonCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState(){
    return {
      season: this.props.season,
      events: [],
      chosen:{},
      disabled:{},
      disabledTrainers:{},
      registeredEvents:[],
      trainers: getLocalArcher().trainers}
  }
  componentDidMount(){
    this.loadRegisteredEvents();
  }
  changeName(event) {
    this.state.season.name = event.target.value;
  }
  changeEquipment(event) {
    this.state.season.equipmentId = event.target.value;
  }
  getEquipments(){
    return this.props.equipment.map(function(equipment) {
      return (
        <MenuItem
          key={'aaa-equipmentChoice_' + equipment.id}
          value={equipment.id} >
          {equipment.name}
        </MenuItem>
      );
    });
  }
  changeWeekPlan(index, value) {
    this.state.season.changeWeekPlan(index,value);
    this.setState(this.state);
  }
  changeWeekTargetShare(index, value) {
    this.state.season.changeWeekTargetShare(index,value);
    this.setState(this.state);
  }
  getWeekPlans(){
    return this.state.season.goals.map(function(goal, index) {
      return ( <NewSeasonGoal
                  xs={3}
                  key={'aaa-seasonWeekGoals_' + index}
                  goal={goal}
                  goalIndex={index}
                  changeWeekPlan={this.changeWeekPlan.bind(this)}
                  changeWeekShare={this.changeWeekTargetShare.bind(this)} /> );
    },this);
  }
  changeStart(date) {
    this.state.season.start = date;
    if(!this.state.season.end) {
      this.state.season.end = date;
    }
    this.state.season.updateWeeks();
    this.setState(this.state);
    this.loadRegisteredEvents();
  }
  changeEnd(date) {
    this.state.season.end = date;
    if(!this.state.season.start) {
      this.state.season.start = date;
    }
    this.state.season.updateWeeks();
    this.setState(this.state);
    this.loadRegisteredEvents();
  }
  loadEvents(){
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
  }
  loadRegisteredEvents() {
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
  }
  getEvents() {
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
        return <ListItem
          key={['aaa-events', index].join('_')}
          leftCheckbox={<Checkbox
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
  }
  getTrainers() {
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
        return <ListItem
          key={['aaa-events', index].join('_')}>
          <FormControlLabel
            control={<Checkbox
                          checked={this.state.season.permissions[trainer.trainerId]}
                          disabled={this.state.disabledTrainers[trainer.trainerId] === true}
                          onCheck={checkTrainerFunction.bind(this)}/>}
            label={t('season:newSeason.trainers.primaryText',trainer)} />
          </ListItem>
      }, this);
    }
    return t('season:newSeason.trainers.noTrainers');
  }
  showMessage(message, type) {
    if(typeof this.props.messenger !== 'undefined'){
      this.props.messenger.sendMessage({
        text: message,
        open: true,
        type: type
      });
    }
  }
  render() {
    const t = this.props.t;

    return (
      <Grid container spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField fullWidth
              id={'aaa-newSeasonName'}
              defaultValue={this.props.season.name}
              onChange={this.changeName.bind(this)}
              hintText={t('season:newSeason.nameTextField.hint')}
              label={t('season:newSeason.nameTextField.label')} />
          </Grid>
          <Grid item xs={4} >
            <InputLabel id="demo-simple-select-label">
              {t('season:newSeason.equipmentSelectField.label')}
            </InputLabel>
            <Select fullWidth
              labelId="footer-language-select-label"
              id={'aaa-newSeasonEquipment'}
              value={this.props.season.equipmentId}
              onChange={this.changeEquipment.bind(this)}>
              <MenuItem value={undefined}>{t('season:newSeason.equipmentSelectField.undefined')}</MenuItem>
              {this.getEquipments()}
            </Select>
          </Grid>
          <Grid item xs={2} >
            <KeyboardDatePicker fullWidth autoOk
              margin="normal"
              id={'aaa-seasonStartDate'}
              label={t('season:newSeason.startDateDatepicker.label')}
              format="dd.MM.yyyy"
              value={this.props.season.start}
              maxDate={this.props.season.end}
              onChange={this.changeStart.bind(this)} />
          </Grid>
          <Grid item xs={2} >
            <KeyboardDatePicker fullWidth autoOk
              margin="normal"
              id={'aaa-seasonEndDate'}
              label={t('season:newSeason.endDateDatepicker.label')}
              format="dd.MM.yyyy"
              value={this.props.season.end}
              minDate={this.props.season.start}
              onChange={this.changeEnd.bind(this)} />
          </Grid>
          <Grid item style={styles.GridTile} xs={4} >
            <List>
              <ListSubheader>
                {t('season:newSeason.trainers.subheader')}
              </ListSubheader>
              {this.getTrainers()}
            </List>
          </Grid>
          <Grid item xs={8} >
            <SeasonGraph style={{maxHeight:300}} data={this.state.season} events={this.state.registeredEvents} />
          </Grid>
          <Grid item xs={8} >
            <Grid container spacing={2} >
              {this.getWeekPlans()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation('season')(withStyles(styles)(NewSeasonCardForm));
