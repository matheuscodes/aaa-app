var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {months:[]};
  },
  componentWillMount: function() {
    this.setState({
      months: [
        {year: 2015, month:1, total_count: 12, average_value: 2.234123},
        {year: 2015, month:2, total_count: 213, average_value: 6},
        {year: 2015, month:3, total_count: 33, average_value: 4.1},
      ]
    });
  },
  render: function() {
    var monthlyCounts = this.state.months.map(function(count) {
      return (
        <tr key={count.year + '_' + count.month}>
          <td>{count.year}</td>
          <td>Text['month_full_']</td>
          <td>{count['total_count']}</td>
          <td>{count['average_value'] ? count['average_value'].toPrecision(3) : null }</td>
        </tr>
      );
    },this);

    return (
      <div id='aaa_home_year_summary' className='mdl-cell--2-col mdl-cell mdl-shadow--2dp'>
        <h6>Text['home_year_summary']</h6>
        <table width='96%'>
          <tbody>
            {monthlyCounts}
          </tbody>
        </table>
      </div>
    );
  }
});
