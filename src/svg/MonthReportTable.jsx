const React = require('react');
const moment = require('moment');

const i18nextReact = require('global/i18nextReact');

const ReportTableStyle = require('svg/common/ReportTableStyle.jsx');

const styles = {
  reportDay: {
    stroke: '#000',
    strokeWidth: 0.25,
    fillOpacity: 1,
    strokeOpacity: 1,
    strokeDasharray: '1,1.5'
  },
  simpleLine: {
    stroke: '#000',
    strokeWidth: 1,
    strokeOpacity: 1
  }
};

const sideLabelsSize = 100;
const sideLabelsGap = 2.6;
const columnWidth = 26;
const rowHeight = 11;

const oneDay = 24 * 60 * 60 * 1000;
const oneWeek = oneDay * 7;

const composeDays = function(source,
                             line,
                             start,
                             end,
                             currentMonth,
                             classOverride) {
  var row = [];
  for (var i = start.getTime(); i <= end.getTime(); i += oneDay) {
    var index = (i - start.getTime()) / oneDay;
    var today = new Date(i);
    var className = 'aaa-reportDay';

    var day = today.getDay();
    if ((day === 6) || (day === 0)) {
      className += ' aaa-reportDayWeekend';
    }

    if (today.getMonth() !== currentMonth) {
      className += ' aaa-reportDayOfftime';
    }

    className = classOverride ? classOverride : className;
    var data = source ? source[today.toISOString().substring(0, 10)] : '';
    data = (data || ' ');
    if(Number(data) === data && data % 1 !== 0){
      data = data.toFixed(1);
    }
    row.push(
      <g transform={'translate(0,' + rowHeight * line + ')'}>
        <rect
          className={className} width={columnWidth} height={rowHeight}
          x={index * columnWidth} y={0} style={styles.reportDay}/>
        {data ?
          <text
            className={className}
            x={(index + 0.5) * columnWidth} y={rowHeight * 0.85}>
            {data}
          </text> : null}
      </g>
    );
  }
  return row;
};

const composeWeeks = function(source,
                             line,
                             start,
                             end,
                             currentMonth,
                             classOverride) {
  var row = [];
  for (var i = start.getTime(); i <= end.getTime(); i += oneWeek) {
    var index = (i - start.getTime()) / oneDay;
    var today = new Date(i);
    var className = 'aaa-reportDay';

    className = classOverride ? classOverride : className;
    var data = source ? source[moment(today).isoWeek()] : '';
    data = (data || ' ');
    if(Number(data) === data && data % 1 !== 0){
      data = data.toFixed(1);
    }
    row.push(
      <g transform={'translate(0,' + rowHeight * line + ')'}>
        <rect
          className={className} width={columnWidth*7} height={rowHeight}
          x={index * columnWidth} y={0} style={styles.reportDay}/>
        {data ?
          <text
            className={className}
            x={(index + 3.5) * columnWidth} y={rowHeight * 0.85}>
            {data}
          </text> : null}
      </g>
    );
  }
  return row;
};

const composeRows = function(source, start, end, currentMonth) {
  const rows = [];
  Object.keys(source).forEach(function(field) {
    rows.push(
      <g transform={'translate(' + sideLabelsSize + ',0)'}>
        <text
          className={'aaa-reportSideLabel'}
          x={-sideLabelsGap} y={rowHeight * (rows.length + 0.85)}>
          Text[{field}]
        </text>
        {composeDays(source[field], rows.length, start, end, currentMonth)}
        <line
          x1={-sideLabelsSize} y1={rowHeight * (rows.length + 1)}
          x2={0} y2={rowHeight * (rows.length + 1)}
          style={styles.reportDay}/>
      </g>
    );
  });
  return rows;
};

const skipLines = function(lines, content) {
  return (
    <g transform={'translate(0,' + rowHeight * lines + ')'}>
      {content}
    </g>
  );
};

const rowGroup = function(source, firstDay, lastDay, month, title) {
  var totalDays = Math.ceil(
    (new Date(lastDay).getTime() - new Date(firstDay).getTime()) / oneDay
  ) + 1;

  var rows = composeRows(source, firstDay, lastDay, month);
  return {
    node: (
      <g transform={'translate(' + sideLabelsSize + ',0)'}>
        {rows}
        <text
          className={'aaa-reportSideLabel'}
          x={-sideLabelsGap * 5} y={rowHeight * ((rows.length - 1) / 2 + 0.85)}>
          {title}
        </text>
        <line
          x1={-sideLabelsSize} y1={rowHeight * (rows.length)}
          x2={columnWidth * totalDays + sideLabelsSize}
          y2={rowHeight * (rows.length)}
          style={styles.simpleLine}/>
      </g>
    ),
    size: rows.length
  };
};

const rowSummary = function(source,
                            firstDay,
                            lastDay,
                            currentMonth,
                            title,
                            classOverride,
                            weekly) {
  var totalDays = Math.ceil(
    (new Date(lastDay).getTime() - new Date(firstDay).getTime()) / oneDay
  ) + 1;

  return (
    <g transform={'translate(' + 2 * sideLabelsSize + ',0)'}>
      {weekly ?
        composeWeeks(source, 0, firstDay, lastDay, currentMonth, classOverride):
        composeDays(source, 0, firstDay, lastDay, currentMonth, classOverride)}
      <text
        className={'aaa-reportSideLabel'}
        x={-sideLabelsGap} y={rowHeight * 0.85}>
        {title}
      </text>
      <line
        x1={-2 * sideLabelsSize} y1={rowHeight}
        x2={columnWidth * totalDays} y2={rowHeight}
        style={styles.simpleLine}/>
    </g>
  );
};

const composeWeekColumns = function(start, end, rows) {
  var row = [];
  for (var i = start.getTime(); i <= end.getTime(); i += oneWeek) {
    var index = (i - start.getTime()) / oneDay;
    var today = new Date(i);

    row.push(
      <g transform={'translate(0,0)'}>
        <rect
          style={{
            stroke: '#000',
            strokeWidth: 2,
            fillOpacity: 0,
            strokeOpacity: 1,
          }} width={columnWidth*7} height={rowHeight*rows}
          x={index * columnWidth} y={0} />
        <text
          style={{
            fill:'#000000',
            textAnchor:'middle',
            fontSize:'75%'
          }}
          x={(index + 3.5) * columnWidth} y={rowHeight * 0.85}>
          {'Text[weeknumber]'}
        </text>

        <text
          style={{
            fill:'#777777',
            textAnchor:'right',
            fontSize:'275%',
            fontWeight:'bold'
          }}
          x={(index +5) * columnWidth} y={rowHeight * 3.85}>
          {moment(today).isoWeek()}
        </text>
      </g>
    );
  }
  return row;
};


const MonthReportTable = React.createClass({
  propTypes: {
    // TODO declare a class to validate
    data: React.PropTypes.object,
    allDays: React.PropTypes.object,
    t: React.PropTypes.func
  },
  render: function() {
    var rows = 0;
    var data = this.props.data;

    const weeklyTechnique = {};
    const weeklyTotals = {};
    const weeklyScores = {};

    data.season.goals.forEach(function(goal){
      weeklyTechnique[goal.week] = goal.techniqueShot;
      weeklyTotals[goal.week] = goal.arrowsShot;
      // TODO scores or grades? decide and uniformize!
      weeklyScores[goal.week] = goal.averageGrade;
    })


    var dailyHeader = composeDays(this.props.allDays,
                                  rows,
                                  data.firstDay,
                                  data.lastDay,
                                  data.month,
                                  'aaa-reportDayHeader');
    rows += 1;

    var warmUps = null;
    if (typeof data.warmUps !== 'undefined') {
      var warmUpGroup = rowGroup(data.warmUps,
                                 data.firstDay,
                                 data.lastDay,
                                 data.month,
                                 'Text[warm ups]');
      warmUps = (
        <g transform={'translate(' + (sideLabelsSize * 0.5) + ',0)'}>
          {skipLines(rows, warmUpGroup.node)}
        </g>
      );
      rows += warmUpGroup.size;
    }

    var allDistanceTrainings = [];
    Object.keys(data.distanceTrainings).forEach(function(distance) {
      var distanceGroup = rowGroup(data.distanceTrainings[distance],
                                   data.firstDay,
                                   data.lastDay,
                                   data.month,
                                   'Text[' + distance + ']');
      allDistanceTrainings.push(
        <g transform={'translate(' + (sideLabelsSize * 0.5) + ',0)'}>
          {skipLines(rows, distanceGroup.node)}
        </g>
      );
      rows += distanceGroup.size;
    });

    var warmOuts = null;
    if (typeof data.warmUps !== 'undefined') {
      var warmOutGroup = rowGroup(data.warmOuts,
                                  data.firstDay,
                                  data.lastDay,
                                  data.month,
                                  'Text[warm outs]');
      warmOuts = (
        <g transform={'translate(' + (sideLabelsSize * 0.5) + ',0)'}>
          {skipLines(rows, warmOutGroup.node)}
        </g>
      );
      rows += warmOutGroup.size;
    }

    var techniqueDaily = (
      <g transform={'translate(' + (sideLabelsSize * 0.5) + ',0)'}>
        {skipLines(rows,
                   rowSummary(data.techniqueCounts,
                              data.firstDay,
                              data.lastDay,
                              data.month,
                              'Text[technique counts]'))}
      </g>
    );
    rows += 1;

    var totalDaily = (
      <g transform={'translate(' + (sideLabelsSize * 0.5) + ',0)'}>
        {skipLines(rows,
                   rowSummary(data.totalCounts,
                              data.firstDay,
                              data.lastDay,
                              data.month,
                              'Text[total counts]',
                              'aaa-reportDaySummary'))}
      </g>
    );
    rows += 1;

    var techniqueWeekly = (
      <g transform={'translate(' + (sideLabelsSize * 0.5) + ',0)'}>
        {skipLines(rows,
                   rowSummary(weeklyTechnique,
                              data.firstDay,
                              data.lastDay,
                              data.month,
                              'Text[total counts]',
                              '',
                              true /*weekly*/))}
      </g>
    );
    rows += 1;

    var totalWeekly = (
      <g transform={'translate(' + (sideLabelsSize * 0.5) + ',0)'}>
        {skipLines(rows,
                   rowSummary(weeklyTotals,
                              data.firstDay,
                              data.lastDay,
                              data.month,
                              'Text[total counts]',
                              '',
                              true /*weekly*/))}
      </g>
    );
    rows += 1;

    var allResults = [];
    Object.keys(data.roundRings).forEach(function(distance) {
      var distanceGroup = rowGroup(data.roundRings[distance],
                                   data.firstDay,
                                   data.lastDay,
                                   data.month,
                                   'Text[' + distance + ']');
      allDistanceTrainings.push(
        <g transform={'translate(' + (sideLabelsSize * 0.5) + ',0)'}>
          {skipLines(rows, distanceGroup.node)}
        </g>
      );
      rows += distanceGroup.size;
    });

    var scoreDaily = (
      <g transform={'translate(' + (sideLabelsSize * 0.5) + ',0)'}>
        {skipLines(rows,
                   rowSummary(data.totalScores,
                              data.firstDay,
                              data.lastDay,
                              data.month,
                              'Text[total counts]',
                              'aaa-reportDaySummary'))}
      </g>
    );
    rows += 1;

    var scoreWeekly = (
      <g transform={'translate(' + (sideLabelsSize * 0.5) + ',0)'}>
        {skipLines(rows,
                   rowSummary(weeklyScores,
                              data.firstDay,
                              data.lastDay,
                              data.month,
                              'Text[total counts]',
                              '',
                              true /*weekly*/))}
      </g>
    );
    rows += 1;

    rows += 4;
    const weekColumns = composeWeekColumns(data.firstDay, data.lastDay,rows);

    return (
      <svg
        version="1.1"
        viewBox={[
          '-10 -10 ',
          (columnWidth * this.props.allDays.count + sideLabelsSize * 2.5 + 20),
          ' ' + (rows * rowHeight + 20)
        ].join('')}
        preserveAspectRatio="xMidYMid meet"
        width={'100%'}>
        <ReportTableStyle />
        <g id="main">
          <g transform={'translate(0,' + rowHeight*4 + ')'}>
            <g transform={'translate(' + (sideLabelsSize * 2.5) + ',0)'}>
              {dailyHeader}
            </g>
            {warmUps}
            {warmOuts}
            {allDistanceTrainings}
            {techniqueDaily}
            {totalDaily}
            {techniqueWeekly}
            {totalWeekly}
            {allResults}
            {scoreDaily}
            {scoreWeekly}
          </g>
          <g transform={'translate(' + (sideLabelsSize * 2.5) + ',0)'}>
            {weekColumns}
          </g>
        </g>
      </svg>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['training', 'assessment'],
                                               MonthReportTable);
