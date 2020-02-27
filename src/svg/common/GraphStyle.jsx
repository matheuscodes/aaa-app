import React from 'react'
import valueConverter from 'global/ValueConverter'

// TODO FUCKING REFACTOR THIS SHIT.
const GraphStyle = React.createClass({
  render: function() {
    const all = [
      ".border {fill:none;stroke:#00F;stroke-width:1;stroke-opacity:1}",
      ".plan {fill:#FFF;stroke:#000;stroke-opacity:1}",
      ".half {fill:#4C4;stroke:#000;stroke-opacity:1}",
      ".month {fill:#44C;stroke:#000;stroke-opacity:1}",
      ".quarter {fill:#C44;stroke:#000;stroke-opacity:1}",
      ".currentDistribution {fill:#04C;stroke:#000;stroke-opacity:1}",
      ".previousDistribution {fill:#C40;stroke:#000;stroke-opacity:1}",
      ".training {fill:#CCFFFF;stroke:#000;stroke-opacity:1}",
      ".target {fill:#FFCC99;stroke:#000;stroke-opacity:1}",
      ".result {fill:#33CCCC;stroke:#000;stroke-opacity:1}",
      ".estimation {fill:none;stroke:#00F;stroke-opacity:1;stroke-width:2}",
      ".strength {fill:#FFCC00;stroke:#000;stroke-opacity:1}",
      ".grid {fill:none;stroke:#000;stroke-opacity:1;",
      " stroke-dasharray: 10 5;stroke-width:2}",
      ".share {fill:#777}",
      ".share-shadow {fill:#000}",
      // TODO replace for - instead of _
      ".graph_scale {}",
      ".graph_label {font-size:30pt}",
      ".bottom {font-size:30pt; text-anchor:middle}",
      ".left {font-size:20pt; text-anchor:end}",
      ".right {font-size:20pt; text-anchor:start}",
      ".title {font-size:30pt;font-weight:bold; text-anchor:start}",
      ".result-half {fill:#33CC33;stroke:#000;stroke-opacity:1}",
      ".estimation-half",
      " {fill:none;stroke:#0F0;stroke-opacity:1;stroke-width:2}",
      ".result-month {fill:#33CCCC;stroke:#000;stroke-opacity:1}",
      ".result-averageScore {fill:#33CCCC;stroke:#000;stroke-opacity:1}",
      ".estimation-month",
      " {fill:none;stroke:#00F;stroke-opacity:1;stroke-width:2}",
      ".estimation-averageScore",
      " {fill:none;stroke:#00F;stroke-opacity:1;stroke-width:2}",
      ".tens {fill:", valueConverter.backgroundColor['10'],
      ";stroke:#000;stroke-opacity:1}",
      ".xs {fill:", valueConverter.backgroundColor.X,
      ";stroke:#000;stroke-opacity:1}"
    ];

    return (
        <style>
          {all.join("")}
        </style>
    );
  }
});

export default GraphStyle;
