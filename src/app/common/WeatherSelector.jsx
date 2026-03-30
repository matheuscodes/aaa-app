import React from 'react'

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

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
