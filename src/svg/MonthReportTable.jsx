'use strict'
var React = require('react');

var ReportTableStyle = require('svg/common/ReportTableStyle.jsx');


var styles = {
  reportDay:{
    stroke:'#000',
    strokeWidth:0.25,
    fillOpacity:1,
    strokeOpacity:1,
    strokeDasharray:'1,1.5'
  },
  simpleLine:{
    stroke:'#000',
    strokeWidth:1,
    strokeOpacity:1
  }
}

const sideLabelsSize = 100;
const sideLabelsGap = 2.6;
const columnWidth = 26;
const rowHeight = 11;

const oneDay = 24 * 60 * 60 * 1000;

var composeDays = function(source,line,start,end,currentMonth,classOverride){
  var days = (new Date(end).getTime() - new Date(start).getTime())/oneDay;
  var final = Math.ceil(days)*oneDay;
  var row = [];
  for(var i = start.getTime(); i <= end.getTime() ; i += oneDay){
    var index = (i - start.getTime())/oneDay
    var today = new Date(i);
    var className = 'aaa-reportDay';

    var day = today.getDay();
    if((day == 6) || (day == 0)){
      className += ' aaa-reportDayWeekend';
    }

    if(today.getMonth() != currentMonth){
      className += ' aaa-reportDayOfftime';
    }

    className = classOverride ? classOverride : className;

    row.push(
      <g transform={'translate(0,'+rowHeight*line+')'}>
        <rect className={className} width={columnWidth} height={rowHeight} x={index*columnWidth} y={0} style={styles.reportDay}/>
        {source && source[today.toISOString().substring(0,10)] ? <text className={className} x={(index+0.5)*columnWidth} y={rowHeight*0.85}>{source[today.toISOString().substring(0,10)]}</text> : null}
      </g>
    )
  }
  return row;
}

var composeRows = function(source,start,end,currentMonth){
  var rows = [];
  for(var field in source){
    rows.push(
      <g transform={'translate('+sideLabelsSize+',0)'}>
        <text className={'aaa-reportSideLabel'} x={-sideLabelsGap} y={rowHeight*(rows.length + 0.85)}>Text[{field}]</text>
        {composeDays(source[field],rows.length,start,end,currentMonth)}
        <line x1={-sideLabelsSize} y1={rowHeight*(rows.length + 1)} x2={0} y2={rowHeight*(rows.length + 1)} style={styles.reportDay}/>
      </g>
    );
  }
  return rows;
}

var skipLines = function(lines,content){
  return(
    <g transform={'translate(0,'+rowHeight*lines+')'}>
      {content}
    </g>
  )
}

var rowGroup = function(source,firstDay,lastDay,month,title){
  var totalDays = Math.ceil((new Date(lastDay).getTime() - new Date(firstDay).getTime())/oneDay)+1;

  var rows = composeRows(source,firstDay,lastDay,month);
  return {
    node:(
      <g transform={'translate('+sideLabelsSize+',0)'}>
        {rows}
        <text className={'aaa-reportSideLabel'} x={-sideLabelsGap*5} y={rowHeight*((rows.length-1)/2 + 0.85)}>{title}</text>
        <line x1={-sideLabelsSize} y1={rowHeight*(rows.length)} x2={columnWidth*totalDays+sideLabelsSize} y2={rowHeight*(rows.length)} style={styles.simpleLine}/>
      </g>
    ),
    size:rows.length
  }
}

var rowSummary = function(source,firstDay,lastDay,currentMonth,title,classOverride){
  var totalDays = Math.ceil((new Date(lastDay).getTime() - new Date(firstDay).getTime())/oneDay)+1;

  return (
    <g transform={'translate('+2*sideLabelsSize+',0)'}>
      {composeDays(source,0,firstDay,lastDay,currentMonth,classOverride)}
      <text className={'aaa-reportSideLabel'} x={-sideLabelsGap} y={rowHeight*0.85}>{title}</text>
      <line x1={-2*sideLabelsSize} y1={rowHeight} x2={columnWidth*totalDays} y2={rowHeight} style={styles.simpleLine}/>
    </g>
  );
}

module.exports = React.createClass({
  render: function() {
    var rows = 0;
    var data = this.props.data;

    var dailyHeader = composeDays(this.props.allDays,rows,data.firstDay,data.lastDay,data.month,'aaa-reportDayHeader');
    rows += 1;

    var warmUps = null;
    if(typeof data.warmUps !== 'undefined'){
      var warmUpGroup = rowGroup(data.warmUps,data.firstDay,data.lastDay,data.month,'Text[warm ups]');
      warmUps = (<g transform={'translate('+(sideLabelsSize*0.5)+',0)'}>{skipLines(rows,warmUpGroup.node)}</g>);
      rows += warmUpGroup.size;
    }

    var allDistanceTrainings = [];
    for(var distance in data.distanceTrainings){
      var distanceGroup = rowGroup(data.distanceTrainings[distance],data.firstDay,data.lastDay,data.month,'Text['+distance+']');
       allDistanceTrainings.push(<g transform={'translate('+(sideLabelsSize*0.5)+',0)'}>{skipLines(rows,distanceGroup.node)}</g>);
      rows += distanceGroup.size;
    }

    var warmOuts = null;
    if(typeof data.warmUps !== 'undefined'){
      var warmOutGroup = rowGroup(data.warmOuts,data.firstDay,data.lastDay,data.month,'Text[warm outs]');
      warmOuts = (<g transform={'translate('+(sideLabelsSize*0.5)+',0)'}>{skipLines(rows,warmOutGroup.node)}</g>);
      rows += warmOutGroup.size;
    }

    var techniqueDaily = (<g transform={'translate('+(sideLabelsSize*0.5)+',0)'}>{skipLines(rows,rowSummary(data.techniqueCounts,data.firstDay,data.lastDay,data.month,'Text[technique counts]'))}</g>);
    rows += 1;

    var totalDaily = (<g transform={'translate('+(sideLabelsSize*0.5)+',0)'}>{skipLines(rows,rowSummary(data.totalCounts,data.firstDay,data.lastDay,data.month,'Text[total counts]','aaa-reportDaySummary'))}</g>);
    rows += 1;

    return (
      <svg  version='1.1'
            viewBox={'-10 -10 '+(columnWidth*this.props.allDays.count+sideLabelsSize*2.5+20)+' 500'}
            preserveAspectRatio='xMidYMid meet'
            height={'500pt'}
            width={'100%'}>
        <ReportTableStyle />
        <g id='main'>
          <g transform={'translate('+(sideLabelsSize*2.5)+',0)'}>
            {dailyHeader}
          </g>
          {warmUps}
          {warmOuts}
          {allDistanceTrainings}
          {techniqueDaily}
          {totalDaily}
        </g>
      </svg>
    );
  }
});
