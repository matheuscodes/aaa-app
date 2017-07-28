const React = require('react');
const MUI = require('app/common/MaterialUI');

import DirectionSelectorStyle from 'app/common/DirectionSelector.style';
import directions from 'constants/Directions';
import SelectField from 'components/SelectField';

const Compass = require('svg/icon/Compass');

const DirectionSelector = React.createClass({
  propTypes: {
    style: React.PropTypes.object,
    type: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    hintText: React.PropTypes.string
  },

  getInitialState: function(){
    this.style = new DirectionSelectorStyle(this.props.style.styleProvider);
    return {};
  },

  render: function() {
    return (
      <SelectField
        style={this.props.style}
        value={this.props.value}
        onChange={this.props.onChange}
        items={directions.map((direction) => {
          return {
            id: direction,
            label: (<Compass
                            direction={direction}
                            height={this.style.labelHeight} />),
            name: (<Compass
                            direction={direction}
                            height={this.style.listHeight} />),
          }
        }, this)}
        hintText={this.props.hintText} />
    );
  }
});

module.exports = DirectionSelector;
