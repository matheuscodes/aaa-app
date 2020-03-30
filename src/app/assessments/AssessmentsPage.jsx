import React from 'react';

import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

import API from 'api';

import AssessmentsPageStyle from 'app/assessments/AssessmentsPage.style';
import AssessmentsGrid from 'app/assessments/AssessmentsGrid';
import NewAssessmentDialog from 'app/assessments/NewAssessmentDialog';

const styles = {}

class AssessmentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.style = new AssessmentsPageStyle(this.props.styleProvider);
    this.state = {editAssessment: false, currentPage: 0};
  }

  updateAssessmentList() {
    const { t, messenger } = this.props;
    let callbacks = {
      context: this,
      success: function(list) {
        let current = this.state;
        current.editAssessment = false;
        delete current.assessmentId;
        current.assessments = list;
        this.setState(current);
      },
      error: function(error) {
        messenger.showMessage(t('assessment:messages.listError'), 'ERROR');
        if (API.isAuthError(error)) {
          this.props.switcher.switchTo('loginPage');
        }
      },
    };
    API.assessments.getList(this.state.currentPage, callbacks);
  }

  updatePreviousList() {
    const {t, messenger} = this.props;
    let callbacks = {
      context: this,
      success(list) {
        let current = this.state;
        current.previous = list;
        this.setState(current);
      },
      error(error) {
        messenger.showMessage(t('assessment:messages.listError'), 'ERROR');
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
    const {t, messenger} = this.props;
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
        messenger.showMessage(t('assessment:messages.listError'), 'ERROR');
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

  deleteAssessment(seasonId, assessmentId) {
    const {t, messenger} = this.props;
    let callbacks = {
      context: this,
      success() {
        messenger.showMessage(t('assessment:messages.deleted'), 'SUCCESS');
        this.updateAssessmentList();
      },
      warning() {
        messenger.showMessage(t('assessment:messages.deleted'), 'WARNING');
      },
      error() {
        messenger.showMessage(t('assessment:messages.deletedError'), 'ERROR');
      },
    };
    API.assessments.delete(seasonId, assessmentId, callbacks);
  }

  render() {
    const t = this.props.t;

    return (
      <div style={{'backgroundColor':'white', padding:'10pt'}}>
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <Button fullWidth
              color="primary"
              variant="contained"
              onClick={this.newAssessment.bind(this)}>{t('assessment:newAssessment.button')}</Button>
          </Grid>
          <AssessmentsGrid
            assessments={this.state.assessments}
            deleteAssessment={this.deleteAssessment.bind(this)}/>
          <Grid container >
            <Grid item xs={6} sm={4} lg={3} style={{padding:'5pt'}}>
              {
                typeof this.state.previous !== 'undefined' ?
                <Button
                  style={{marginBottom:'10pt'}}
                  fullWidth={true}
                  color="secondary"
                  variant="contained"
                  startIcon={<Icon>chevron_left</Icon>}
                  disabled={(this.state.previous === null)}
                  onClick={this.moveToPreviousPage.bind(this)} >
                  { t('assessment:previousButton') }
                </Button> : ''
              }
            </Grid>
            <Grid item xs={false} sm={4} lg={6} />
            <Grid item xs={6} sm={4} lg={3} style={{padding:'5pt'}}>
              {
                typeof this.state.next !== 'undefined' ?
                <Button
                  style={{marginBottom:'10pt'}}
                  fullWidth={true}
                  color="secondary"
                  variant="contained"
                  endIcon={<Icon>chevron_right</Icon>}
                  disabled={(this.state.next === null)}
                  onClick={this.moveToNextPage.bind(this)} >
                  { t('assessment:nextButton') }
                </Button> : ''
              }
            </Grid>
          </Grid>
        </Grid>
        <NewAssessmentDialog
          open={this.state.editAssessment}
          messenger={this.props.messenger}
          onRequestClose={this.closeEdit.bind(this)} />
      </div>
    );
  }
}

export default withTranslation('assessment')(withStyles(styles)(AssessmentsPage));
