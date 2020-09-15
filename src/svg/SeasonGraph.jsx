import React from 'react'
import { withTranslation } from 'react-i18next'
import moment from 'moment'

import GraphStyle from 'svg/common/GraphStyle'
import GraphBottomLabels from 'svg/common/GraphBottomLabels'
import GraphAxisLabels from 'svg/common/GraphAxisLabels'
import GraphEstimations from 'svg/common/GraphEstimations'
import GraphGrid from 'svg/common/GraphGrid'

import ActualBar from 'svg/season/ActualBar'
import PlanBar from 'svg/season/PlanBar'
import EventBar from 'svg/season/EventBar'
import SeasonLabels from 'svg/season/SeasonLabels'
import ShareBar from 'svg/season/ShareBar'

const sideLabelsSize = 397;
const columnWidth = 100;

class SeasonGraph extends React.Component {
  render() {
    const t = this.props.t;

    //const weekStart = moment(this.props.data.start).isoWeek();
    const dateStart = moment(this.props.data.start).startOf('isoWeek');
    const dateEnd = moment(this.props.data.end).startOf('isoWeek');

    const mapData = {};
    this.props.data.goals.forEach(function(single) {
      mapData[single.week] = single;
    });

    const weeks = [];
    const sortedData = [];
    let index = 0;
    const weekIndex = {};
    for (let i = dateStart; i <= dateEnd; i.add(1,'weeks')) {
      const localWeek = i.isoWeek();
      weekIndex[localWeek] = index;
      index += 1;
      weeks.push(localWeek);
      if(typeof mapData[localWeek] !== 'undefined'){
        sortedData.push(mapData[localWeek]);
      }
    }

    const totalWeeks = weeks.length;
    const extraPadding = this.props.extraPadding ?
                         this.props.extraPadding * columnWidth : 0;
    const generalWidth = sideLabelsSize * 2.5 +
                         totalWeeks * columnWidth + 50 + extraPadding;
    const generalHeight = 1000 + 150 + 50;

    var values = [];

    const seasonBars = sortedData.map(function(single, index) {
      const barUnit = 1000 / this.props.data.max;

      values.push(single.averageGrade);
      // TODO maybe move unit to the components themselves?
      return (
        <g>
          <PlanBar
            value={single.arrowCount * barUnit}
            column={index}
            max={this.props.data.max} />
          <ActualBar
            target={(single.arrowsShot - single.techniqueShot) * barUnit}
            training={single.techniqueShot * barUnit}
            column={index}
            max={this.props.data.max} />
          <ShareBar
            value={(single.arrowCount - single.targetShare) * barUnit}
            column={index}
            max={this.props.data.max} />
        </g>
      );
    }, this);

    const eventBars = (this.props.events || []).map(function(single, index) {
      return (
        <g>
          <EventBar event={single}
                    column={weekIndex[moment(single.date).isoWeek()]} />
        </g>
      );
    }, this);

    return (
      <svg id={this.props.graphId}
            style={this.props.style}
            version="1.1"
            viewBox={[
              '0 ', (-generalHeight),
              ' ', (generalWidth + 2),
              ' ', (generalHeight + 2)
            ].join('')}
            preserveAspectRatio="xMidYMid meet"
            width={'100%'} >
        <GraphStyle />
        <g id="main">
          {this.props.hideLabels ? '' : <SeasonLabels max="1000" />}
          <g
            id="data"
            transform={'translate(' + (sideLabelsSize * 2) + ',-150)'}>
            <GraphGrid height="1000" columns={totalWeeks} />
            <GraphBottomLabels
              content={weeks}
              prefix={t('common:calendar.week.short')} />
            <GraphAxisLabels
              type="left" min="0" max={this.props.data.max}
              title="arrow_count" size="1000" />
            {eventBars}
            {seasonBars}
            <GraphEstimations
              data={values} size="1000" estimate={true}
              max={this.props.data.maxValue} min={this.props.data.minValue} />
            <GraphAxisLabels
              type="right" title="results" size="1000"
              min={this.props.data.minValue} max={this.props.data.maxValue}
              offset={totalWeeks * 100}/>
          </g>
          <g id="aaa-holgerCopyright"
            transform={'translate(' + sideLabelsSize * 2 + ',0)'}>
            <text fontSize={'24pt'}>
              <tspan y="-5" x="0">{this.props.t("common:copyright.holger.short")}</tspan>
            </text>
          </g>
        </g>
      </svg>
    );
  }
}

export default withTranslation('common')(SeasonGraph);
