var React = require('react');

var ValueDistributionGraph = require('svg/ValueDistributionGraph.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {tasks:[]};
  },
  componentWillMount: function() {
    this.setState({
      distribution: [
        {year: 1, month: 2, week: 3},
        {year: 2, month: 4, week: 6},
        {year: 3, month: 8, week: 12},
        {year: 4, month: 16, week: 20},
        {year: 5, month: 16, week: 16},
        {year: 6, month: 20, week: 12},
        {year: 7, month: 16, week: 8},
        {year: 6, month: 8, week: 4},
        {year: 5, month: 4, week: 1},
        {year: 4, month: 2, week: 2},
        {year: 1, month: 1, week: 1}
      ],
      max: 20
    });
  },
  render: function() {
    return (
      <div id='aaa_home_values' className='mdl-cell--4-col mdl-cell mdl-shadow--2dp'>
        <h6>Text['home_values']</h6>
        <ValueDistributionGraph data={this.state} />
      </div>
    );
  }
});
