var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {days:[],max:1};
  },
  componentWillMount: function() {
    this.setState({
      days: [
        {date: "2016-02-22", count:21},
        {date: "2016-02-21", count:5},
        {date: "2016-02-20", count:30}
      ],
      max: 33
    });
  },
  render: function() {
    var dailyCounts = this.state.days.map(function(day) {
      return (
        <tr key={day.date}>
          <td><b>{day.date}</b></td>
          <td width='100%'>
            <div style={{width: ((day.count/this.state.max)*100)+'%'}} className='aaa-home-arrows-day mdl-color-text--accent-contrast mdl-color--accent'>
              {day.count}
            </div>
          </td>
        </tr>
      );
    },this);

    return (
      <div id='aaa_home_arrows' className='mdl-cell--2-col mdl-cell mdl-shadow--2dp'>
        <h6>Text['home_arrows']</h6>
        <table>
          <tbody>
            {dailyCounts}
          </tbody>
        </table>
      </div>
    );
  }
});
