var React = require('react');

var MUI = require('app/common/MaterialUI');
var MonthReportTable = require('svg/MonthReportTable.jsx');
var MonthGraph = require('svg/MonthGraph.jsx');
var SeasonGraph = require('svg/SeasonGraph.jsx');

const oneDay = 24 * 60 * 60 * 1000;

var style = {
};

module.exports = React.createClass({
  getInitialState: function() {
    return {
      firstDay: new Date('2016-08-01'),
      lastDay: new Date('2016-09-04'),
      month: 7,
      warmUps: {
        15: {
          '2016-08-02': 33,
          '2016-08-07': 9,
          '2016-08-15': 23
        },
        5: {
          '2016-08-22': 1
        }
      },
      distanceTrainings: {
        17: {
          BOARD: {
            '2016-08-02': 33,
            '2016-08-07': 9,
            '2016-08-15': 23
          },
          TARGET: {
            '2016-08-22': 1
          },
          GAUGED: {
            '2016-08-22': 1
          }
        },
        1: {
          BOARD: {
            '2016-08-02': 33,
            '2016-08-07': 9,
            '2016-08-15': 23
          },
          GAUGED: {
            '2016-08-22': 1
          }
        },
        21: {
          BOARD: {
            '2016-08-02': 33,
            '2016-08-07': 9,
            '2016-08-15': 23
          },
          TARGET: {
            '2016-08-22': 1
          },
          GAUGED: {
            '2016-08-22': 1
          }
        },
        70: {
          BOARD: {
            '2016-08-02': 33,
            '2016-08-07': 9,
            '2016-08-15': 23
          }
        }
      },
      warmOuts: {
        22: {
          '2016-08-12': 44,
          '2016-08-27': 9,
          '2016-08-15': 3
        },
        26: {
          '2016-08-10': 1
        }
      },
      techniqueCounts: {
        '2016-08-12': 44,
        '2016-08-13': 339,
        '2016-08-27': 9,
        '2016-08-15': 3,
        '2016-08-10': 1
      },
      totalCounts: {
        '2016-08-12': 444,
        '2016-08-13': 339,
        '2016-08-15': 424,
        '2016-08-16': 932,
        '2016-08-17': 311,
        '2016-08-20': 111
      },
      totalGrades: {
        '2016-08-12': 4.4,
        '2016-08-14': 3.39,
        '2016-08-15': 4.2,
        '2016-08-16': 9.32,
        '2016-08-17': 3.1,
        '2016-08-20': 1
      },
      season: {
        overview: [{
          total_plan: 300,
          gauge_plan: 150,
          shots: 178,
          technique_shots: 34,
          week: 51,
          value: 3.454
        },
        {
          total_plan: 315,
          gauge_plan: 120,
          shots: 44,
          technique_shots: 30,
          week: 52,
          value: 5.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.674
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 6.5
        },
        {
          total_plan: 225,
          gauge_plan: 120,
          shots: 64,
          technique_shots: 20,
          week: 1,
          value: 2.1
        }
        ],
        max: 350,
        minValue: 2,
        maxValue: 7
      }
    };
  },
  render: function() {
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
        value: this.state.totalGrades[dayString] ? this.state.totalGrades[dayString] : 0
      });
      allDays.count++;
    }

    return (
      <MUI.Card>
        <MUI.CardHeader
          title="Text[report title]"
          subtitle="Text[report subtitle]" />
        <MUI.CardText>
          <MUI.GridList cellHeight={'unset'} cols={2} padding={10} style={{width: '100%'}}>
            <MUI.GridTile cols={2} >
              <MonthReportTable data={this.state} allDays={allDays}/>
              <MonthGraph data={dailyGraphData} graphId={'aaa_reports_month_graph'} />
              <SeasonGraph data={this.state.season} graphId={'aaa_reports_season_graph'} />
            </MUI.GridTile>
          </MUI.GridList>
        </MUI.CardText>

        <MUI.CardActions style={{textAlign: 'right'}}>
          <MUI.FloatingActionButton mini={true} secondary={true} style={{margin: '5pt'}}>
            <MUI.icons.action.delete />
          </MUI.FloatingActionButton>
          <MUI.FloatingActionButton style={{margin: '5pt'}}>
            <MUI.icons.action.backup />
          </MUI.FloatingActionButton>
        </MUI.CardActions>
      </MUI.Card>
    );
  }
});
