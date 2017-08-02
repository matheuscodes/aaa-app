import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

import MessageablePage from 'components/MessageablePage';

const MUI = require('app/common/MaterialUI');
const API = require('api');
const i18nextReact = require('global/i18nextReact');

const Waiting = require('app/common/Waiting');
const ReactPageSwitcherType = require('global/ReactPageSwitcherType');

const BaseLayout = require('app/common/BaseLayout');
const AssessmentTile = require('app/assessments/AssessmentTile');
const NewAssessmentDialog = require('app/assessments/NewAssessmentDialog');

const styles = {
  gridList: {
    width: '100%'
  }
};

@autobind
class AssessmentsPage extends MessageablePage {

  constructor(props) {
    super(props)
    this.state = {editAssessment: false, currentPage: 0};
  }

  updateAssessmentList() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function(list) {
        console.log(list);
        var current = this.state;
        current.editAssessment = false;
        delete current.assessmentId;
        current.assessments = list;
        this.setState(current);
      },
      error: function(error) {
        this.showMessage(t('assessment:messages.listError'), "ERROR");
        if(API.isAuthError(error)){
          this.props.switcher.switchTo('loginPage');
        }
      }
    };
    API.assessments.getList(this.state.currentPage,callbacks);
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
        this.showMessage(t('assessment:messages.listError'), "ERROR");
        if(API.isAuthError(error)){
          this.props.switcher.switchTo('loginPage');
        }
      }
    };
    if(this.state.currentPage > 0){
      API.assessments.getList(this.state.currentPage - 1,callbacks);
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
        this.showMessage(t('assessment:messages.listError'), "ERROR");
        if(API.isAuthError(error)){
          this.props.switcher.switchTo('loginPage');
        }
      }
    };
    API.assessments.getList(this.state.currentPage + 1,callbacks);
  }

  componentDidMount() {
    this.updateAll();
  }

  updateAll() {
    this.updateAssessmentList();
    this.updateRest();
  }

  updateRest() {
    this.updateNextList();
    this.updatePreviousList();
  }

  moveToNextPage(){
    var current = this.state;
    current.currentPage += 1;
    current.assessments = current.next;
    current.next = null;
    current.previous = null;
    this.setState(current);
    this.updateRest();
  }

  moveToPreviousPage(){
    var current = this.state;
    current.currentPage -= 1;
    current.assessments = current.previous;
    current.next = null;
    if(current.currentPage > 0){
      current.previous = null
    } else {
      delete current.previous;
    }
    this.setState(current);
    this.updateRest();
  }

  closeEdit(refresh) {
    if (refresh) {
      this.updateAll();
    } else {
      var current = this.state;
      current.editAssessment = false;
      delete current.assessmentId;
      this.setState(current);
    }
  }

  editAssessment(assessmentId) {
    var current = this.state;
    current.editAssessment = true;
    current.assessmentId = assessmentId;
    this.setState(current);
  }

  newAssessment() {
    var current = this.state;
    current.editAssessment = true;
    this.setState(current);
  }

  deleteAssessment(assessmentId) {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function() {
        this.showMessage(t('assessment:messages.deleted'), "MESSAGE");
        this.updateAssessmentList();
      },
      warning: function() {
        this.showMessage(t('assessment:messages.deleted'), "WARNING");
      },
      error: function() {
        this.showMessage(t('assessment:messages.deletedError'), "ERROR");
      }
    };
    API.assessments.delete(assessmentId, callbacks);
  }

  render() {
    const t = this.props.t;

    var assessments = '';
    if (typeof this.state.assessments !== 'undefined') {
      assessments = this.state.assessments.map(function(assessment, index) {
        return (
          <MUI.GridTile
            key={['aaa-assessment_', assessment.id].join('')}
            style={MUI.styles.GridTile}
            cols={2} >
            <AssessmentTile data={assessment} onDelete={this.deleteAssessment}/>
          </MUI.GridTile>
        );
      }, this);
    }

    var newAssessmentButton = (
      <MUI.RaisedButton
        label={t('assessment:newAssessment.button')}
        fullWidth={true}
        primary={true}
        onTouchTap={this.newAssessment} />
    );

    var previousButton = '';
    if(typeof this.state.previous !== 'undefined'){
      previousButton = (
        <MUI.RaisedButton
          label={t('assessment:previousButton')}
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
          label={t('assessment:nextButton')}
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
        layoutName="assessmentsPage"
        userAgent={this.props.userAgent}
        styleProvider={this.props.styleProvider}
        messageSubscriber={this}
        title={t('assessment:appBarTitle')} >
        <MUI.GridList
          cellHeight={'auto'}
          cols={6}
          padding={10}
          style={styles.gridList} >
          <MUI.GridTile style={MUI.styles.GridTile}
            cols={6} >
            {newAssessmentButton}
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={6} >
            <MUI.GridList
              cellHeight={'auto'}
              cols={6}
              padding={10}
              style={styles.gridList} >
            {(assessments || <MUI.GridTile cols={6} ><Waiting /></MUI.GridTile>)}
            </MUI.GridList>
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={6} >
            <MUI.GridList cols={4} padding={10} style={styles.gridList} >
              <MUI.GridTile style={MUI.styles.GridTile}>
                {previousButton}
              </MUI.GridTile>
              <MUI.GridTile style={MUI.styles.GridTile} key={1}>{''}</MUI.GridTile>
              <MUI.GridTile style={MUI.styles.GridTile} key={2}>{''}</MUI.GridTile>
              <MUI.GridTile style={MUI.styles.GridTile}>
                {nextButton}
              </MUI.GridTile>
            </MUI.GridList>
          </MUI.GridTile>
        </MUI.GridList>
        <NewAssessmentDialog
          open={this.state.editAssessment}
          messenger={this}
          style={{styleProvider:this.props.styleProvider}}
          onRequestClose={this.closeEdit} />
      </BaseLayout>
    );
  }
}

module.exports = i18nextReact.setupTranslation(['assessment'], AssessmentsPage);
