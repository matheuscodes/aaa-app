var React = require('react');

var EndDistributionGraph = require('svg/EndDistributionGraph.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {values:[],max_value:0,min_value:0,max_end:0};
  },
  componentWillMount: function() {
    this.setState({
      values: {
        month:[1.2,3.6,2.2,5.5,7.023,6.34],
        week:[3.3,2.2,1.777,7.4222421,2]
      },
      counts:{
        month: [6,6,6,6,6,6],
        week: [5,3,1,4,5,6]
      },
      max_value: 7.422421,
      min_value: 1.2,
      max_count: 6,
      max_end: 6
    });
  },
  render: function() {
    return (
      <div id='aaa_home_ends' className='mdl-cell--4-col mdl-cell mdl-shadow--2dp'>
        <h6>Text['home_ends']</h6>
        <EndDistributionGraph data={this.state} />
      </div>
    );
  }
});
