const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const YearOverviewCard = React.createClass({
  getInitialState: function() {
    return {months: []};
  },
  componentDidMount: function() {
    var callbacks = {
      context: this,
      success: function(months) {
        this.setState({months});
      }
    };
    API.reports.getYearOverview(callbacks);
  },
  render: function() {
    const t = this.props.t;

    var monthlyCounts = [];
    for (var i = new Date(this.state.months.to); i > this.state.months.from; i.setMonth(i.getMonth() - 1)) {
      var row = this.state.months[[(i.getYear() + 1900), i.getMonth()].join('-')];
      if (typeof row == 'undefined') {
        row = {
          year: (i.getYear() + 1900),
          month: i.getMonth()
        };
      }
      monthlyCounts.push(
        <tr key={'aaa-yearRow_' + i.getTime()}>
          <td style={{textAlign: 'center'}}>{row.year}</td>
          <td style={{textAlign: 'center'}}>
            {t(['common:month.long.', row.month].join(''))}
          </td>
          <td style={{textAlign: 'center'}}>{(row.totalCount || '-')}</td>
          <td style={{textAlign: 'center'}}>
            {row.averageGrade ? row.averageGrade.toFixed(2) : '-' }
          </td>
        </tr>
      );
    }

    return (
      <MUI.Card>
        <MUI.CardHeader
          title={t('home:year.title')}
          subtitle={t('home:year.subtitle')} />
        <MUI.CardText>
          <table width="96%">
            <tbody>
              <tr>
                <th>{t('home:year.header.year')}</th>
                <th>{t('home:year.header.month')}</th>
                <th>{t('home:year.header.total')}</th>
                <th>{t('home:year.header.grade')}</th>
              </tr>
              {monthlyCounts}
            </tbody>
          </table>
        </MUI.CardText>
      </MUI.Card>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['common', 'home'],
                                               YearOverviewCard);
