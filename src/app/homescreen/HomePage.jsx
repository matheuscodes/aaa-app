import React from 'react'
import {Bar} from 'react-chartjs-2';
import { withRouter } from 'react-router'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import API from 'api'
import RoutePaths from 'global/RoutePaths'

const styles = { }

const randomColor = () => "#" + Math.floor(Math.random()*16777215).toString(16);

const rings = ['M', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const optionsRings = {
  responsive: true,
  tooltips: {
    mode: 'label'
  },
  elements: {
    line: {
      fill: false
    }
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          display: false
        },
        labels: {
          show: true
        },
        offset: true,
        labels: rings,
      }
    ],
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        gridLines: {
          display: true
        },
        labels: {
          show: true
        },
      }
    ]
  }
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editTraining: false, currentPage:0};
  }

  updateAll() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function(overview) {
        var current = this.state;
        current.overview = overview;
        this.setState(current);
      },
      error: function(error) {
        if(API.isAuthError(error)){
          this.showMessage(t('common:messages.notLoggedIn'), "ERROR");
          this.props.history.push(RoutePaths.login);
        }
        this.showMessage(t('home:messages.getError'), "ERROR");
      }
    };
    API.overview.get(callbacks);
  }

  componentDidMount() {
    this.updateAll();
  }

  showMessage(message, type) {
    if(typeof this.props.messenger !== 'undefined'){
      this.props.messenger.showMessage(message, type);
    }
  }

  displayName: 'MixExample';

  get yearlyReportLabels() {
    if(!this.state.overview) {
      return [];
    }
    return Object.keys(this.state.overview.report).sort();
  }

  get yearlyReportOptions() {
    return {
      responsive: true,
      tooltips: {
        mode: 'label'
      },
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false
            },
            labels: {
              show: true
            },
            offset: true,
            labels: this.yearlyReportLabels,
          }
        ],
        yAxes: [
          {
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: true
            },
            labels: {
              show: true
            },
          },
          {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              display: true
            },
            labels: {
              show: true
            },
          },
        ]
      }
    }
  }

  get yearlyReportData() {
    const data = { datasets: [] }
    if(this.state.overview) {
      const { t } = this.props;
      const labels = this.yearlyReportLabels
      data.datasets.push({
        label: t("common:graphLabels.axis.results"),
        type:'line',
        data: labels.map(i => this.state.overview.report[i].score),
        fill: false,
        borderColor: randomColor(),
        yAxisID: 'y-axis-2'
      });
      [0,1,2,3,4,5,6].forEach(j => {
        data.datasets.push({
          type: 'bar',
          label: t(`common:weekday.long.${j}`),
          data: labels.map(i => this.state.overview.report[i].weekdays[j]),
          fill: false,
          backgroundColor: randomColor(),
          yAxisID: 'y-axis-1',
          stack: 'weekDay',
        });
      });

      ["9","10","X"].forEach(j => {
        data.datasets.push({
          type: 'bar',
          label: `${j}s`,
          data: labels.map(i => this.state.overview.report[i].gold[j]),
          fill: false,
          backgroundColor: randomColor(),
          yAxisID: 'y-axis-1',
          stack: 'rings',
        });
      });

    }
    return data;
  }


  get ringsData() {
    if(!this.state.overview) {
      return {datasets:[]}
    }
    const lastYear = rings.map(i => this.state.overview.rings.lastYear[i]*100);
    const lastQuarter = rings.map(i => this.state.overview.rings.lastQuarter[i]*100);
    const lastMonth = rings.map(i => this.state.overview.rings.lastMonth[i]*100);
    const { t } = this.props;
    return {
      datasets: [{
        type: 'bar',
        label: t("home:rings.graph.distributionYear"),
        data: lastYear,
        fill: false,
        backgroundColor: randomColor(),
        yAxisID: 'y-axis-1',
        barThickness: 'flex',
      },{
        type: 'bar',
        label: t("home:rings.graph.distributionQuarter"),
        data: lastQuarter,
        fill: false,
        backgroundColor: randomColor(),
        yAxisID: 'y-axis-1',
        barThickness: 'flex',
      },{
        type: 'bar',
        label: t("home:rings.graph.distributionMonth"),
        data: lastMonth,
        fill: false,
        backgroundColor: randomColor(),
        yAxisID: 'y-axis-1',
        barThickness: 'flex',
      }]
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div style={{'backgroundColor':'white', padding:'10pt'}}>
        <Grid container spacing={2} >
          <Grid item xs={12} md={6} >
            <Card>
              <CardHeader
                title={t('home:year.title')}
                subheader={t('home:year.subtitle')} />
              <CardContent>
                <Bar data={this.yearlyReportData} options={this.yearlyReportOptions} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} >
            <Card>
              <CardHeader
                title={t('home:rings.title')}
                subheader={t('home:rings.subtitle')} />
              <CardContent>
                <Bar data={this.ringsData} options={optionsRings} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withTranslation('common', 'home')(withRouter(withStyles(styles)(HomePage)));
