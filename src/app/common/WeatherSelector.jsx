'use strict';

import React from 'react'
import MUI from 'app/common/MaterialUI'

import SelectField from 'components/SelectField';

import WeatherSelectorStyle from 'app/common/WeatherSelector.style';
import WeatherConditions from 'constants/WeatherConditions'
import WeatherIcons from 'svg/icon/Weather'

export default React.createClass({
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
