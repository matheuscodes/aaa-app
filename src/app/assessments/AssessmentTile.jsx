import React from 'react';

import { withTranslation } from 'react-i18next'

import { withStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import AssessmentReport from 'app/assessments/AssessmentReport';

import MiniCalendar from 'svg/common/MiniCalendar';

const styles = {}

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

  render() {
    const { t } = this.props;

    return (
      <Card key={this.props.key}>
        {this.props.onDelete ? <CardHeader
            avatar={
              <MiniCalendar
                width={48}
                height={48}
                day={this.props.data.date.getDate()}
                month={this.props.data.date.getMonth()} />
            }
            title={ this.props.data.eventName ? this.props.data.eventName :
                    t('assessment:tile.title', this.props.data)}
            subheader={this.props.data.seasonName} /> : ''}
        <CardContent>
          <Grid container >
            <Grid item xs={6}>
              <p style={{margin: 0}}>
                {t('assessment:report.totalPoints', this.props.data)} <br/>
                {t('assessment:report.averagePoints', this.props.data)}
              </p>
            </Grid>
            <Grid item
              xs={6}
              key={'aaa-moreButton'} >
              <Button fullWidth
                color="secondary"
                onClick={this.handleOpen.bind(this)}>{this.props.t('assessment:detailsButton')}</Button>
            </Grid>
          </Grid>
          <AssessmentReport
            style={this.props.style}
            assessmentId={this.props.data.id}
            seasonId={this.props.data.seasonId}
            data={this.props.data}
            handleClose={this.handleClose.bind(this)}
            open={this.state.open}
            onDelete={this.props.onDelete} />
        </CardContent>
      </Card>
    );
  }
}

export default withTranslation('assessment')(withStyles(styles)(AssessmentTile));
