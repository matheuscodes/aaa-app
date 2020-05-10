import React from 'react'
import { withTranslation } from 'react-i18next'


class GraphAxisLabels extends React.Component {
  render() {
    const t = this.props.t;
    var unit = (this.props.max - this.props.min) / 10;
    var max = this.props.max;
    var min = parseFloat(this.props.min);

    if (unit <= 0) return (
      <g id={this.props.type} transform="translate(0,0)"></g>
    );

    var iterator = [];
    for (var i = 0; i <= Math.floor((max - min) / unit); i++) {
      iterator.push(" ");
    }

    var labels = iterator.map(function(value, index) {
      return (
        <text
          key={'aaa-graphAxisLabel_' + index}
          className={this.props.type}
          x={this.props.offset ? this.props.offset + 10 : -10 }
          y={-index * (this.props.size / 10)}>
          {(min + index * unit).toPrecision(3)}
          {this.props.suffix ? this.props.suffix : null}
        </text>
      );
    }, this);

    var translation = this.props.type === 'right' ?
                      parseInt(this.props.offset, 10) + 100 : -90;
    return (
      <g id={this.props.type} transform="translate(0,0)">
        {labels}
        <text
          transform={'translate(' + translation + ',0) rotate(-90)'}
          className="title" x="0" y="0">
          {t(['common:graphLabels.axis.', this.props.title].join(''))}
        </text>
      </g>
    );
  }
}

export default withTranslation('common')(GraphAxisLabels);
