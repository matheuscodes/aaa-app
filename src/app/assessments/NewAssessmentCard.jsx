var React = require('react');

var TrainingTypes = require('constants/TrainingTypes.json');
var valueConverter = require('useful/valueConverter');

var WeatherConditions = require('constants/weatherConditions.json');
var WeatherIcons = require('svg/icon/Weather.jsx');
var Thermometer = require('svg/icon/Thermometer.jsx');
var Windmills = require('svg/icon/Windmills.jsx');
var Compass = require('svg/icon/Compass.jsx');
var ArcherAnchored = require('svg/icon/ArcherAnchored.jsx');

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
      date: new Date(1451606400000),
      seasonId: 1,
      targetId: 3,
      targets:[],
      seasons:[],
      events:[],
      rounds: [
        {
          sets:[[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]]
        },
        {
          sets:[[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]]
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
  console.log(date);
    var current = this.state;
    current.date = date;
    this.setState(current);
  },
  changeSeason: function(event, index, value){
    var current = this.state;
    current.seasonId = value;
    this.setState(current);
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

    var weathers = [];
    for(weather in WeatherConditions){
      var CurrentIcon = WeatherIcons[WeatherConditions[weather]];
      weathers.push(
        <MUI.MenuItem
          key={'aaa-weatherChoice_'+weather}
          value={weather}
          label={<CurrentIcon height={'24pt'} style={{padding:'5pt'}} />}
          primaryText={<CurrentIcon height={'100%'} />} />
      );
    }

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
                id={'aaa-newAssessmentDate'}
                floatingLabelText='Text[Assessment date]'
                autoOk={true}
                value={this.state.date}
                onChange={this.changeDate} />
            </MUI.GridTile>
            <MUI.GridTile cols={2} >
              <MUI.TextField
                id={'aaa-newAssessmentDistance'}
                hintText="Text[distance hint]"
                floatingLabelText="Text[distance]" />
            </MUI.GridTile>
            <MUI.GridTile cols={4} >
              <MUI.SelectField
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
                floatingLabelText="Text[temperature]" />
            </MUI.GridTile>
            <MUI.GridTile cols={1} >
              <MUI.SelectField
                style={{width:'100%'}}
                id={'aaa-newAssessmentWeather'}
                value={this.state.weather}
                onChange={this.changeWeather}
                floatingLabelFixed={true}
                floatingLabelText={" "}
                hintText={"Text[weather]"} >
                {/*FIXME temporary fix for https://github.com/callemall/material-ui/issues/2446*/}
                <MUI.MenuItem value={'undefined'} primaryText={" "} />
                {weathers}
              </MUI.SelectField>
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
                id={'aaa-newAssessmentWindSpeed'}
                hintText="Text[wind hint]"
                floatingLabelText="Text[wind]" />
            </MUI.GridTile>
            <MUI.GridTile cols={1} >
              <MUI.SelectField
                style={{width:'100%'}}
                id={'aaa-newAssessmentWindDirection'}
                value={this.state.windDirection}
                onChange={this.changeWindDirection}
                floatingLabelFixed={true}
                floatingLabelText={" "}
                hintText={"Text[direction wind]"} >
                {/*FIXME temporary fix for https://github.com/callemall/material-ui/issues/2446*/}
                <MUI.MenuItem value={'undefined'} primaryText={" "} />
                {/*FIXME too. many. copy. paste */}
                <MUI.MenuItem
                  value={'N'}
                  label={<Compass direction={'N'} height={'24pt'} style={{padding:'5pt'}} />}
                  primaryText={<Compass direction={'N'} height={'100%'} />} />
                <MUI.MenuItem
                  value={'NE'}
                  label={<Compass direction={'NE'} height={'24pt'} style={{padding:'5pt'}} />}
                  primaryText={<Compass direction={'NE'} height={'100%'} />} />
                <MUI.MenuItem
                  value={'E'}
                  label={<Compass direction={'E'} height={'24pt'} style={{padding:'5pt'}} />}
                  primaryText={<Compass direction={'E'} height={'100%'} />} />
                <MUI.MenuItem
                  value={'SE'}
                  label={<Compass direction={'SE'} height={'24pt'} style={{padding:'5pt'}} />}
                  primaryText={<Compass direction={'SE'} height={'100%'} />} />
                <MUI.MenuItem
                  value={'S'}
                  label={<Compass direction={'S'} height={'24pt'} style={{padding:'5pt'}} />}
                  primaryText={<Compass direction={'S'} height={'100%'} />} />
                <MUI.MenuItem
                  value={'SW'}
                  label={<Compass direction={'SW'} height={'24pt'} style={{padding:'5pt'}} />}
                  primaryText={<Compass direction={'SW'} height={'100%'} />} />
                <MUI.MenuItem
                  value={'W'}
                  label={<Compass direction={'W'} height={'24pt'} style={{padding:'5pt'}} />}
                  primaryText={<Compass direction={'W'} height={'100%'} />} />
                <MUI.MenuItem
                  value={'NW'}
                  label={<Compass direction={'NW'} height={'24pt'} style={{padding:'5pt'}} />}
                  primaryText={<Compass direction={'NW'} height={'100%'} />} />
              </MUI.SelectField>
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
                id={'aaa-newAssessmentShootDirection'}
                value={this.state.shootDirection}
                onChange={this.changeShootDirection}
                floatingLabelFixed={true}
                floatingLabelText={" "}
                hintText={"Text[direction wind]"} >
                {/*FIXME temporary fix for https://github.com/callemall/material-ui/issues/2446*/}
                <MUI.MenuItem value={'undefined'} primaryText={" "} />
                {/*FIXME too. many. copy. paste */}
                <MUI.MenuItem
                  value={'N'}
                  label={<Compass direction={'N'} height={'24pt'} style={{padding:'5pt'}} />}
                  primaryText={<Compass direction={'N'} height={'100%'} />} />
                <MUI.MenuItem
                  value={'NE'}
                  label={<Compass direction={'NE'} height={'24pt'} style={{padding:'5pt'}} />}
                  primaryText={<Compass direction={'NE'} height={'100%'} />} />
                <MUI.MenuItem
                  value={'E'}
                  label={<Compass direction={'E'} height={'24pt'} style={{padding:'5pt'}} />}
                  primaryText={<Compass direction={'E'} height={'100%'} />} />
                <MUI.MenuItem
                  value={'SE'}
                  label={<Compass direction={'SE'} height={'24pt'} style={{padding:'5pt'}} />}
                  primaryText={<Compass direction={'SE'} height={'100%'} />} />
                <MUI.MenuItem
                  value={'S'}
                  label={<Compass direction={'S'} height={'24pt'} style={{padding:'5pt'}} />}
                  primaryText={<Compass direction={'S'} height={'100%'} />} />
                <MUI.MenuItem
                  value={'SW'}
                  label={<Compass direction={'SW'} height={'24pt'} style={{padding:'5pt'}} />}
                  primaryText={<Compass direction={'SW'} height={'100%'} />} />
                <MUI.MenuItem
                  value={'W'}
                  label={<Compass direction={'W'} height={'24pt'} style={{padding:'5pt'}} />}
                  primaryText={<Compass direction={'W'} height={'100%'} />} />
                <MUI.MenuItem
                  value={'NW'}
                  label={<Compass direction={'NW'} height={'24pt'} style={{padding:'5pt'}} />}
                  primaryText={<Compass direction={'NW'} height={'100%'} />} />
              </MUI.SelectField>
            </MUI.GridTile>
          </MUI.GridList>
          </MUI.GridTile>
          <MUI.GridTile cols={1} >
          <MUI.GridList cellHeight={'64pt'} cols={1} style={{width:'100%'}}>
            <MUI.GridTile cols={1} >
              <MUI.RaisedButton label="Text[add round]" style={style} />
            </MUI.GridTile>
            {this.state.rounds.map(function(round){
              return (<MUI.GridTile cols={1}  style={{padding:'5pt'}}>
                <MUI.Paper  zDepth={2}  style={{display:'inline-block', width:'100%'}}>
                  <MUI.GridList cellHeight={'64pt'} cols={1} padding={10} style={{width:'100%'}}>
                    <MUI.GridTile cols={1} >
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
                          onRequestClose={this.handleClose}
                        />
                    </MUI.GridTile>
                    {round.sets.map(function(set){
                      return(<MUI.GridTile cols={1} >
                        {set.map(function(arrow){
                          return(<MUI.Avatar
                            color={valueConverter.color[arrow]}
                            backgroundColor={valueConverter.backgroundColor[arrow]}
                            size={30} >{arrow}</MUI.Avatar>);
                        })}
                      </MUI.GridTile>);
                    })}
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
