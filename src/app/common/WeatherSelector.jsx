import React from 'react'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

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
          name: (<CurrentIcon height={'32pt'} />),
        }
      );
    });
    this.setState(this.state);
  }

  render() {
    return (
      <FormControl fullWidth>
        <InputLabel id='aaa-weatherSelector'>{this.props.text}</InputLabel>
        <Select
          style={this.props.style}
          id={'aaa-weatherSelector'}
          value={this.props.value}
          onChange={this.props.onChange}
          items={this.state.weathers}
          renderValue={weather => {
            const CurrentIcon = WeatherIcons[WeatherConditions[weather]];
            return (<CurrentIcon height={'16pt'} />);
          }} >
          {this.state.weathers.map((weather) => <MenuItem key={weather.id} value={weather.id} >{weather.name}</MenuItem> )}
        </Select>
      </FormControl>
    );
  }
}
