var React = require('react');

var TrainingTypes = require('constants/TrainingTypes.json');

var MUI = require('app/common/MaterialUI');
var API = require('api');

var Notice = require('app/common/Notice.jsx');

var style = {
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

module.exports = React.createClass({
  getInitialState: function() {
    return {seasons: [], training: {
      date: new Date(),
      arrows: {
        5: {},
        18: {},
        25: {},
        40: {}
      }
    }};
  },

  componentDidMount: function() {
    var callbacks = {
      context: this,
      success: function(seasons) {
        var current = this.state;
        current.seasons = seasons;
        this.setState(current);
      }
    };
    API.seasons.getList(callbacks);
  },

  changeNewDistance: function(event) {
    var current = this.state;
    current.newDistance = event.target.value;
  },
  setDate: function(event, date) {
    var current = this.state;
    current.training.date = date;
    this.setState(current);
  },
  setArrowCount: function(event) {
    var split = event.target.id.split('_');
    var current = this.state;
    current.training.arrows[split[1]][split[2]] = parseInt(event.target.value);
    this.setState(current);
  },
  increaseArrows: function(event) {
    var split = event.target.id.split('_');
    var current = this.state;
    if (typeof current.arrows[split[1]][split[2]] === 'undefined') {
      current.training.arrows[split[1]][split[2]] = 0;
    }
    current.training.arrows[split[1]][split[2]] += 1;
    this.setState(current);
  },
  decreaseArrows: function(event) {
    var split = event.target.id.split('_');
    var current = this.state;
    if (current.training.arrows[split[1]][split[2]] > 0) {
      current.training.arrows[split[1]][split[2]] -= 1;
    }
    this.setState(current);
  },
  createNewDistance: function() {
    var current = this.state;
    if (typeof current.newDistance === 'undefined') {
      this.showMessage("Text[no empty distance]", "ERROR");
      return;
    }
    if (typeof current.training.arrows[current.newDistance] === 'undefined') {
      current.training.arrows[current.newDistance] = {};
      delete current.newDistance;
    }
    this.setState(current);
  },
  showMessage: function(message, type) {
    // TODO move this to a module or class, has been used in several places already
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

  submitTraining: function() {
    var callbacks = {
      context: this,
      success: function() {
        this.showMessage("Text[training saved]", "MESSAGE");
        this.props.onClose(true);
        this.setState(this.getInitialState());
      },
      warning: function() {
        this.showMessage("Text[training saved]", "WARNING");
      },
      error: function() {
        this.showMessage("Text[training not saved]", "ERROR");
      }
    };
    API.trainings.save(this.state.training, callbacks);
  },

  changeSeason: function(event, index, value) {
    var current = this.state;
    current.training.seasonId = value;
    this.setState(current);
  },

  render: function() {
    var seasons = this.state.seasons.map(function(season, index) {
      return (
        <MUI.MenuItem key={'aaa-newAssessmentSeason_' + index} value={season.id} primaryText={season.name} />
      );
    });

    // TODO move this to a component, used in 2 places already
    var headers = TrainingTypes.map(function(type) {
      return (
        <MUI.TableHeaderColumn key={'newTrainingCardType_' + type}>
          Text[{type}]
        </MUI.TableHeaderColumn>
      );
    });
    var row = {};
    // TODO move styles up, too much repetition
    for (var distance in this.state.training.arrows) {
      row[distance] = TrainingTypes.map(function(type) {
        return (
          <MUI.TableRowColumn key={'newTrainingCard_' + distance + '_' + type}>
            <MUI.IconButton id={'newTrainingInc_' + distance + '_' + type} tabIndex={-1} style={style.arrowCountButton} iconStyle={style.arrowCountIcon} onTouchTap={this.decreaseArrows}>
              <MUI.icons.content.remove_circle/>
            </MUI.IconButton>
            <MUI.TextField
              style={style.arrowCountField}
              inputStyle={style.arrowCountInput}
              id={'newTrainingCardText_' + distance + '_' + type}
              value={this.state.training.arrows[distance][type]}
              onChange={this.setArrowCount} />
            <MUI.IconButton id={'newTrainingDec_' + distance + '_' + type} tabIndex={-1} style={style.arrowCountButton} iconStyle={style.arrowCountIcon} onTouchTap={this.increaseArrows}>
              <MUI.icons.content.add_circle/>
            </MUI.IconButton>
          </MUI.TableRowColumn>
        );
      }, this);
    }

    var rows = [];
    for (var distance in row) {
      rows.push(
        <MUI.TableRow key={'newTrainingCardType_' + distance + '_distance'}>
          <MUI.TableRowColumn>{distance}</MUI.TableRowColumn>
          {row[distance]}
        </MUI.TableRow>
      );
    }
    return (
      <MUI.Card>
        <MUI.CardHeader
          title="Text[new training title]"
          subtitle="Text[new training subtitle]" />
        <MUI.CardText>
          <MUI.DatePicker
            id={'aaa-newTrainingDate'}
            floatingLabelText="Text[Training date]"
            autoOk={true}
            value={this.state.training.date}
            onChange={this.setDate} />
          <MUI.SelectField
            style={{width: '100%'}}
            id={'aaa-newTrainingSeason'}
            value={this.state.training.seasonId}
            onChange={this.changeSeason}
            floatingLabelText={"Text[season]"} >
            {/* FIXME temporary fix for https://github.com/callemall/material-ui/issues/2446*/}
            <MUI.MenuItem value={'undefined'} primaryText={" "} />
            {seasons}
          </MUI.SelectField>
          <MUI.Table>
            <MUI.TableHeader displaySelectAll={false} adjustForCheckbox={false} >
              <MUI.TableRow>
                <MUI.TableHeaderColumn>Text['distance header']</MUI.TableHeaderColumn>
                {headers}
              </MUI.TableRow>
            </MUI.TableHeader>
            <MUI.TableBody displayRowCheckbox={false} >
              {rows}
              <MUI.TableRow>
                <MUI.TableRowColumn colSpan={'2'}>
                  <MUI.TextField
                    style={{width: '70%'}}
                    id={'newTrainingCardNewDistance'}
                    value={this.state.newDistance}
                    floatingLabelText="Text[new distance]"
                    onChange={this.changeNewDistance} />
                  <MUI.IconButton onTouchTap={this.createNewDistance}>
                    <MUI.icons.content.add_box/>
                  </MUI.IconButton>
                </MUI.TableRowColumn>
              </MUI.TableRow>
            </MUI.TableBody>
          </MUI.Table>
        </MUI.CardText>

        <MUI.CardActions style={{textAlign: 'right'}}>
          <MUI.FloatingActionButton mini={true} secondary={true} style={{margin: '5pt'}} onTouchTap={this.props.onClose}>
            <MUI.icons.navigation.cancel />
          </MUI.FloatingActionButton>
          <MUI.FloatingActionButton style={{margin: '5pt'}} onTouchTap={this.submitTraining}>
            <MUI.icons.action.backup />
          </MUI.FloatingActionButton>
        </MUI.CardActions>
        {this.state.message ? <Notice message={this.state.message} onClose={this.hideMessage}/> : null}
      </MUI.Card>
    );
  }
});
