const React = require('react');

const MUI = require('app/common/MaterialUI');
const API = require('api');
const i18nextReact = require('global/i18nextReact');

const Notice = require('app/common/Notice');

const Thermometer = require('svg/icon/Thermometer');
const Windmills = require('svg/icon/Windmills');
const ArcherAnchored = require('svg/icon/ArcherAnchored');

const AssessmentArrowTable = require('app/assessments/AssessmentArrowTable');
const NewAssessmentEnd = require('app/assessments/NewAssessmentEnd');
const DirectionSelector = require('app/common/DirectionSelector');
const WeatherSelector = require('app/common/WeatherSelector');

const style = {
  arrowCountField: {
    width: '29%',
    padding: '0 5% 0 5%'
  },
  arrowCountButton: {
    width: '30%',
    height: '30%',
    padding: 0
  },
  arrowCountInput: {
    textAlign: 'center',
    fontSize: '80%'
  },
  arrowCountIcon: {
    width: '100%',
    height: '100%',
    color: MUI.palette.accent1Color
  }
};

const NewAssessmentCard = React.createClass({
  propTypes: {
    onClose: React.PropTypes.func,
    t: React.PropTypes.func
  },
  getInitialState: function() {
    var today = new Date();
    today.setHours(18);
    return {
      date: today,
      targets: [],
      seasons: [],
      events: [],
      rounds: []
    };
  },
  componentDidMount: function() {
    var callbacks = {
      context: this,
      success: function(targets) {
        var current = this.state;
        current.targets = targets;

        var callbacks = {
          context: this,
          success: function(seasons) {
            current.seasons = seasons;
            this.setState(current);
          }
        };
        API.seasons.getList(callbacks);
      }
    };
    API.assessments.getTargets(callbacks);
  },
  changeDate: function(event, date) {
    var current = this.state;
    current.date = date;
    current.date.setHours(18);
    this.setState(current);
  },
  changeDistance: function(event) {
    var current = this.state;
    current.distance = event.target.value;
  },
  changeTemperature: function(event) {
    var current = this.state;
    current.temperature = event.target.value;
  },
  changeWindSpeed: function(event) {
    var current = this.state;
    current.windSpeed = event.target.value;
  },
  changeSeason: function(event, index, value) {
    var current = this.state;
    current.seasonId = value;
    this.setState(current);
    var callbacks = {
      context: this,
      success: function(events) {
        var current = this.state;
        delete current.eventId;
        current.events = events;
        this.setState(current);
      }
    };
    var season = this.state.seasons[index - 1];
    API.events.getList(callbacks, season.start, season.end);
  },
  changeTarget: function(event, index, value) {
    var current = this.state;
    current.targetId = value;
    current.target = current.targets[index - 1];
    this.setState(current);
  },
  changeEvent: function(event, index, value) {
    var current = this.state;
    current.eventId = value;
    this.setState(current);
  },
  changeWeather: function(event, index, value) {
    var current = this.state;
    current.weather = value;
    this.setState(current);
  },
  changeWindDirection: function(event, index, value) {
    var current = this.state;
    current.windDirection = value;
    this.setState(current);
  },
  changeShootDirection: function(event, index, value) {
    var current = this.state;
    current.shootDirection = value;
    this.setState(current);
  },
  addRound: function() {
    var current = this.state;
    current.rounds.push({ends: []});
    this.setState(current);
  },
  addEnd: function(roundIndex, end) {
    var current = this.state;
    // TODO handle array out of bounds exceptions.
    current.rounds[roundIndex].ends.push(end);
    this.setState(current);
  },
  deleteEnd: function(roundIndex, endIndex) {
    var current = this.state;
    // TODO handle array out of bounds exceptions.
    current.rounds[roundIndex].ends.splice(endIndex, 1);
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
  submitAssessment: function() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function() {
        this.showMessage(t('assessment:messages.newSaved'), "MESSAGE");
        this.setState(this.getInitialState());
        this.props.onClose(true);
      },
      warning: function() {
        this.showMessage(t('assessment:messages.newSaved'), "WARNING");
      },
      error: function() {
        this.showMessage(t('assessment:messages.newError'), "ERROR");
      }
    };
    // FIXME separate assessment from state.
    API.assessments.save(this.state, callbacks);
  },
  render: function() {
    const t = this.props.t;
    var seasons = this.state.seasons.map(function(season, index) {
      return (
        <MUI.MenuItem
          key={'aaa-newAssessmentSeason_' + index}
          value={season.id}
          primaryText={season.name} />
      );
    });

    var targets = this.state.targets.map(function(target, index) {
      return (
        <MUI.MenuItem
          key={'aaa-newAssessmentTarget_' + index}
          value={target.id}
          primaryText={target.name} />
      );
    });

    var events = this.state.events.map(function(event, index) {
      return (
        <MUI.MenuItem
          key={'aaa-newAssessmentEvent_' + index}
          value={event.id}
          primaryText={event.name} />
      );
    });

    var message = '';
    if (typeof this.state.message !== 'undefined') {
      message = (
        <Notice message={this.state.message} onClose={this.hideMessage} />
      );
    }

    return (
      <MUI.Card>
        <MUI.CardHeader
          title={t('assessment:newAssessment.title')}
          subtitle={t('assessment:newAssessment.subtitle')} />
        <MUI.CardText>
        <MUI.GridList
          cellHeight={'64pt'}
          cols={2}
          padding={10}
          style={{width: '100%'}}>
          <MUI.GridTile cols={1} >
          <MUI.GridList
            cellHeight={'64pt'}
            cols={4}
            padding={10}
            style={{width: '100%'}}>
            <MUI.GridTile cols={4} >
              <MUI.SelectField
                style={{width: '100%'}}
                id={'aaa-newAssessmentSeason'}
                value={this.state.seasonId}
                onChange={this.changeSeason}
                floatingLabelText={
                  t('assessment:newAssessment.seasonSelectField.label')
                } >
                {/* FIXME temporary fix
                  See https://github.com/callemall/material-ui/issues/2446*/}
                <MUI.MenuItem value={'undefined'} primaryText={" "} />
                {seasons}
              </MUI.SelectField>
            </MUI.GridTile>
            <MUI.GridTile cols={2} >
              <MUI.DatePicker
                style={{width: '100%'}}
                id={'aaa-newAssessmentDate'}
                floatingLabelText={
                  t('assessment:newAssessment.dateDatepicker.label')
                }
                autoOk={true}
                value={this.state.date}
                onChange={this.changeDate} />
            </MUI.GridTile>
            <MUI.GridTile cols={2} >
              <MUI.TextField
                style={{width: '100%'}}
                id={'aaa-newAssessmentDistance'}
                hintText={t('assessment:newAssessment.distanceTextField.hint')}
                floatingLabelText={
                  t('assessment:newAssessment.distanceTextField.label')
                }
                defaultValue={this.state.distance}
                onChange={this.changeDistance} />
            </MUI.GridTile>
            <MUI.GridTile cols={4} >
              <MUI.SelectField
                style={{width: '100%'}}
                id={'aaa-newAssessmentTarget'}
                value={this.state.targetId}
                onChange={this.changeTarget}
                floatingLabelText={
                  t('assessment:newAssessment.targetSelectField.label')
                } >
                {/* FIXME temporary fix
                  See https://github.com/callemall/material-ui/issues/2446*/}
                <MUI.MenuItem value={'undefined'} primaryText={" "} />
                {targets}
              </MUI.SelectField>
            </MUI.GridTile>
            <MUI.GridTile cols={4} >
              <MUI.SelectField
                style={{width: '100%'}}
                id={'aaa-newAssessmentEvent'}
                value={this.state.eventId}
                onChange={this.changeEvent}
                floatingLabelText={
                  t('assessment:newAssessment.eventSelectField.label')
                } >
                {/* FIXME temporary fix
                  See https://github.com/callemall/material-ui/issues/2446*/}
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
                style={{width: '100%'}}
                id={'aaa-newAssessmentTemperature'}
                hintText={
                  t('assessment:newAssessment.temperatureTextField.hint')
                }
                floatingLabelText={
                  t('assessment:newAssessment.temperatureTextField.label')
                }
                defaultValue={this.state.temperature}
                onChange={this.changeTemperature} />
            </MUI.GridTile>
            <MUI.GridTile cols={1} >
              <WeatherSelector
                style={{width: '100%'}}
                value={this.state.weather}
                onChange={this.changeWeather}
                hintText={t('assessment:newAssessment.weatherSelector.hint')} />
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
                style={{width: '100%'}}
                id={'aaa-newAssessmentWindSpeed'}
                hintText={
                  t('assessment:newAssessment.windTextField.hint')
                }
                floatingLabelText={
                  t('assessment:newAssessment.windTextField.label')
                }
                defaultValue={this.state.windSpeed}
                onChange={this.changeWindSpeed} />
            </MUI.GridTile>
            <MUI.GridTile cols={1} >
              <DirectionSelector
                style={{width: '100%'}}
                type={'WindDirection'}
                value={this.state.windDirection}
                onChange={this.changeWindDirection}
                hintText={
                  t('assessment:newAssessment.windDirectionSelector.hint')
                } />
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
              <DirectionSelector
                style={{width: '100%'}}
                type={'ShootDirection'}
                value={this.state.shootDirection}
                onChange={this.changeShootDirection}
                hintText={
                  t('assessment:newAssessment.shootDirectionSelector.hint')
                } />
            </MUI.GridTile>
          </MUI.GridList>
          </MUI.GridTile>
          <MUI.GridTile cols={1} >
          <MUI.GridList cellHeight={'64pt'} cols={1} style={{width: '100%'}}>
            <MUI.GridTile style={{padding: 5}} cols={1} >
              <MUI.RaisedButton
                label={t('assessment:addRound')}
                style={style}
                onTouchTap={this.addRound}/>
            </MUI.GridTile>
            {this.state.rounds.map(function(round, index) {
              round.index = index;
              return (<MUI.GridTile cols={1} style={{padding: '5pt'}}>
                <MUI.Paper
                  zDepth={2}
                  style={{display: 'inline-block', width: '100%'}}>
                  <MUI.GridList
                    cellHeight={'64pt'}
                    cols={1}
                    padding={10}
                    style={{width: '100%'}}>
                    <MUI.GridTile style={{padding: 10}} cols={1} >
                      <NewAssessmentEnd
                        roundIndex={round.index}
                        addEnd={this.addEnd} />
                    </MUI.GridTile>
                    <MUI.GridTile style={{padding: 5}} cols={1} >
                      <AssessmentArrowTable
                        data={round}
                        deleteEnd={this.deleteEnd} />
                    </MUI.GridTile>
                  </MUI.GridList>
                </MUI.Paper>
              </MUI.GridTile>);
            }, this)}
          </MUI.GridList>
          </MUI.GridTile>
          </MUI.GridList>
        </MUI.CardText>

        <MUI.CardActions style={{textAlign: 'right'}}>
          <MUI.FloatingActionButton
            mini={true}
            secondary={true}
            style={{margin: '5pt'}}
            onTouchTap={this.props.onClose}>
            <MUI.icons.navigation.cancel />
          </MUI.FloatingActionButton>
          <MUI.FloatingActionButton
            style={{margin: '5pt'}}
            onTouchTap={this.submitAssessment}>
            <MUI.icons.action.backup />
          </MUI.FloatingActionButton>
        </MUI.CardActions>
        {message}
      </MUI.Card>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['assessment'],
                                               NewAssessmentCard);
