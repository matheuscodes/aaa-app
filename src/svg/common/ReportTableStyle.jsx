const React = require('react');

// TODO FUCKING REFACTOR THIS SHIT.
const ReportTableStyle = React.createClass({
  render: function() {
    const all = [
      ".aaa-reportSideLabel{fill:#000000;text-anchor:end;font-size:75%}",
      ".aaa-reportDay{fill:#FFFFFF}",
      "text.aaa-reportDay{fill:#000000;text-anchor:middle;font-size:75%}",
      ".aaa-reportDayHeader{fill:#FFFFFF;text-anchor:middle}",
      "text.aaa-reportDayHeader{fill:#000000;text-anchor:middle;font-size:75%}",
      ".aaa-reportDayWeekend{fill:#CCFFFF;}",
      "text.aaa-reportDayOffTime{fill:#777777!important;}",
      ".aaa-reportDayOffTime{fill:#CCCCCC!important;}",
      ".aaa-reportDaySummary{fill:#AAAAAA;}",
      "text.aaa-reportDaySummary{",
      "fill:#000000!important;text-anchor:middle;font-size:75%}",
      ".aaa-reportWeek{fill-opacity:0 !important}",
      "text.aaa-reportWeek{fill:#000000;text-anchor:middle;font-size:75%}",
      "text.aaa-reportWeekTitle{fill:#000000;text-anchor:right;font-size:175%}"
    ];
    return (
        <style>
          {all.join("")}
        </style>
    );
  }
});

module.exports = ReportTableStyle;
