const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const PageSwitcher = require('app/common/PageSwitcher');
const BaseLayout = require('app/common/BaseLayout.jsx');
const Waiting = require('app/common/Waiting.jsx');
const Notice = require('app/common/Notice.jsx');

const TrainingTile = require('app/trainings/TrainingTile.jsx');
const NewTrainingCard = require('app/trainings/NewTrainingCard.jsx');

const styles = {
  gridList: {
    width: '100%'
  }
};

const TrainingsPage = React.createClass({
  propTypes: {
    switcher: React.PropTypes.instanceOf(PageSwitcher),
    userAgent: React.PropTypes.string,
    t: React.PropTypes.func
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
    API.trainings.getList(callbacks);
  },
  getInitialState: function() {
    return {editTraining: false};
  },
  componentDidMount: function() {
    this.updateTrainingList();
  },
  deleteTraining: function(trainingId) {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function() {
        this.showMessage(t('training:messages.deleted'), "MESSAGE");
        this.updateTrainingList();
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
      this.updateTrainingList();
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

    return (
      <BaseLayout
        switcher={this.props.switcher}
        layoutName="trainingsPage"
        userAgent={this.props.userAgent}
        title={t('training:title')} >
        <MUI.GridList
          cellHeight={'unset'} cols={4}
          padding={10} style={styles.gridList} >
          <MUI.GridTile style={{padding: '5pt'}}
            cols={this.state.editTraining ? 2 : 4} >
            {(editTraining || newTrainingButton)}
          </MUI.GridTile>
            {(trainings || <Waiting />)}
        </MUI.GridList>
        {message}
      </BaseLayout>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['training'], TrainingsPage);
