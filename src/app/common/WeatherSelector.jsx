import React from 'react'

import Select from '@material-ui/core/Select';

import WeatherSelectorStyle from 'app/common/WeatherSelector.style';
import WeatherConditions from 'constants/WeatherConditions'
import WeatherIcons from 'svg/icon/Weather'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {weathers: []}
  }

  componentDidMount() {
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
  }

  render() {
    return (
      <Select
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
}
