const React = require('react');

const MUI = require('app/common/MaterialUI');
const i18nextReact = require('global/i18nextReact');

const AssessmentReport = require('app/assessments/AssessmentReport');

const Waiting = require('app/common/Waiting');
const Notice = require('app/common/Notice');
const MiniCalendar = require('svg/common/MiniCalendar');

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
        data={this.props.data}
        handleClose={this.handleClose}
        open={this.state.open}
        onDelete={this.props.onDelete}/>
    );

    return (
      <MUI.Paper zDepth={1}>
        <MUI.Card>
          <MUI.CardHeader
            title={ this.props.data.eventName ? this.props.data.eventName :
                    t('assessment:tile.title', this.props.data)}
            subtitle={this.props.data.seasonName}
            avatar={
              <MiniCalendar
                width={48}
                height={48}
                day={this.props.data.date.getDate()}
                month={this.props.data.date.getMonth()} />
            }/>
          <MUI.CardText>
            <MUI.GridList cellHeight={'auto'} cols={2} padding={10} >
              <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
                <p style={{margin: 0}}>
                  {t('assessment:report.totalPoints', this.props.data)} <br/>
                  {t('assessment:report.averagePoints', this.props.data)}
                </p>
              </MUI.GridTile>
              <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
                <MUI.RaisedButton
                  label={t('assessment:detailsButton')}
                  secondary={true}
                  style={{margin: '5pt'}}
                  onTouchTap={this.handleOpen} />
              </MUI.GridTile>
            </MUI.GridList>
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
