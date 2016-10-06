'use strict';
var React = require('react');
var MUI = require('app/common/MaterialUI');

module.exports = React.createClass({
  getInitialState: function() {
    return {months: []};
  },
  componentWillMount: function() {
    this.setState({
      months: [
        {year: 2015, month: 1, total_count: 12, average_value: 2.234123},
        {year: 2015, month: 2, total_count: 213, average_value: 6},
        {year: 2015, month: 3, total_count: 33, average_value: 4.1}
      ]
    });
  },
  render: function() {
    var monthlyCounts = this.state.months.map(function(count) {
      return (
        <tr key={'aaa-yearRow_' + count.year + '_' + count.month}>
          <td>{count.year}</td>
          <td>Text['month_full_']</td>
          <td>{count.total_count}</td>
          <td>{count.average_value ? count.average_value.toPrecision(3) : null }</td>
        </tr>
      );
    }, this);

    return (
      <MUI.Card>
        <MUI.CardHeader
          title="Text['home_year_summary']"
          subtitle="Text['home_year_summary subtitle']" />
        <MUI.CardText>
          <table width="96%">
            <tbody>
              <tr>
                <th>Text[year]</th>
                <th>Text[month]</th>
                <th>Text[total]</th>
                <th>Text[average]</th>
              </tr>
              {monthlyCounts}
            </tbody>
          </table>
        </MUI.CardText>
      </MUI.Card>
    );
  }
});
