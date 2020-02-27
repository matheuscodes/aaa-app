import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

import MUI from 'app/common/MaterialUI';
import i18nextReact from 'global/i18nextReact';

import AssessmentReport from 'app/assessments/AssessmentReport';

import MiniCalendar from 'svg/common/MiniCalendar';

@autobind
class AssessmentTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleClose() {
    this.setState({open: false});
  }

  handleOpen() {
    this.setState({open: true});
  }

  getMore() {
    if (this.props.allowMore) {
      return (
        <MUI.GridTile
          style={MUI.styles.GridTile}
          cols={1}
          key={'aaa-moreButton'} >
          <MUI.RaisedButton
            label={this.props.t('assessment:detailsButton')}
            secondary={true}
            style={{margin: '5pt'}}
            onTouchTap={this.handleOpen} />
        </MUI.GridTile>
      );
    }
  }

  render() {
    const t = this.props.t;

    const content = [
      <MUI.GridTile style={MUI.styles.GridTile} cols={1} key={0}>
        <p style={{margin: 0}}>
          {t('assessment:report.totalPoints', this.props.data)} <br/>
          {t('assessment:report.averagePoints', this.props.data)}
        </p>
      </MUI.GridTile>,
    ];

    const more = this.getMore();
    if (more) {
      content.push(more);
    }

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
            <MUI.GridList
              cellHeight={this.props.style.AssessmentTile.cellHeight}
              cols={this.props.allowMore ? 2 : 1}
              padding={10} >
              {content}
            </MUI.GridList>
            <AssessmentReport
              style={this.props.style}
              assessmentId={this.props.data.id}
              seasonId={this.props.data.seasonId}
              data={this.props.data}
              handleClose={this.handleClose}
              open={this.state.open}
              onDelete={this.props.onDelete} />
          </MUI.CardText>
        </MUI.Card>
      </MUI.Paper>
    );
  }
}

AssessmentTile.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  allowMore: PropTypes.bool,
  onDelete: PropTypes.func,
  t: PropTypes.func,
};

export default i18nextReact.setupTranslation(['assessment'],
                                               AssessmentTile);
