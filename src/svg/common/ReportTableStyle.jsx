'use strict'
var React = require('react');
var valueConverter = require('useful/valueConverter');

//TODO FUCKING REFACTOR THIS SHIT.
module.exports = React.createClass({
  render: function() {
    var all = [];
    all.push(".aaa-reportSideLabel{fill:#000000;text-anchor:end;font-size:75%}");
    all.push(".aaa-reportDay{fill:#FFFFFF}");
    all.push("text.aaa-reportDay{fill:#000000;text-anchor:middle;font-size:75%}");
    all.push(".aaa-reportDayHeader{fill:#FFFFFF;text-anchor:middle}");
    all.push("text.aaa-reportDayHeader{fill:#000000;text-anchor:middle;font-size:75%}");
    all.push(".aaa-reportDayWeekend{fill:#CCFFFF;}");
    all.push(".aaa-reportDayOffTime{color:#777777!important;fill:#CCCCCC!important;}");
    all.push(".aaa-reportDaySummary{fill:#AAAAAA;}");
    all.push("text.aaa-reportDaySummary{fill:#000000!important;text-anchor:middle;font-size:75%}");

    return (
        <style>
          {all.join("")}
        </style>
    );
  }
});
