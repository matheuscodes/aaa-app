import React from 'react'

import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';

import GraphStyle from 'svg/common/GraphStyle'
import GraphBar from 'svg/common/GraphBar'
import GraphBottomLabels from 'svg/common/GraphBottomLabels'
import GraphAxisLabels from 'svg/common/GraphAxisLabels'
import GraphGrid from 'svg/common/GraphGrid'

const styles = {}

class ValueDistributionGraph extends React.Component {
  render() {
    const t = this.props.t;
    const unit = 1000 / (Math.ceil((this.props.data.maxPercentage * 110) / 10) * 0.1);

    const generalWidth = (11 * 100 + 100 + 150);
    const generalHeight = 1000 + 150 + 50 + 100;

    let values = ['M','1','2','3','4','5','6','7','8','9','10','X'];
    let currentBars = [];
    let previousBars = [];
    values.forEach((key, index) => {
      currentBars.push(
        <GraphBar
          value={(this.props.data.distributionNow[key] / this.props.data.totalNow) * unit} column={index}
          position="0" size="2" type="currentDistribution" />
      );
      previousBars.push(
        <GraphBar
          value={(this.props.data.distributionBefore[key] / this.props.data.totalBefore) * unit} column={index}
          position="1" size="2" type="previousDistribution" />
      );
    });

    return (
      <svg id="aaa_distribution_comparison_graph"
            version="1.1"
            viewBox={[
              '0 ', (-generalHeight),
              ' ', (generalWidth + 2),
              ' ', (generalHeight + 2)
            ].join('')}
            preserveAspectRatio="xMidYMid meet"
            width="100%">
        <GraphStyle />
        <g id="main">
          <g id="labels" transform="translate(100,-220)">
            <rect className="previousDistribution" x="0" y="41.6" height="20" width="100" />
            <text className="graph_label" x="125" y="64.6">
              {t('assessment:graph.rings.distributionBefore')}
            </text>
            <rect className="currentDistribution" x="0" y="108.2" height="20" width="100" />
            <text className="graph_label" x="125" y="131.2">
              {t('assessment:graph.rings.distributionNow')}
            </text>
          </g>

          <g id="data" transform="translate(150,-250)">
            <GraphGrid height="1000" columns="12" />
            <GraphAxisLabels
              type="left" min="0" max={this.props.data.maxPercentage * 100}
              title="ringDistribution" size="1000" suffix="%" />
            {currentBars}
            {previousBars}
            <GraphBottomLabels content={values} />
          </g>
        </g>
      </svg>
    );
  }
}

export default withTranslation('common', 'home')(withStyles(styles)(ValueDistributionGraph));
