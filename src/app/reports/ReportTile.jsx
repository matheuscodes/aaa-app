import React from 'react'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import API from 'api'

import Waiting from 'app/common/Waiting'

import MonthReportTable from 'svg/MonthReportTable'
import MonthGraph from 'svg/MonthGraph'
import SeasonGraph from 'svg/SeasonGraph'

const oneDay = 24 * 60 * 60 * 1000;
const styles = {}

class ReportTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateContent(props);
  }
  updateContent(nextProps) {
    var callbacks = {
      context: this,
      success: function(report) {
        this.setState(report);
      }
    };
    if(nextProps.pupilId){
      API.trainers.seasons.getMonthReport(nextProps.pupilId,
                              nextProps.seasonId,
                              nextProps.year,
                              nextProps.month, callbacks);
    } else {
      API.seasons.getMonthReport(nextProps.seasonId,
                              nextProps.year,
                              nextProps.month, callbacks);
    }
    delete this.state.firstDay; // Showing the loading again.
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.state.season
        || this.props.seasonId !== nextProps.seasonId
        || this.props.year !== nextProps.year
        || this.props.month !== nextProps.month) {
      this.updateContent(nextProps);
    }
  }
  render() {
    const t = this.props.t;
    var content = <Waiting />;
    if (typeof this.state.firstDay !== 'undefined') {
      var allDays = {count: 0};
      var dailyGraphData = {
        overview: [],
        max: this.state.season.max,
        minValue: this.state.season.minValue,
        maxValue: this.state.season.maxValue
      };
      for (var i = this.state.firstDay.getTime(); i <= this.state.lastDay.getTime(); i += oneDay) {
        var today = new Date(i);
        var dayString = today.toISOString().substring(0, 10);
        allDays[dayString] = today.getDate();
        dailyGraphData.overview.push({
          shots: this.state.totalCounts[dayString] ? this.state.totalCounts[dayString] : 0,
          techniqueShots: this.state.techniqueCounts[dayString] ? this.state.techniqueCounts[dayString] : 0,
          day: today.getDate(),
          value: this.state.totalScores[dayString] ? this.state.totalScores[dayString] : 0
        });
        allDays.count++;
      }
      content = (
        <div id="aaa-reportPrintableArea">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2>{t('report:tableTitle', {date: new Date(this.props.year, this.props.month - 1, 1)})}</h2>
              <MonthReportTable data={this.state} allDays={allDays}/>
              <h3>{t('report:dailyGraphTitle')}</h3>
              <MonthGraph data={dailyGraphData} graphId={'aaa_reports_month_graph'} />
              <h3>{t('report:seasonGraphTitle')}</h3>
              <SeasonGraph
                data={this.state.season}
                events={this.state.season.events}
                extraPadding={
                  dailyGraphData.overview.length - this.state.season.goals.length
                } />
            </Grid>
          </Grid>
        </div>
      );
    }

    return content;
  }
}

export default withTranslation('report')(withStyles(styles)(ReportTile));
