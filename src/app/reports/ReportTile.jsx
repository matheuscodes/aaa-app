const React = require('react');

const MUI = require('app/common/MaterialUI');
const API = require('api');
const i18nextReact = require('global/i18nextReact');

const Waiting = require('app/common/Waiting');

const MonthReportTable = require('svg/MonthReportTable');
const MonthGraph = require('svg/MonthGraph');
const SeasonGraph = require('svg/SeasonGraph');

const oneDay = 24 * 60 * 60 * 1000;

const ReportTile = React.createClass({
  getInitialState: function() {
    return {};
  },
  updateContent: function(nextProps) {
    var callbacks = {
      context: this,
      success: function(report) {
        this.setState(report);
      }
    };
    API.seasons.getMonthReport(nextProps.seasonId,
                            nextProps.year,
                            nextProps.month, callbacks);
    delete this.state.firstDay; // Showing the loading again.
  },
  componentWillReceiveProps: function(nextProps) {
    this.updateContent(nextProps);
  },
  render: function() {
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
        <MUI.GridList cellHeight={'auto'} cols={1} padding={10} style={{width: '100%'}}>
          <MUI.GridTile cols={1} >
            <h2>{t('report:tableTitle', {date: new Date(this.props.year, this.props.month - 1, 1)})}</h2>
            <MonthReportTable data={this.state} allDays={allDays}/>
            <h3>{t('report:dailyGraphTitle')}</h3>
            <MonthGraph data={dailyGraphData} graphId={'aaa_reports_month_graph'} />
            <h3>{t('report:seasonGraphTitle')}</h3>
            <SeasonGraph
              data={this.state.season}
              extraPadding={
                dailyGraphData.overview.length - this.state.season.goals.length
              } />
          </MUI.GridTile>
        </MUI.GridList>
      );
    }

    return content;
  }
});

module.exports = i18nextReact.setupTranslation(['report'], ReportTile);
