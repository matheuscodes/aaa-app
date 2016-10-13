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
      ".aaa-reportDayOffTime{color:#777777!important;fill:#CCCCCC!important;}",
      ".aaa-reportDaySummary{fill:#AAAAAA;}",
      "text.aaa-reportDaySummary{",
      "fill:#000000!important;text-anchor:middle;font-size:75%}"
    ];
    return (
        <style>
          {all.join("")}
        </style>
    );
  }
});

module.exports = ReportTableStyle;
