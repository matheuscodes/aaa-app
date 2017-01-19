const React = require('react');

const MUI = require('app/common/MaterialUI');
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
    return {open:false};
  },
  handleClose: function() {
    this.setState({open:false});
  },
  handleOpen: function() {
    this.setState({open:true});
  },
  render: function() {
    const t = this.props.t;

    var message = '';
    if (typeof this.state.message !== 'undefined') {
      message = (
        <Notice message={this.state.message} onClose={this.hideMessage} />
      );
    }

    var content = (
      <AssessmentReport
        assessmentId={this.props.data.id}
        handleClose={this.handleClose}
        open={this.state.open}
        onDelete={this.props.onDelete}/>
    );

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
          <MUI.CardActions style={{textAlign: 'right'}}>
            <MUI.RaisedButton
              label={t('assessment:detailsButton')}
              secondary={true}
              style={{margin: '5pt'}}
              onTouchTap={this.handleOpen}/>
          </MUI.CardActions>
        </MUI.Card>
        {message}
      </MUI.Paper>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['assessment'],
                                               AssessmentTile);
