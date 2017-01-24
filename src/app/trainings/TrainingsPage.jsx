const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const ReactPageSwitcherType = require('global/ReactPageSwitcherType');
const BaseLayout = require('app/common/BaseLayout');
const Waiting = require('app/common/Waiting');
const Notice = require('app/common/Notice');

const TrainingTile = require('app/trainings/TrainingTile');
const NewTrainingCard = require('app/trainings/NewTrainingCard');

const styles = {
  gridList: {
    width: '100%'
  }
};

const TrainingsPage = React.createClass({
  propTypes: {
    switcher: ReactPageSwitcherType.isRequired,
    userAgent: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.bool]).isRequired,
    t: React.PropTypes.func.isRequired
  },
  updateTrainingList: function() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function(list) {
        var current = this.state;
        current.trainings = list;
        current.editTraining = false;
        this.setState(current);
      },
      error: function(error) {
        if (error instanceof ReferenceError) {
          if (error.message === 'Missing Token.') {
            this.props.switcher.switchTo('loginPage');
          }
        }
        this.showMessage(t('training:messages.listError'), "ERROR");
      }
    };
    API.trainings.getList(this.state.currentPage,callbacks);
  },
  updatePreviousList: function() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function(list) {
        var current = this.state;
        current.previous = list;
        this.setState(current);
      },
      error: function(error) {
        if (error instanceof ReferenceError) {
          if (error.message === 'Missing Token.') {
            this.props.switcher.switchTo('loginPage');
          }
        }
        this.showMessage(t('training:messages.listError'), "ERROR");
      }
    };
    if(this.state.currentPage > 0){
      API.trainings.getList(this.state.currentPage - 1,callbacks);
    } else {
      var current = this.state;
      delete current.previous;
      this.setState(current);
    }
  },
  updateNextList: function() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function(list) {
        var current = this.state;
        if(list.length > 0){
          current.next = list;
        } else {
          delete current.next;
        }
        this.setState(current);
      },
      error: function(error) {
        if (error instanceof ReferenceError) {
          if (error.message === 'Missing Token.') {
            this.props.switcher.switchTo('loginPage');
          }
        }
        this.showMessage(t('training:messages.listError'), "ERROR");
      }
    };
    API.trainings.getList(this.state.currentPage + 1,callbacks);
  },
  getInitialState: function() {
    return {editTraining: false, currentPage:0};
  },
  componentDidMount: function() {
    this.updateAll();
  },
  updateAll: function() {
    this.updateTrainingList();
    this.updateRest();
  },
  updateRest: function() {
    this.updateNextList();
    this.updatePreviousList();
  },
  moveToNextPage(){
    var current = this.state;
    current.currentPage += 1;
    current.trainings = current.next;
    current.next = null;
    current.previous = null;
    this.setState(current);
    this.updateRest();
  },
  moveToPreviousPage(){
    var current = this.state;
    current.currentPage -= 1;
    current.trainings = current.previous;
    current.next = null;
    if(current.currentPage > 0){
      current.previous = null
    } else {
      delete current.previous;
    }
    this.setState(current);
    this.updateRest();
  },
  deleteTraining: function(trainingId) {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function() {
        this.showMessage(t('training:messages.deleted'), "MESSAGE");
        this.updateAll();
      },
      warning: function() {
        this.showMessage(t('training:messages.deleted'), "WARNING");
      },
      error: function() {
        this.showMessage(t('training:messages.deletedError'), "ERROR");
      }
    };
    API.trainings.delete(trainingId, callbacks);
  },
  closeEdit: function(refresh) {
    if (refresh) {
      this.updateAll();
    } else {
      var current = this.state;
      current.editTraining = false;
      this.setState(current);
    }
  },
  newTraining: function() {
    var current = this.state;
    current.editTraining = true;
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
  render: function() {
    const t = this.props.t;
    var trainings;
    if (typeof this.state.trainings !== 'undefined') {
      trainings = this.state.trainings.map(function(training, index) {
        return (
          <MUI.GridTile
            key={['aaa-training_', index].join('')}
            style={{padding: '5pt'}} cols={2} >
            <TrainingTile data={training} onDelete={this.deleteTraining} />
          </MUI.GridTile>
        );
      }, this);
    }

    var message = '';
    if (typeof this.state.message !== 'undefined') {
      message = (
        <Notice message={this.state.message} onClose={this.hideMessage} />
      );
    }

    var newTrainingButton = (
      <MUI.RaisedButton
        label={t('training:newTraining.button')}
        fullWidth={true}
        primary={true}
        onTouchTap={this.newTraining} />
    );

    var editTraining = '';
    if (this.state.editTraining) {
      editTraining = (<NewTrainingCard onClose={this.closeEdit} />);
    }

    var previousButton = '';
    if(typeof this.state.previous !== 'undefined'){
      previousButton = (
        <MUI.RaisedButton
          label={t('training:previousButton')}
          fullWidth={true}
          primary={true}
          disabled={(this.state.previous === null)}
          onTouchTap={this.moveToPreviousPage}
          icon={<MUI.icons.navigation.chevron_left />} />
      );
    }

    var nextButton = '';
    if(typeof this.state.next !== 'undefined'){
      nextButton = (
        <MUI.RaisedButton
          label={t('training:nextButton')}
          fullWidth={true}
          primary={true}
          labelPosition={'before'}
          disabled={(this.state.next === null)}
          onTouchTap={this.moveToNextPage}
          icon={<MUI.icons.navigation.chevron_right />} />
      );
    }

    return (
      <BaseLayout
        switcher={this.props.switcher}
        layoutName="trainingsPage"
        userAgent={this.props.userAgent}
        title={t('training:appBarTitle')} >
        <MUI.GridList cellHeight={'auto'} cols={4} padding={10} style={styles.gridList} >
          <MUI.GridTile style={{padding: '5pt'}}
            cols={this.state.editTraining ? 2 : 4} >
            {(editTraining || newTrainingButton)}
          </MUI.GridTile>

          <MUI.GridTile cols={this.state.editTraining ? 2 : 4} >
            <MUI.GridList
              cellHeight={'auto'}
              cols={this.state.editTraining ? 2 : 4}
              padding={10}
              style={styles.gridList} >
            {(trainings || <MUI.GridTile cols={4} ><Waiting /></MUI.GridTile>)}
            </MUI.GridList>
          </MUI.GridTile>
          <MUI.GridTile cols={4} >
            <MUI.GridList cols={4} padding={10} style={styles.gridList} >
              {this.state.editTraining ?
                [<MUI.GridTile key={1}>{''}</MUI.GridTile>,
                <MUI.GridTile key={2}>{''}</MUI.GridTile>] : []}
              <MUI.GridTile style={{padding: '5pt'}}>
                {previousButton}
              </MUI.GridTile>
              {this.state.editTraining === false ?
                [<MUI.GridTile key={1}>{''}</MUI.GridTile>,
                <MUI.GridTile key={2}>{''}</MUI.GridTile>] : []}
              <MUI.GridTile style={{padding: '5pt'}}>
                {nextButton}
              </MUI.GridTile>
            </MUI.GridList>
          </MUI.GridTile>
        </MUI.GridList>
        {message}
      </BaseLayout>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['training'], TrainingsPage);
