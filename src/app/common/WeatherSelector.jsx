'use strict';

var React = require('react');
var MUI = require('app/common/MaterialUI');

import SelectField from 'components/SelectField';

import WeatherSelectorStyle from 'app/common/WeatherSelector.style';
var WeatherConditions = require('constants/WeatherConditions');
var WeatherIcons = require('svg/icon/Weather');

module.exports = React.createClass({
  getInitialState: function() {
    this.style = new WeatherSelectorStyle(this.props.style.styleProvider);
    return {weathers: []};
  },
  componentDidMount: function() {
    var current = this.state;
    Object.keys(WeatherConditions).forEach(function(weather) {
      var CurrentIcon = WeatherIcons[WeatherConditions[weather]];
      current.weathers.push(
        {
          id: weather,
          label: (<CurrentIcon height={this.style.labelHeight} />),
          name: (<CurrentIcon height={this.style.listHeight} />),
        }
      );
    }, this);
    this.setState(current);
  },
  render: function() {
    return (
      <SelectField
        style={this.props.style}
        id={'aaa-weatherSelector'}
        value={this.props.value}
        onChange={this.props.onChange}
        items={this.state.weathers}
        hintText={this.props.hintText} />
    );
  }
});
