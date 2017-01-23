const React = require('react');

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
      }
    };
    API.seasons.getList(callbacks);
  },
  changeSeason: function(event, index, value) {
    var season = this.state.seasons[index];
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
  },
  changeYear: function(event, index, value) {
    var year = this.state.years[index];
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
  },
  changeMonth: function(event, index, value) {
    var current = this.state;
    current.selectedMonth = this.state.months[index];
    this.setState(current);
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

    var years = this.state.years.map(function(year, index) {
      return (
        <MUI.MenuItem
          key={'aaa-reportYear_' + index}
          value={year}
          primaryText={year} />
      );
    });

    var months = this.state.months.map(function(month, index) {
      return (
        <MUI.MenuItem
          key={'aaa-reportYear_' + index}
          value={month}
          primaryText={t('common:month.long.' + month)} />
      );
    });

    return (
      <MUI.Card>
        <MUI.CardHeader
          title={t('report:cardTitle')}
          subtitle={t('report:cardSubtitle')} />
        <MUI.CardText>
          <MUI.GridList cellHeight={'auto'} cols={12} padding={10} style={{width: '100%'}}>
            <MUI.GridTile cols={3} >
              {' '}
            </MUI.GridTile>
            <MUI.GridTile cols={3} >
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
            <MUI.GridTile cols={1} >
              <MUI.SelectField
                style={{width: '100%'}}
                id={'aaa-reportYear'}
                value={this.state.selectedYear}
                onChange={this.changeYear}
                floatingLabelText={
                  t('report:yearSelectField.label')
                } >
                {years}
              </MUI.SelectField>
            </MUI.GridTile>
            <MUI.GridTile cols={2} >
              <MUI.SelectField
                style={{width: '100%'}}
                id={'aaa-reportMonth'}
                value={this.state.selectedMonth}
                onChange={this.changeMonth}
                floatingLabelText={
                  t('report:monthSelectField.label')
                } >
                {months}
              </MUI.SelectField>
            </MUI.GridTile>
            <MUI.GridTile cols={12} >
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
      </MUI.Card>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['common', 'report'], ReportCard);
