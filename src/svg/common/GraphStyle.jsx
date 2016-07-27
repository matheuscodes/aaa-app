var React = require('react');

module.exports = React.createClass({
  render: function() {
    let all = [];
    all.push(".border {fill:none;stroke:#00F;stroke-width:1;stroke-opacity:1}");
    all.push(".plan {fill:#FFF;stroke:#000;stroke-opacity:1}");
    all.push(".week {fill:#4C4;stroke:#000;stroke-opacity:1}");
    all.push(".month {fill:#44C;stroke:#000;stroke-opacity:1}");
    all.push(".year {fill:#C44;stroke:#000;stroke-opacity:1}");
    all.push(".training {fill:#CCFFFF;stroke:#000;stroke-opacity:1}");
    all.push(".target {fill:#FFCC99;stroke:#000;stroke-opacity:1}");
    all.push(".result {fill:#33CCCC;stroke:#000;stroke-opacity:1}");
    all.push(".estimation {fill:none;stroke:#00F;stroke-opacity:1;stroke-width:2}");
    all.push(".strength {fill:#FFCC00;stroke:#000;stroke-opacity:1}");
    all.push(".grid {fill:none;stroke:#000;stroke-opacity:1;stroke-dasharray: 10 5;stroke-width:2}");
    all.push(".share {fill:#777}");
    all.push(".share-shadow {fill:#000}");
		//TODO replace for - instead of _
    all.push(".graph_scale {}");
    all.push(".graph_label {font-size:30pt}");
    all.push(".bottom {font-size:30pt; text-anchor:middle}");
    all.push(".left {font-size:20pt; text-anchor:end}");
    all.push(".right {font-size:20pt; text-anchor:start}");
    all.push(".title {font-size:30pt;font-weight:bold; text-anchor:start}");
    all.push(".result-week {fill:#33CC33;stroke:#000;stroke-opacity:1}");
    all.push(".estimation-week {fill:none;stroke:#0F0;stroke-opacity:1;stroke-width:2}");
    all.push(".result-month {fill:#33CCCC;stroke:#000;stroke-opacity:1}");
    all.push(".estimation-month {fill:none;stroke:#00F;stroke-opacity:1;stroke-width:2}");

    return (
        <style>
          {all.join("")}
        </style>
    );
  }
});
