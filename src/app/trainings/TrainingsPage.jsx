const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const ReactPageSwitcherType = require('global/ReactPageSwitcherType');
const BaseLayout = require('app/common/BaseLayout');
const Waiting = require('app/common/Waiting');

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
        if(API.isAuthError(error)){
          this.showMessage(t('common:messages.notLoggedIn'), "ERROR");
          this.props.switcher.switchTo('loginPage');
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
        if(API.isAuthError(error)){
          this.showMessage(t('common:messages.notLoggedIn'), "ERROR");
          this.props.switcher.switchTo('loginPage');
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
        if(API.isAuthError(error)){
          this.showMessage(t('common:messages.notLoggedIn'), "ERROR");
          this.props.switcher.switchTo('loginPage');
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
    var current = this.state;
    current.editTraining = false;
    this.setState(current);
    if (refresh) {
      this.updateAll();
    }
  },
  newTraining: function() {
    var current = this.state;
    current.editTraining = true;
    this.setState(current);
  },
  showMessage: function(message, type) {
    if(typeof this.messenger !== 'undefined'){
      this.messenger.sendMessage({
        text: message,
        open: true,
        type: type
      });
    }
  },
  subscribe: function(sender) {
    this.messenger = sender;
  },
  render: function() {
    const t = this.props.t;
    var trainings;
    if (typeof this.state.trainings !== 'undefined') {
      trainings = this.state.trainings.map(function(training, index) {
        return (
          <MUI.GridTile
            key={['aaa-training_', index].join('')}
            style={MUI.styles.GridTile} cols={2} >
            <TrainingTile data={training} onDelete={this.deleteTraining} />
          </MUI.GridTile>
        );
      }, this);
    }

    var newTrainingButton = (
      <MUI.RaisedButton
        label={t('training:newTraining.button')}
        fullWidth={true}
        primary={true}
        onTouchTap={this.newTraining} />
    );

    var previousButton = '';
    if(typeof this.state.previous !== 'undefined'){
      previousButton = (
        <MUI.RaisedButton
          label={t('training:previousButton')}
          fullWidth={true}
          backgroundColor={MUI.colors.blue600}
          labelColor={MUI.palette.alternateTextColor}
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
          backgroundColor={MUI.colors.blue600}
          labelColor={MUI.palette.alternateTextColor}
          labelPosition={'before'}
          disabled={(this.state.next === null)}
          onTouchTap={this.moveToNextPage}
          icon={<MUI.icons.navigation.chevron_right />} />
      );
    }

    return (
      <BaseLayout
        switcher={this.props.switcher}
        userAgent={this.props.userAgent}
        styleProvider={this.props.styleProvider}
        messageSubscriber={this}
        layoutName="trainingsPage"
        title={t('training:appBarTitle')} >
        <MUI.GridList cellHeight={'auto'} cols={4} padding={10} style={styles.gridList} >
          <MUI.GridTile style={MUI.styles.GridTile}
            cols={4} >
            {newTrainingButton}
          </MUI.GridTile>

          <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
            <MUI.GridList
              cellHeight={'auto'}
              cols={4}
              padding={10}
              style={styles.gridList} >
            {(trainings || <MUI.GridTile cols={4} ><Waiting /></MUI.GridTile>)}
            </MUI.GridList>
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
            <MUI.GridList cols={4} padding={10} style={styles.gridList} >
              <MUI.GridTile style={MUI.styles.GridTile}>
                {previousButton}
              </MUI.GridTile>
              <MUI.GridTile>{''}</MUI.GridTile>
              <MUI.GridTile>{''}</MUI.GridTile>
              <MUI.GridTile style={MUI.styles.GridTile}>
                {nextButton}
              </MUI.GridTile>
            </MUI.GridList>
          </MUI.GridTile>
        </MUI.GridList>
        <NewTrainingCard
          messenger={this.messenger}
          open={this.state.editTraining}
          onRequestClose={this.closeEdit} />
      </BaseLayout>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['training'], TrainingsPage);
