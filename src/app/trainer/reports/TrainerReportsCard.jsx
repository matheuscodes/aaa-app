import React from 'react'

import getLocalArcher from 'api/helpers/getLocalArcher'

import i18nextReact from 'global/i18nextReact'
import MUI from 'app/common/MaterialUI'
import API from 'api'

import ReportTile from 'app/reports/ReportTile'

const ReportCard = React.createClass({
  getInitialState: function() {
    return {archerList: [], archers: {}, seasons: [], months: []};
  },
  componentDidMount: function() {
    var callbacks = {
      context: this,
      success: function(archers) {
        if(Array.isArray(archers)){
          archers.forEach(archer => {
            this.state.archerList.push(archer.archerName);
            this.state.archers[archer.archerName] = archer;
            this.setState(this.state);
          }, this);
        }
      },
      error: function(error) {
        if(API.isAuthError(error)){
          this.props.switcher.switchTo('loginPage');
        }
      }
    };
    API.trainers.archers.list(callbacks);
  },
  changeArcher: function(chosenRequest) {
    if(typeof this.state.archers[chosenRequest] !== 'undefined'){
      this.state.selectedPupilId = this.state.archers[chosenRequest].id;
      this.state.selectedArcherName = chosenRequest;
      this.state.seasons = [];
      this.state.months = [];
      delete this.state.seasonId;
      delete this.state.selectedYear;
      delete this.state.selectedMonth;
      delete this.state.selectedYearMonth;
    } else {
      this.state.selectedError = this.props.t('trainer:report.archerAutoComplete.error');
    }
    this.setState(this.state);

    const callbacks = {
      context: this,
      success: function(seasons) {
        this.state.seasons = seasons;
        this.setState(this.state);
      },
      error: function(error) {
        if(API.isAuthError(error)){
          this.props.switcher.switchTo('loginPage');
        }
      }
    };
    API.trainers.seasons.list(this.state.selectedPupilId, callbacks);
  },
  changeSeason: function(event, index, value) {
    var season = this.state.seasons[index];
    var current = this.state;
    current.selectedSeason = season;
    current.seasonId = season.id;
    delete current.selectedYear;
    delete current.selectedMonth;
    delete current.selectedYearMonth;
    current.months = {};
    for (var i = new Date(season.start); i <= season.end; i.setMonth(i.getMonth() + 1)) {
      current.months[[i.getMonth(),i.getFullYear()].join('-')] = {
        month: i.getMonth(),
        year: i.getFullYear(),
      };
    }
    this.setState(current);
  },
  changeMonth: function(event, index, value) {
    var current = this.state;
    current.selectedMonth = this.state.months[value].month;
    current.selectedYear = this.state.months[value].year;
    current.selectedYearMonth = value;
    this.setState(current);
  },
  printReport: function() {
    if(document.getElementById('aaa-reportPrintableArea')){
      const archerName = this.state.selectedArcherName;
      const newWindow =  window.open('printable?document=monthReport');
      const dataToPrint = document.getElementById('aaa-reportPrintableArea').innerHTML;
      newWindow.onload = () => {
        newWindow.document.body.innerHTML=[
          '<div style="text-align:center"><img height="96" src="aaa-logo.png" /></div>',
          '<div style="text-align:center"><h2>',
          archerName,
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
  },
  render: function() {
    const t = this.props.t;
    var seasons = this.state.seasons.map(function(season, index) {
      return (
        <MUI.MenuItem
          key={'aaa-reportSeason_' + index}
          value={season.id}
          primaryText={season.name} />
      );
    });

    var months = Object.keys(this.state.months).map(function(month, index) {
      return (
        <MUI.MenuItem
          key={'aaa-reportYearMonth_' + index}
          value={month}
          primaryText={[
            this.state.months[month].year,
            t(['common:month.long',
               this.state.months[month].month].join('.')),
           ].join(' - ')} />
      );
    },this);

    return (
      <MUI.Card>
        <MUI.CardHeader
          title={t('report:cardTitle')}
          subtitle={t('report:cardSubtitle')} />
        <MUI.CardText>
          <MUI.GridList cellHeight={'auto'} cols={12} padding={10} style={{width: '100%'}}>
            <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
              {''}
            </MUI.GridTile>
            <MUI.GridTile style={MUI.styles.GridTile} cols={3} >
              <MUI.AutoComplete
                  fullWidth={true}
                  floatingLabelText={t('trainer:report.archerAutoComplete.label')}
                  errorText={this.state.selectedError}
                  id={'aaa-reportArcher'}
                  filter={MUI.AutoComplete.fuzzyFilter}
                  dataSource={this.state.archerList}
                  onNewRequest={this.changeArcher}
                  maxSearchResults={5} />
            </MUI.GridTile>
            <MUI.GridTile style={MUI.styles.GridTile} cols={3} >
              <MUI.SelectField
                style={{width: '100%'}}
                id={'aaa-reportSeason'}
                value={this.state.seasonId}
                onChange={this.changeSeason}
                floatingLabelText={
                  t('report:seasonSelectField.label')
                } >
                {seasons}
              </MUI.SelectField>
            </MUI.GridTile>
            <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
              <MUI.SelectField
                style={{width: '100%'}}
                id={'aaa-reportMonth'}
                value={this.state.selectedYearMonth}
                onChange={this.changeMonth}
                floatingLabelText={
                  t('report:monthSelectField.label')
                } >
                {months}
              </MUI.SelectField>
            </MUI.GridTile>
            <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
              {''}
            </MUI.GridTile>
            <MUI.GridTile style={MUI.styles.GridTile} cols={12} >
              {this.state.seasonId &&
               this.state.selectedYear &&
               typeof this.state.selectedMonth !== 'undefined' ?
              <ReportTile
                pupilId={this.state.selectedPupilId}
                seasonId={this.state.seasonId}
                year={this.state.selectedYear}
                month={this.state.selectedMonth > 8 ? (this.state.selectedMonth + 1) : '0' + (this.state.selectedMonth + 1)} />
              : <center><h1>{t('report:noneSelected')}</h1></center>}
            </MUI.GridTile>
          </MUI.GridList>
        </MUI.CardText>
        <MUI.CardActions style={{textAlign: 'right'}}>
          <MUI.FloatingActionButton
            mini={true}
            style={{margin: '5pt'}}
            onTouchTap={this.printReport}>
            <MUI.icons.action.print />
          </MUI.FloatingActionButton>
        </MUI.CardActions>
      </MUI.Card>
    );
  }
});

export default i18nextReact.setupTranslation(['common', 'report', 'trainer'], ReportCard);
