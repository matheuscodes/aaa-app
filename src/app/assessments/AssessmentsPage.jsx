const React = require('react');

const MUI = require('app/common/MaterialUI');
const API = require('api');
const i18nextReact = require('global/i18nextReact');

const Waiting = require('app/common/Waiting.jsx');
const Notice = require('app/common/Notice.jsx');
const PageSwitcher = require('app/common/PageSwitcher');

const BaseLayout = require('app/common/BaseLayout.jsx');
const AssessmentTile = require('app/assessments/AssessmentTile.jsx');
const NewAssessmentCard = require('app/assessments/NewAssessmentCard.jsx');

const styles = {
  gridList: {
    width: '100%'
  }
};

const AssessmentsPage = React.createClass({
  propTypes: {
    switcher: React.PropTypes.instanceOf(PageSwitcher),
    userAgent: React.PropTypes.string,
    t: React.PropTypes.func
  },
  getInitialState: function() {
    return {editAssessment: false};
  },
  updateAssessmentList: function() {
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
        if (error instanceof ReferenceError) {
          if (error.message === 'Missing Token.') {
            this.props.switcher.switchTo('loginPage');
          }
        }
        this.showMessage(t('assessment:messages.listError'), "ERROR");
      }
    };
    API.assessments.getList(callbacks);
  },
  componentDidMount: function() {
    this.updateAssessmentList();
  },
  closeEdit: function(refresh) {
    if (refresh) {
      this.updateAssessmentList();
    } else {
      var current = this.state;
      current.editAssessment = false;
      delete current.assessmentId;
      this.setState(current);
    }
  },
  editAssessment: function(assessmentId) {
    var current = this.state;
    current.editAssessment = true;
    current.assessmentId = assessmentId;
    this.setState(current);
  },
  newAssessment: function() {
    var current = this.state;
    current.editAssessment = true;
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
  deleteAssessment: function(assessmentId) {
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
  },
  render: function() {
    const t = this.props.t;

    var assessments = '';
    if (typeof this.state.assessments !== 'undefined') {
      assessments = this.state.assessments.map(function(assessment, index) {
        return (
          <MUI.GridTile
            key={['aaa-assessment_', assessment.id].join('')}
            style={{padding: '5pt'}}
            cols={2} >
            <AssessmentTile data={assessment} onDelete={this.deleteAssessment}/>
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

    var newAssessmentButton = (
      <MUI.RaisedButton
        label={t('assessment:newAssessment.button')}
        fullWidth={true}
        primary={true}
        onTouchTap={this.newAssessment} />
    );

    var editAssessment = '';
    if (this.state.editAssessment) {
      editAssessment = (
        <NewAssessmentCard onClose={this.closeEdit} />
      );
    }

    return (
      <BaseLayout
        switcher={this.props.switcher}
        layoutName="assessmentsPage"
        userAgent={this.props.userAgent}
        title={t('assessment:title')} >
        <MUI.GridList
          cellHeight={'unset'}
          cols={4}
          padding={10}
          style={styles.gridList} >
          <MUI.GridTile style={{padding: '5pt'}}
            cols={this.state.editAssessment ? 2 : 4} >
            {(editAssessment || newAssessmentButton)}
          </MUI.GridTile>
          {(assessments || <Waiting />)}
        </MUI.GridList>
        {message}
      </BaseLayout>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['assessment'], AssessmentsPage);
