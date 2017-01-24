const React = require('react');

const TrainingTypes = require('constants/TrainingTypes');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const Notice = require('app/common/Notice');

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

const NewTrainingCard = React.createClass({
  propTypes: {
    onClose: React.PropTypes.func,
    t: React.PropTypes.func
  },
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
    var arrows = current.training.arrows;
    arrows[split[1]][split[2]] = parseInt(event.target.value, 10);
    current.training.arrows = arrows; // FIXME Needed?
    this.setState(current);
  },
  increaseArrows: function(event) {
    var split = event.target.id.split('_');
    var current = this.state;
    if (typeof current.training.arrows[split[1]][split[2]] === 'undefined') {
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
    const t = this.props.t;

    var current = this.state;
    if (typeof current.newDistance === 'undefined') {
      this.showMessage(t('training:messages.emptyError'), "ERROR");
      return;
    }
    if (typeof current.training.arrows[current.newDistance] === 'undefined') {
      current.training.arrows[current.newDistance] = {};
      delete current.newDistance;
    }
    this.setState(current);
  },
  showMessage: function(message, type) {
    // TODO move this to a module or class
    // It has been used in several places already
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
    const t = this.props.t;

    var callbacks = {
      context: this,
      success: function() {
        this.showMessage(t('training:messages.newSaved'), "MESSAGE");
        this.props.onClose(true);
        this.setState(this.getInitialState());
      },
      warning: function() {
        this.showMessage(t('training:messages.newSaved'), "WARNING");
      },
      error: function() {
        this.showMessage(t('training:messages.newError'), "ERROR");
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
    const t = this.props.t;
    var seasons = this.state.seasons.map(function(season, index) {
      return (
        <MUI.MenuItem
          key={['aaa-newAssessmentSeason_', index].join('')}
          value={season.id}
          primaryText={season.name} />
      );
    });

    // TODO move this to a component, used in 2 places already
    var headers = TrainingTypes.map(function(type) {
      return (
        <MUI.TableHeaderColumn key={['newTrainingCardType_', type].join('')}>
          {t(['training:trainingTypes.', type].join(''))}
        </MUI.TableHeaderColumn>
      );
    });

    var row = {};
    // TODO move styles up, too much repetition
    Object.keys(this.state.training.arrows).forEach(function(distance) {
      row[distance] = TrainingTypes.map(function(type) {
        return (
          <MUI.TableRowColumn
            key={['newTrainingCard_', distance, '_', type].join('')}>
            <MUI.IconButton
              id={['newTrainingInc_', distance, '_', type].join('')}
              tabIndex={-1}
              style={style.arrowCountButton}
              iconStyle={style.arrowCountIcon}
              onTouchTap={this.decreaseArrows}>
              <MUI.icons.content.remove_circle/>
            </MUI.IconButton>
            <MUI.TextField
              style={style.arrowCountField}
              inputStyle={style.arrowCountInput}
              id={['newTrainingCardText_', distance, '_', type].join('')}
              defaultValue={this.state.training.arrows[distance][type]}
              onChange={this.setArrowCount} />
            <MUI.IconButton
              id={['newTrainingDec_', distance, '_', type].join('')}
              tabIndex={-1}
              style={style.arrowCountButton}
              iconStyle={style.arrowCountIcon}
              onTouchTap={this.increaseArrows}>
              <MUI.icons.content.add_circle/>
            </MUI.IconButton>
          </MUI.TableRowColumn>
        );
      }, this);
    }, this);

    var rows = [];
    Object.keys(row).forEach(function(distance) {
      rows.push(
        <MUI.TableRow
          key={['newTrainingCardType_', distance, '_distance'].join('')} >
          <MUI.TableRowColumn>{distance}</MUI.TableRowColumn>
          {row[distance]}
        </MUI.TableRow>
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
          title={t('training:newTraining.title')}
          subtitle={t('training:newTraining.subtitle')} />
        <MUI.CardText>
          <MUI.DatePicker
            id={'aaa-newTrainingDate'}
            floatingLabelText={t('training:newTraining.dateDatepicker.label')}
            autoOk={true}
            value={this.state.training.date}
            onChange={this.setDate} />
          <MUI.SelectField
            style={{width: '100%'}}
            id={'aaa-newTrainingSeason'}
            value={this.state.training.seasonId}
            onChange={this.changeSeason}
            floatingLabelText={
              t('training:newTraining.seasonSelectField.label')
            } >
            {seasons}
          </MUI.SelectField>
          <MUI.Table>
            <MUI.TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false} >
              <MUI.TableRow>
                <MUI.TableHeaderColumn>
                  {t('training:newTraining.headers.distance')}
                </MUI.TableHeaderColumn>
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
                    defaultValue={this.state.newDistance}
                    hintText={t('training:newTraining.distanceTextField.hint')}
                    floatingLabelText={
                      t('training:newTraining.distanceTextField.label')
                    }
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
          <MUI.FloatingActionButton
            mini={true} secondary={true}
            style={{margin: '5pt'}} onTouchTap={this.props.onClose}>
            <MUI.icons.navigation.cancel />
          </MUI.FloatingActionButton>
          <MUI.FloatingActionButton
            style={{margin: '5pt'}} onTouchTap={this.submitTraining}>
            <MUI.icons.action.backup />
          </MUI.FloatingActionButton>
        </MUI.CardActions>
        {message}
      </MUI.Card>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['training'], NewTrainingCard);
