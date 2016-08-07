var React = require('react');

var MiniCalendar = require('svg/common/MiniCalendar.jsx');
var TrainingTypes = require('constants/TrainingTypes.json');

module.exports = React.createClass({
  getInitialState: function() {
    return {trainings:[]};
  },
  componentWillMount: function() {
    this.setState({
      trainings: [
        {
          date: '2016-05-01',
          time: 54,
          total_arrows: 223,
          arrows: {
            '5': {WARMUP: 34, WARMOUT: 5},
            '15': {WARMUP: 4, BOARD: 5},
            '25': {WARMOUT: 34, TARGET: 15},
          }
        },
        {
          date: '2016-02-01',
          time: 54,
          total_arrows: 223,
          arrows: {
            '5': {WARMUP: 34, WARMOUT: 5},
            '23': {WARMUP: 4, BOARD: 5},
            '6': {WARMOUT: 34, TARGET: 15},
          }
        }
      ]
    });
  },
  render: function() {
    var trainings = this.state.trainings.map(function(single, index) {
      let headers = TrainingTypes.map(function(type){
        return (
          <th> Text[{type}] </th>
        );
      });
      let row = {};
      for(let distance in single.arrows){
        row[distance] = TrainingTypes.map(function(type){
          return (
            <td> {single.arrows[distance][type] ? single.arrows[distance][type] : " - "} </td>
          );
        });
      }

      let rows = [];
      for(let distance in row){
        rows.push(
          <tr>
            <td> {distance} </td>
            {row[distance]}
          </tr>
        )
      }
      return (
        <div key={'training_'+single.date} className='aaa-list__item mdl-grid mdl-cell mdl-cell--6-col mdl-shadow--2dp'  >
          <div className='mdl-cell mdl-cell--1-col'>
            <MiniCalendar width='32pt' height='32pt' day={new Date(single.date).getDate()} month={new Date(single.date).getMonth()}/>
          </div>
          <div className='mdl-cell mdl-cell--10-col'>
            <p>Text['total arrows'] {single.total_arrows} </p>
            <p>Text['total time'] {single.time} </p>
            <p>Text['arrows per minute'] {(single.total_arrows / single.time).toPrecision(3)} </p>
            <table width='100%'>
              <tr>
                <th> Text['distance header'] </th>
                {headers}
              </tr>
              {rows}
            </table>
          </div>
          <div className='mdl-cell mdl-cell--1-col'>
            <span>Actor</span>
            <a className='' href='#'><i className='material-icons'>delete</i></a>
          </div>
        </div>
      );
    });
    return (
      <div className='mdl-grid mdl-cell mdl-cell--12-col'>
        {trainings}
      </div>
    );
  }
});
