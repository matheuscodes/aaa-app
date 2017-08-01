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
    Object.keys(WeatherConditions).forEach((weather) => {
      const CurrentIcon = WeatherIcons[WeatherConditions[weather]];
      this.state.weathers.push(
        {
          id: weather,
          label: (<CurrentIcon height={this.style.labelHeight} />),
          name: (<CurrentIcon height={this.style.listHeight} />),
        }
      );
    });
    this.setState(this.state);
  },
  render: function() {
    return (
      <SelectField
        style={this.props.style}
        id={'aaa-weatherSelector'}
        value={this.props.value}
        onChange={this.props.onChange}
        items={this.state.weathers}
        floatingLabelFixed={true}
        floatingLabelText={" "}
        hintText={this.props.hintText} />
    );
  }
});
