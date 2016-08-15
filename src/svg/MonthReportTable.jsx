var React = require('react');

var ReportTableStyle = require('svg/common/ReportTableStyle.jsx');

module.exports = React.createClass({
  render: function() {
    const columnWidth = 26
    const rowHeight = 11;
    const sideLabelsSize = 400;
    const oneDay = 24 * 60 * 60 * 1000
    var days = (new Date(this.props.data.lastDay).getTime() - new Date(this.props.data.firstDay).getTime())/oneDay
    days = Math.ceil(days);
    var row = [];
    for(var i = 0; i < days; i++){
      row.push(
        <rect width={columnWidth} height={rowHeight} x={i*columnWidth} y={0} style={{fill:'blue',stroke:'pink',strokeWidth:5,fillOpacity:0.1,strokeOpacity:0.9}}/>
      )
    }
    console.log(row);
    return (
      <svg  version='1.1'
            viewBox={'0 0 500 500'}
            preserveAspectRatio='xMidYMid meet'
            height={'500pt'}
            width={'500pt'} >
        <ReportTableStyle />
        <g id='main'>
          {row}
        </g>
      </svg>
    );
  }
});
