const React = require('react');

const MUI = require('app/common/MaterialUI');
const API = require('api');
const i18nextReact = require('global/i18nextReact');

const AssessmentReport = require('app/assessments/AssessmentReport.jsx');

const Waiting = require('app/common/Waiting.jsx');
const Notice = require('app/common/Notice.jsx');
const MiniCalendar = require('svg/common/MiniCalendar.jsx');

const AssessmentTile = React.createClass({
  propTypes: {
    // TODO declare a class to validate
    data: React.PropTypes.object,
    onClose: React.PropTypes.func,
    onDelete: React.PropTypes.func,
    t: React.PropTypes.func
  },
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    var callbacks = {
      context: this,
      success: function(assessment) {
        this.setState(assessment);
      }
    };
    API.assessments.reportById(this.props.data.id, callbacks);
  },
  render: function() {
    const t = this.props.t;

    var message = '';
    if (typeof this.state.message !== 'undefined') {
      message = (
        <Notice message={this.state.message} onClose={this.hideMessage} />
      );
    }

    var content = <Waiting />;
    if (typeof this.state.date !== 'undefined') {
      content = (
        <AssessmentReport
          assessmentId={this.props.data.id}
          data={this.state}
          onDelete={this.props.onDelete}/>
      );
    }

    return (
      <MUI.Paper zDepth={1}>
        <MUI.Card>
          <MUI.CardHeader
            title={t('assessment:tile.title', this.props.data)}
            subtitle={t('assessment:tile.subtitle', this.props.data)}
            avatar={
              <MiniCalendar
                width="32pt"
                height="32pt"
                day={this.props.data.date.getDate()}
                month={this.props.data.date.getMonth()} />
            }/>
          <MUI.CardText>
            {content}
          </MUI.CardText>
        </MUI.Card>
        {message}
      </MUI.Paper>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['assessment'],
                                               AssessmentTile);
