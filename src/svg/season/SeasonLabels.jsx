import React from 'react'
import { withTranslation } from 'react-i18next'

class SeasonLabels extends React.Component {
  render() {
    const t = this.props.t;

    return (
      <g id="labels" transform={'translate(5,-' + this.props.max + ')'}>
        <rect
          className="plan" x="0" y={(Number(this.props.max) / 10 - 25)}
          height="20" width="100" />
        <text
          className="graph_label" x="125" y={(Number(this.props.max) / 10 - 2)}>
          {t('season:graphLabels.data.totalPlan')}
        </text>

        <rect
          className="training" x="0" y={(2 * this.props.max / 10 - 25)}
          height="20" width="100" />
        <text className="graph_label" x="125" y={(2 * this.props.max / 10 - 2)}>
          {t('season:graphLabels.data.techniqueTotals')}
        </text>

        <rect
          className="target" x="0" y={(3 * this.props.max / 10 - 25)}
          height="20" width="100" />
        <text className="graph_label" x="125" y={(3 * this.props.max / 10 - 2)}>
          {t('season:graphLabels.data.targetTotals')}
        </text>

        <rect
          className="share-shadow" x="5" y={(4 * this.props.max / 10 - 25)}
          height="20" width="100" />
        <rect
          className="share" y={(4 * this.props.max / 10 - 5 - 25)}
          height="20" width="100" />
        <text className="graph_label" x="125" y={(4 * this.props.max / 10 - 2)}>
          {t('season:graphLabels.data.techniqueShare')}
        </text>

        <path className="estimation"
          d={['M 0,', (5 * this.props.max / 10 - 12.5), ' l 100,0'].join('')}/>
        <circle className="result"
          cx="50" cy={(5 * this.props.max / 10 - 12.5)} r="10"/>
        <text className="graph_label" x="125" y={(5 * this.props.max / 10 - 2)}>
          {t('season:graphLabels.data.resultTotals')}
        </text>
      </g>
    );
  }
}

export default withTranslation('season')(SeasonLabels);
