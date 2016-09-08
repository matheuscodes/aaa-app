'use strict'
var React = require('react');

var TrainingTypes = require('constants/TrainingTypes.json');
var valueConverter = require('useful/valueConverter');

var Thermometer = require('svg/icon/Thermometer.jsx');
var Windmills = require('svg/icon/Windmills.jsx');
var ArcherAnchored = require('svg/icon/ArcherAnchored.jsx');
var AssessmentArrowTable = require('app/assessments/AssessmentArrowTable.jsx');
var DirectionSelector = require('app/common/DirectionSelector.jsx');
var WeatherSelector = require('app/common/WeatherSelector.jsx');

var MUI = require('app/common/MaterialUI');
var API = require('api');

var style = {
  arrowCountField:{
    width:'29%',
    padding:'0 5% 0 5%'
  },
  arrowCountButton:{
    width:'30%',
    height:'30%',
    padding:0
  },
  arrowCountInput: {
    textAlign:'center',
    fontSize: '80%'
  },
  arrowCountIcon: {
    width:'100%',
    height:'100%',
    color:MUI.palette.accent1Color
  }
}

module.exports = React.createClass({
  getInitialState: function() {
    return {
      date: new Date(),
      targets:[],
      seasons:[],
      events:[],
      rounds: [
        {
          ends:[[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]]
        },
        {
          ends:[[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]]
        }
      ]
    };
  },
  componentDidMount: function() {
    var callbacks ={
      context: this,
      success: function(targets){
        var current = this.state;
        current.targets = targets;

        var callbacks ={
          context: this,
          success: function(seasons){
            current.seasons = seasons;
            this.setState(current);
          }
        }
        API.seasons.getList(callbacks);
      }
    }
    API.assessments.getTargets(callbacks);
  },
  changeDate: function(event, date){
    var current = this.state;
    current.date = date;
    this.setState(current);
  },
  changeDistance: function(event){
    var current = this.state;
    current.distance = event.target.value;
  },
  changeTemperature: function(event){
    var current = this.state;
    current.temperature = event.target.value;
  },
  changeWindSpeed: function(event){
    var current = this.state;
    current.windSpeed = event.target.value;
  },
  changeSeason: function(event, index, value){
    var current = this.state;
    current.seasonId = value;
    this.setState(current);
    var callbacks ={
      context: this,
      success: function(events){
        var current = this.state;
        current.eventId ? delete current.eventId : null;
        current.events = events;
        this.setState(current);
      }
    }
    var season = this.state.seasons[index-1];
    API.events.getList(callbacks,season.start,season.end);
  },
  changeTarget: function(event, index, value){
    var current = this.state;
    current.targetId = value;
    this.setState(current);
  },
  changeEvent: function(event, index, value){
    var current = this.state;
    current.eventId = value;
    this.setState(current);
  },
  changeWeather: function(event, index, value){
    var current = this.state;
    current.weather = value;
    this.setState(current);
  },
  changeWindDirection: function(event, index, value){
    var current = this.state;
    current.windDirection = value;
    this.setState(current);
  },
  changeShootDirection: function(event, index, value){
    var current = this.state;
    current.shootDirection = value;
    this.setState(current);
  },
  addRound: function(){
    var current = this.state;
    current.rounds.push({ends:[]});
    this.setState(current);
  },
  deleteEnd: function(roundIndex,endIndex){
    var current = this.state;
    //TODO handle array out of bounds exceptions.
    current.rounds[roundIndex].ends.splice(endIndex,1);
    this.setState(current);
  },
  handleOpen: function(event, index, value){
    var current = this.state;
    current.open = true;
    this.setState(current);
  },
  handleClose: function(event, index, value){
    var current = this.state;
    current.open = false;
    this.setState(current);
  },
  render: function() {
    var seasons = this.state.seasons.map(function(season,index){
      return(
        <MUI.MenuItem key={'aaa-newAssessmentSeason_'+index} value={season.id} primaryText={season.name} />
      );
    });

    var targets = this.state.targets.map(function(target,index){
      return(
        <MUI.MenuItem key={'aaa-newAssessmentTarget_'+index} value={target.id} primaryText={target.name} />
      );
    });

    var events = this.state.events.map(function(event,index){
      return(
        <MUI.MenuItem key={'aaa-newAssessmentEvent_'+index} value={event.id} primaryText={event.name} />
      );
    });

    return (
      <MUI.Card>
        <MUI.CardHeader
          title="Text[new assessment title]"
          subtitle="Text[new assessment subtitle]" />
        <MUI.CardText>
        <MUI.GridList cellHeight={'64pt'} cols={2} padding={10} style={{width:'100%'}}>
          <MUI.GridTile cols={1} >
          <MUI.GridList cellHeight={'64pt'} cols={4} padding={10} style={{width:'100%'}}>
            <MUI.GridTile cols={4} >
              <MUI.SelectField
                style={{width:'100%'}}
                id={'aaa-newAssessmentSeason'}
                value={this.state.seasonId}
                onChange={this.changeSeason}
                floatingLabelText={"Text[season]"} >
                {/*FIXME temporary fix for https://github.com/callemall/material-ui/issues/2446*/}
                <MUI.MenuItem value={'undefined'} primaryText={" "} />
                {seasons}
              </MUI.SelectField>
            </MUI.GridTile>
            <MUI.GridTile cols={2} >
              <MUI.DatePicker
                style={{width:'100%'}}
                id={'aaa-newAssessmentDate'}
                floatingLabelText='Text[Assessment date]'
                autoOk={true}
                value={this.state.date}
                onChange={this.changeDate} />
            </MUI.GridTile>
            <MUI.GridTile cols={2} >
              <MUI.TextField
                style={{width:'100%'}}
                id={'aaa-newAssessmentDistance'}
                hintText="Text[distance hint]"
                floatingLabelText="Text[distance]"
                value={this.state.distance}
                onChange={this.changeDistance} />
            </MUI.GridTile>
            <MUI.GridTile cols={4} >
              <MUI.SelectField
                style={{width:'100%'}}
                id={'aaa-newAssessmentTarget'}
                value={this.state.targetId}
                onChange={this.changeTarget}
                floatingLabelText={"Text[target]"} >
                {/*FIXME temporary fix for https://github.com/callemall/material-ui/issues/2446*/}
                <MUI.MenuItem value={'undefined'} primaryText={" "} />
                {targets}
              </MUI.SelectField>
            </MUI.GridTile>
            <MUI.GridTile cols={4} >
              <MUI.SelectField
                style={{width:'100%'}}
                id={'aaa-newAssessmentEvent'}
                value={this.state.eventId}
                onChange={this.changeEvent}
                floatingLabelText={"Text[event]"} >
                {/*FIXME temporary fix for https://github.com/callemall/material-ui/issues/2446*/}
                <MUI.MenuItem value={'undefined'} primaryText={" "} />
                {events}
              </MUI.SelectField>
            </MUI.GridTile>
            <MUI.GridTile cols={1} >
              <Thermometer
                height={'24pt'}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0
                }}/>
            </MUI.GridTile>
            <MUI.GridTile cols={2} >
              <MUI.TextField
                style={{width:'100%'}}
                id={'aaa-newAssessmentTemperature'}
                hintText="Text[temperature hint]"
                floatingLabelText="Text[temperature]"
                value={this.state.temperature}
                onChange={this.changeTemperature} />
            </MUI.GridTile>
            <MUI.GridTile cols={1} >
              <WeatherSelector
                style={{width:'100%'}}
                value={this.state.weather}
                onChange={this.changeWeather}
                hintText={"Text[weather]"} />
            </MUI.GridTile>
            <MUI.GridTile cols={1} >
              <Windmills
                height={'24pt'}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0
                }}/>
            </MUI.GridTile>
            <MUI.GridTile cols={2} >
              <MUI.TextField
                style={{width:'100%'}}
                id={'aaa-newAssessmentWindSpeed'}
                hintText="Text[wind hint]"
                floatingLabelText="Text[wind]"
                value={this.state.windSpeed}
                onChange={this.changeWindSpeed} />
            </MUI.GridTile>
            <MUI.GridTile cols={1} >
              <DirectionSelector
                style={{width:'100%'}}
                type={'WindDirection'}
                value={this.state.windDirection}
                onChange={this.changeWindDirection}
                hintText={"Text[direction wind]"} />
            </MUI.GridTile>

            <MUI.GridTile cols={1} >
              <ArcherAnchored
                height={'24pt'}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0
                }}/>
            </MUI.GridTile>
            <MUI.GridTile cols={1} >
              <MUI.SelectField
                style={{width:'100%'}}
                type={'ShootDirection'}
                value={this.state.shootDirection}
                onChange={this.changeShootDirection}
                hintText={"Text[direction wind]"} />
            </MUI.GridTile>
          </MUI.GridList>
          </MUI.GridTile>
          <MUI.GridTile cols={1} >
          <MUI.GridList cellHeight={'64pt'} cols={1} style={{width:'100%'}}>
            <MUI.GridTile style={{padding:5}} cols={1} >
              <MUI.RaisedButton label="Text[add round]" style={style} onTouchTap={this.addRound}/>
            </MUI.GridTile>
            {this.state.rounds.map(function(round,index){
              round.index = index;
              return (<MUI.GridTile cols={1}  style={{padding:'5pt'}}>
                <MUI.Paper  zDepth={2}  style={{display:'inline-block', width:'100%'}}>
                  <MUI.GridList cellHeight={'64pt'} cols={1} padding={10} style={{width:'100%'}}>
                    <MUI.GridTile style={{padding:10}} cols={1} >
                      <MUI.RaisedButton label="Text[add set]" style={style} onTouchTap={this.handleOpen} />
                        <MUI.Dialog
                          title="Dialog With Actions"
                          actions={[
                            <MUI.RaisedButton
                              label="Cancel"
                              primary={true}
                              onTouchTap={this.handleClose}
                            />,
                            <MUI.RaisedButton
                              label="Submit"
                              primary={true}
                              keyboardFocused={true}
                              onTouchTap={this.handleClose}
                            />,
                          ]}
                          modal={false}
                          open={this.state.open}
                          onRequestClose={this.handleClose} />
                    </MUI.GridTile>
                    <MUI.GridTile style={{padding:5}} cols={1} >
                      <AssessmentArrowTable data={round} deleteEnd={this.deleteEnd} />
                    </MUI.GridTile>
                  </MUI.GridList>
                </MUI.Paper>
              </MUI.GridTile>)
            },this)}
          </MUI.GridList>
          </MUI.GridTile>
          </MUI.GridList>
        </MUI.CardText>

        <MUI.CardActions style={{textAlign:'right'}}>
          <MUI.FloatingActionButton mini={true} secondary={true} style={{margin: '5pt'}}>
            <MUI.icons.action.delete />
          </MUI.FloatingActionButton>
          <MUI.FloatingActionButton style={{margin: '5pt'}}>
            <MUI.icons.action.backup />
          </MUI.FloatingActionButton>
        </MUI.CardActions>
      </MUI.Card>
    );
  }
});
