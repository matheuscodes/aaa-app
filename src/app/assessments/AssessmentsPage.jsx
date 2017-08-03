import React from 'react';
import {autobind} from 'core-decorators';

import MessageablePage from 'components/MessageablePage';

import MUI from 'app/common/MaterialUI';
import API from 'api';
import i18nextReact from 'global/i18nextReact';

import BaseLayout from 'app/common/BaseLayout';
import AssessmentsPageStyle from 'app/assessments/AssessmentsPage.style';
import AssessmentsGrid from 'app/assessments/AssessmentsGrid';
import NewAssessmentDialog from 'app/assessments/NewAssessmentDialog';

@autobind
class AssessmentsPage extends MessageablePage {
  constructor(props) {
    super(props);
    this.style = new AssessmentsPageStyle(this.props.styleProvider);
    this.state = {editAssessment: false, currentPage: 0};
  }

  updateAssessmentList() {
    const t = this.props.t;
    let callbacks = {
      context: this,
      success(list) {
        let current = this.state;
        current.editAssessment = false;
        delete current.assessmentId;
        current.assessments = list;
        this.setState(current);
      },
      error(error) {
        this.showMessage(t('assessment:messages.listError'), 'ERROR');
        if (API.isAuthError(error)) {
          this.props.switcher.switchTo('loginPage');
        }
      },
    };
    API.assessments.getList(this.state.currentPage, callbacks);
  }

  updatePreviousList() {
    const t = this.props.t;
    let callbacks = {
      context: this,
      success(list) {
        let current = this.state;
        current.previous = list;
        this.setState(current);
      },
      error(error) {
        this.showMessage(t('assessment:messages.listError'), 'ERROR');
        if (API.isAuthError(error)) {
          this.props.switcher.switchTo('loginPage');
        }
      },
    };
    if (this.state.currentPage > 0) {
      API.assessments.getList(this.state.currentPage - 1, callbacks);
    } else {
      let current = this.state;
      delete current.previous;
      this.setState(current);
    }
  }

  updateNextList() {
    const t = this.props.t;
    let callbacks = {
      context: this,
      success(list) {
        let current = this.state;
        if (list.length > 0) {
          current.next = list;
        } else {
          delete current.next;
        }
        this.setState(current);
      },
      error(error) {
        this.showMessage(t('assessment:messages.listError'), 'ERROR');
        if (API.isAuthError(error)) {
          this.props.switcher.switchTo('loginPage');
        }
      },
    };
    API.assessments.getList(this.state.currentPage + 1, callbacks);
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

  moveToNextPage() {
    let current = this.state;
    current.currentPage += 1;
    current.assessments = current.next;
    current.next = null;
    current.previous = null;
    this.setState(current);
    this.updateRest();
  }

  moveToPreviousPage() {
    let current = this.state;
    current.currentPage -= 1;
    current.assessments = current.previous;
    current.next = null;
    if (current.currentPage > 0) {
      current.previous = null;
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
      let current = this.state;
      current.editAssessment = false;
      delete current.assessmentId;
      this.setState(current);
    }
  }

  editAssessment(assessmentId) {
    let current = this.state;
    current.editAssessment = true;
    current.assessmentId = assessmentId;
    this.setState(current);
  }

  newAssessment(assessmentId) {
    this.state.editAssessment = true;
    this.state.assessmentId = assessmentId;
    this.setState(this.state);
  }

  deleteAssessment(assessmentId) {
    const t = this.props.t;
    let callbacks = {
      context: this,
      success() {
        this.showMessage(t('assessment:messages.deleted'), 'MESSAGE');
        this.updateAssessmentList();
      },
      warning() {
        this.showMessage(t('assessment:messages.deleted'), 'WARNING');
      },
      error() {
        this.showMessage(t('assessment:messages.deletedError'), 'ERROR');
      },
    };
    API.assessments.delete(assessmentId, callbacks);
  }

  render() {
    const t = this.props.t;

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
          cols={this.style.cols}
          padding={this.style.defaultPadding}
          style={this.style.gridList} >
          <MUI.GridTile
            style={MUI.styles.GridTile}
            cols={this.style.cols} >
            <MUI.RaisedButton
              label={t('assessment:newAssessment.button')}
              fullWidth={true}
              primary={true}
              onTouchTap={this.newAssessment} />
          </MUI.GridTile>
          <AssessmentsGrid
            cols={this.style.cols}
            style={this.style.AssessmentsGrid}
            assessments={this.state.assessments}
            deleteAssessment={this.deleteAssessment}/>
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
                        t('assessment:previousButton') : ' '
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
                        t('assessment:nextButton') : ' '
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
        <NewAssessmentDialog
          open={this.state.editAssessment}
          messenger={this}
          style={this.style}
          onRequestClose={this.closeEdit} />
      </BaseLayout>
    );
  }
}

module.exports = i18nextReact.setupTranslation(['assessment'], AssessmentsPage);
