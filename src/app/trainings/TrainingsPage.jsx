import React from 'react';
import {autobind} from 'core-decorators';

import i18nextReact from 'global/i18nextReact';
import MUI from 'app/common/MaterialUI';
import API from 'api';

import MessageablePage from 'components/MessageablePage';

import ReactPageSwitcherType from 'global/ReactPageSwitcherType';
import BaseLayout from 'app/common/BaseLayout';
import Waiting from 'app/common/Waiting';

import TrainingsPageStyle from 'app/trainings/TrainingsPage.style';

import TrainingTile from 'app/trainings/TrainingTile';
import NewTrainingDialog from 'app/trainings/NewTrainingDialog';

const styles = {
  gridList: {
    width: '100%'
  }
};

@autobind
class TrainingsPage extends MessageablePage {
  constructor(props) {
    super(props);
    this.style = new TrainingsPageStyle(this.props.styleProvider);
    this.state = {editTraining: false, currentPage:0};
  }

  updateTrainingList() {
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
  }

  updatePreviousList() {
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
  }

  updateNextList() {
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
  }

  componentDidMount() {
    this.updateAll();
  }

  updateAll() {
    this.updateTrainingList();
    this.updateRest();
  }

  updateRest() {
    this.updateNextList();
    this.updatePreviousList();
  }

  moveToNextPage(){
    var current = this.state;
    current.currentPage += 1;
    current.trainings = current.next;
    current.next = null;
    current.previous = null;
    this.setState(current);
    this.updateRest();
  }

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
  }

  deleteTraining(trainingId) {
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
  }

  closeEdit(refresh) {
    var current = this.state;
    current.editTraining = false;
    this.setState(current);
    if (refresh) {
      this.updateAll();
    }
  }

  newTraining() {
    var current = this.state;
    current.editTraining = true;
    this.setState(current);
  }

  showMessage(message, type) {
    if(typeof this.messenger !== 'undefined'){
      this.messenger.sendMessage({
        text: message,
        open: true,
        type: type
      });
    }
  }

  subscribe(sender) {
    this.messenger = sender;
  }

  render() {
    const t = this.props.t;

    let trainings;
    if (typeof this.state.trainings !== 'undefined') {
      trainings = this.state.trainings.map(function(training, index) {
        return (
          <MUI.GridTile
            key={['aaa-training_', index].join('')}
            style={MUI.styles.GridTile} cols={this.style.columns} >
            <TrainingTile data={training} onDelete={this.deleteTraining} />
          </MUI.GridTile>
        );
      }, this);
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
            <MUI.RaisedButton
              label={t('training:newTraining.button')}
              fullWidth={true}
              primary={true}
              onTouchTap={this.newTraining} />
          </MUI.GridTile>

          <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
            <MUI.GridList
              cellHeight={'auto'}
              cols={6}
              padding={10}
              style={styles.gridList} >
            {(trainings || <MUI.GridTile cols={6} ><Waiting /></MUI.GridTile>)}
            </MUI.GridList>
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={this.style.cols} >
            <MUI.GridList
              cols={this.style.cols}
              style={this.style.gridList} >
              <MUI.GridTile
                cols={this.style.buttonCols}
                style={MUI.styles.GridTile} >
                {
                  typeof this.state.previous !== 'undefined' ?
                  <MUI.RaisedButton
                    label={
                      this.style.navigationButton.text ?
                        t('training:previousButton') : ' '
                    }
                    fullWidth={true}
                    backgroundColor={MUI.colors.blue600}
                    labelColor={MUI.palette.alternateTextColor}
                    labelStyle={this.style.navigationButton.labelStyle}
                    disabled={(this.state.previous === null)}
                    onTouchTap={this.moveToPreviousPage}
                    icon={<MUI.icons.navigation.chevron_left />} /> : ''
                }
              </MUI.GridTile>
              <MUI.GridTile
                cols={this.style.separatorCols}
                style={MUI.styles.GridTile} >{''}</MUI.GridTile>
              <MUI.GridTile
                cols={this.style.buttonCols}
                style={MUI.styles.GridTile} >
                {
                  typeof this.state.next !== 'undefined' ?
                  <MUI.RaisedButton
                    label={
                      this.style.navigationButton.text ?
                        t('training:nextButton') : ' '
                    }
                    fullWidth={true}
                    backgroundColor={MUI.colors.blue600}
                    labelColor={MUI.palette.alternateTextColor}
                    labelPosition={'before'}
                    labelStyle={this.style.navigationButton.labelStyle}
                    disabled={(this.state.next === null)}
                    onTouchTap={this.moveToNextPage}
                    icon={<MUI.icons.navigation.chevron_right />} /> : ''
                }
              </MUI.GridTile>
            </MUI.GridList>
          </MUI.GridTile>
        </MUI.GridList>
        <NewTrainingDialog
          open={this.state.editTraining}
          messenger={this}
          style={this.style}
          onRequestClose={this.closeEdit} />
      </BaseLayout>
    );
  }
}

module.exports = i18nextReact.setupTranslation(['training'], TrainingsPage);
