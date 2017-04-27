const React = require('react');

const getLocalArcher = require('api/helpers/getLocalArcher');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const ReportTile = require('app/reports/ReportTile');

const ReportCard = React.createClass({
  getInitialState: function() {
    return {seasons: [], years: [], months: []};
  },
  componentDidMount: function() {
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
              {' '}
            </MUI.GridTile>
            <MUI.GridTile style={MUI.styles.GridTile} cols={5} >
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
            <MUI.GridTile style={MUI.styles.GridTile} cols={3} >
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

module.exports = i18nextReact.setupTranslation(['common', 'report'], ReportCard);
