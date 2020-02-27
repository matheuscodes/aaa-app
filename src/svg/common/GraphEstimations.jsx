import React from 'react'

const GraphEstimations = React.createClass({
  propTypes: {
    // TODO create a class to validate against
    data: React.PropTypes.object,
    contentName: React.PropTypes.string,
    estimate: React.PropTypes.bool,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    size: React.PropTypes.number
  },
  render: function() {
    const estimations = [];
    var minResult = (this.props.min || 0);
    var maxResult = (this.props.max || 10);
    this.props.data.forEach(function(value, index) {
      if (typeof value !== 'undefined' && value > 0) {
        estimations.push(value);
      } else if (this.props.estimate && index > 1) {
        var estimate = -1;
        if (estimations[index - 1] > 0) {
          estimate = estimations[index - 1];
        }
        if (estimations[index - 2] > 0) {
          estimate += estimations[index - 2];
          estimate /= 2;
        }
        estimations.push(estimate);
      } else if (this.props.estimate && estimations[0] >= 0) {
        var estimate = (estimations[0] + this.props.min) / 2;
        estimations.push(estimate);
      } else {
        estimations.push(-1);
      }
    }, this);

    var first = true;
    var path = ['M '];
    estimations.forEach(function(value, index) {
      if (value >= 0) {
        var k = -((value - minResult) / (maxResult - minResult));
        if (k <= 0) {
          if (first) {
            path.push([
              (50 + index * 100), " ", (k * this.props.size),
              " C ", (index * 100 + 100), ",", (k * this.props.size), " "
            ].join(''));
            first = false;
          } else {
            path.push([
              (50 + index * 100 - 50), ",", (k * this.props.size),
              " ", (index * 100 + 50), " ", (k * this.props.size), " S "
            ].join(''));
          }
        }
      }
    }, this);
    if (path.length > 0) {
      path[path.length - 1] = path[path.length - 1].replace(' S ', '');
    }

    var bullets = this.props.data.map(function(value, index) {
      if (value > 0) {
        return (
          <circle key={'aaa-graphEstimationsBullet_' + index}
                  className={['result',
                    (this.props.contentName ? '-' : ''),
                    (this.props.contentName ? this.props.contentName : '')
                  ].join('')}
                  cx={index * 100 + 50}
                  cy={-((value - minResult) / (maxResult - minResult)) *
                      this.props.size}
                  r="10"/>
        );
      }
      return null;
    }, this);

    return (
      <g>
        <path
          className={['estimation',
            (this.props.contentName ? '-' : ''),
            (this.props.contentName ? this.props.contentName : '')
          ].join('')}
          d={path.join("")} />
        {bullets}
      </g>
    );
  }
});

export default GraphEstimations;
