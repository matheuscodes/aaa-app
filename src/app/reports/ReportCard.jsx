import React from 'react'
import { withRouter } from 'react-router'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

import getLocalArcher from 'api/helpers/getLocalArcher'

import API from 'api'

import ReportTile from 'app/reports/ReportTile'

const styles = {}

class ReportCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState() {
    return {seasons: [], years: [], months: []};
  }
  componentDidMount() {
    var callbacks = {
      context: this,
      success: function(seasons) {
        var current = this.state;
        current.seasons = seasons;
        this.setState(current);
      },
      error: function(error) {
        if(API.isAuthError(error)){
          this.props.switcher.switchTo('loginPage');
        }
      }
    };
    API.seasons.getList(callbacks);
  }
  changeSeason(event) {
    var season = this.state.seasons[event.target.value];
    var current = this.state;
    current.selectedSeason = season;
    current.seasonId = season.id;
    current.years = [];
    delete current.selectedYear;
    current.months = [];
    delete current.selectedMonth;
    for (var i = season.start.getFullYear(); i <= season.end.getFullYear(); i++) {
      current.years.push(i);
    }
    this.setState(current);
  }
  changeYear(event) {
    var year = this.state.years[event.target.value];
    var current = this.state;
    var season = current.selectedSeason;
    current.selectedYear = year;
    current.months = [];
    delete current.selectedMonth;
    for (var i = new Date(season.start); i <= season.end; i.setMonth(i.getMonth() + 1)) {
      if (i.getFullYear() == year) {
        current.months.push(i.getMonth());
      }
    }
    this.setState(current);
  }
  changeMonth(event) {
    var current = this.state;
    current.selectedMonth = this.state.months[event.target.value];
    this.setState(current);
  }
  printReport() {
    if(document.getElementById('aaa-reportPrintableArea')){
      const newWindow =  window.open('printable?document=monthReport');
      const dataToPrint = document.getElementById('aaa-reportPrintableArea').innerHTML;
      newWindow.onload = () => {
        newWindow.document.body.innerHTML=[
          '<div style="text-align:center"><img height="96" src="aaa-logo.png" /></div>',
          '<div style="text-align:center"><h2>',
          getLocalArcher().name,
          '</h2></div>',
          dataToPrint,
          '<br/><br/><br/><br/>',
          '<div style="text-align:center;font-size:8pt">Advanced Archery App - Copyright © Matheus Borges Teixeira</div>',
        ].join('');
        newWindow.print();
        newWindow.close();
      }
    } else {
      //TODO send a message it can't print!
    }
  }
  render() {
    const t = this.props.t;
    var seasons = this.state.seasons.map(function(season, index) {
      return (
        <MenuItem key={'aaa-reportSeason_' + index} value={index} >{season.name}</MenuItem>
      );
    });

    var years = this.state.years.map(function(year, index) {
      return (
        <MenuItem key={'aaa-reportYear_' + index} value={index} >{year}</MenuItem>
      );
    });

    var months = this.state.months.map(function(month, index) {
      return (
        <MenuItem key={'aaa-reportYear_' + index} value={index} >{t('common:month.long.' + month)}</MenuItem>
      );
    });
    const {seasonId, selectedYear, selectedMonth} = this.state;
    return (
      <Card>
        <CardHeader
          title={t('report:cardTitle')}
          subheader={t('report:cardSubtitle')} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={1} >
              {' '}
            </Grid>
            <Grid item xs={5} >
              <InputLabel htmlFor="aaa-reportSeason">
                {t('report:seasonSelectField.label')}
              </InputLabel>
              <Select fullWidth
                labelId="aaa-reportSeason"
                id="aaa-reportSeason"
                value={this.state.seasonId}
                onChange={this.changeSeason.bind(this)} >
                {seasons}
              </Select>
            </Grid>
            <Grid item xs={2} >
              <InputLabel htmlFor="aaa-reportYear">
                {t('report:yearSelectField.label')}
              </InputLabel>
              <Select fullWidth
                labelId="aaa-reportYear"
                id="aaa-reportYear"
                value={this.state.selectedYear}
                onChange={this.changeYear.bind(this)} >
                {years}
              </Select>
            </Grid>
            <Grid item xs={3} >
              <InputLabel htmlFor="aaa-reportMonth">
                {t('report:monthSelectField.label')}
              </InputLabel>
              <Select fullWidth
                labelId="aaa-reportMonth"
                id="aaa-reportMonth"
                value={this.state.selectedMonth}
                onChange={this.changeMonth.bind(this)} >
                {months}
              </Select>
            </Grid>
            <Grid item xs={12} >
              {seasonId && selectedYear && typeof selectedMonth !== 'undefined'?
                <ReportTile
                  seasonId={seasonId}
                  year={selectedYear}
                  month={selectedMonth > 8 ? (selectedMonth + 1) : '0' + (selectedMonth + 1)} />
              : <center><h1>{t('report:noneSelected')}</h1></center>}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={this.printReport.bind(this)} color="secondary" variant="contained" >
            <Icon>print</Icon>
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withTranslation('common', 'report')(withRouter(withStyles(styles)(ReportCard)));
