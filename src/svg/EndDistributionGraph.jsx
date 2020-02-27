import React from 'react'

import i18nextReact from 'global/i18nextReact'

import GraphStyle from 'svg/common/GraphStyle'
import GraphBar from 'svg/common/GraphBar'
import GraphBottomLabels from 'svg/common/GraphBottomLabels'
import GraphAxisLabels from 'svg/common/GraphAxisLabels'
import GraphEstimations from 'svg/common/GraphEstimations'
import GraphGrid from 'svg/common/GraphGrid'

const EndDistributionGraph = React.createClass({
  render: function() {
    const t = this.props.t;
    var size = this.props.data.endCount;

    var general_width = (size * 100 + 100 + 150);
    var general_height = 1000 + 150 + 50 + 100;
    var width = 20.2 / (100 / general_width);

    var counts = [];
    var countsLabels = [];
    // TODO change underscore variable names
    var groupCount = 0;
    for (var single in this.props.data.counts) groupCount++;

    var position = 0;
    for (var group in this.props.data.counts) {
      counts.push(this.props.data.counts[group].map(function(single, index) {
        // TODO investigate if keys need to be universally unique or just local
        // Optimize for shortest.
        return (
          <GraphBar key={[
            'aaa-endDistributionGraph_', this.props.id,
            '_count_', group, '_', index
          ].join('')}
            value={single * 1000 / this.props.data.maxCount}
            column={index} position={position}
            size={groupCount} type={group} />
        );
      }, this));
      countsLabels.push(
        <g>
          <rect
            className={group} x="0" y={75 + 100 * position}
            height="20" width="100" />
          <text className="graph_label" x="125" y={98 + 100 * position}>
            {t(['assessment:graph.counts.', group].join(''))}
          </text>
        </g>
      );
      position++;
    }

    var values = [];
    var valuesLabels = [];
    position = 0;
    for (var group in this.props.data.values) {
      values.push(this.props.data.values[group].map(function(single, index) {
        return (
          <GraphEstimations
            key={[
              'aaa-endDistributionGraph_', this.props.id,
              '_value_', group, '_', index
            ].join('')}
            min={this.props.data.minAverage}
            max={this.props.data.maxAverage}
            data={this.props.data.values[group]}
            size="1000" contentName={group} />
        );
      }, this));
      valuesLabels.push(
        <g>
          <path
            className={['estimation-', group].join('')}
            d={'M 0,' + (87.5 + 100 * position) + ' l 100,0'}/>
          <circle
            className={['result-', group].join('')}
            cx="50" cy={87.5 + 100 * position} r="10"/>
          <text className="graph_label" x="125" y={98 + 100 * position}>
            {t(['assessment:graph.values.', group].join(''))}
          </text>
        </g>
      );
      position++;
    }

    var ends = [];
    for (var i = 0; i < size; i++) {
      ends.push(i + 1);
    }

    return (
      <svg id="aaa_home_ends_graph"
            version="1.1"
            viewBox={[
              '0 ', (-general_height),
              ' ', (general_width + 2),
              ' ', (general_height + 2)
            ].join('')}
            preserveAspectRatio="xMidYMid meet"
            height={
              (this.props.height || '415') // Used like this in homescreen
            }
            width="100%">
        <GraphStyle />
        <g id="main">
          <g id="labels_bars" transform="translate(0,-220)">
            {countsLabels}
          </g>
          <g id="labels_lines" transform="translate(500,-220)">
            {valuesLabels}
          </g>
          <g id="data" transform="translate(150,-250)">
            <GraphGrid height="1000" columns={size} />
            <GraphAxisLabels
              type="left" min="0" max={this.props.data.maxCount}
              title="arrow_count" size="1000" />
            {counts}
            {values}
            <GraphAxisLabels
              type="right" min={this.props.data.minAverage}
              max={this.props.data.maxAverage}
              title="results" size="1000" offset={size * 100}/>
            <GraphBottomLabels content={ends} />
          </g>
        </g>
      </svg>
    );
  }
});

export default i18nextReact.setupTranslation(['assessment'],
                                               EndDistributionGraph);
