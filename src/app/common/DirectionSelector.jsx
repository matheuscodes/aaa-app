import React from 'react'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import directions from 'constants/Directions';

import Compass from 'svg/icon/Compass'

class DirectionSelector extends React.Component{
  constructor(props) {
    super(props)
    this.state = {directions: directions.map((direction) => {
      return {
        id: direction,
        name: (<Compass direction={direction} height={'32pt'} />),
      }
    })}
  }

  render() {
    return (
      <FormControl fullWidth>
        <InputLabel id='aaa-directionSelector'>{this.props.text}</InputLabel>
        <Select
          id={'aaa-directionSelector'}
          value={this.props.value}
          onChange={this.props.onChange}
          renderValue={direction => {
            return (<Compass direction={direction} height={'16pt'} />);
          }} >
          {this.state.directions.map((direction) => <MenuItem key={direction.id} value={direction.id} >{direction.name}</MenuItem> )}
        </Select>
      </FormControl>
    );
  }
}

export default DirectionSelector;
