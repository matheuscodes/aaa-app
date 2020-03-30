import React from 'react'

import Select from '@material-ui/core/Select';

import directions from 'constants/Directions';

import Compass from 'svg/icon/Compass'

class DirectionSelector extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Select
        style={this.props.style}
        value={this.props.value}
        onChange={this.props.onChange}
        floatingLabelFixed={true}
        floatingLabelText={" "}
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
}

export default DirectionSelector;
