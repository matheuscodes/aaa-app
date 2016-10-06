'use strict';

var React = require('react');
var MUI = require('app/common/MaterialUI');

var Compass = require('svg/icon/Compass.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <MUI.SelectField
        style={this.props.style}
        id={'aaa-directionSelector_' + this.props.type}
        value={this.props.value}
        onChange={this.props.onChange}
        floatingLabelFixed={true}
        floatingLabelText={" "}
        hintText={this.props.hintText} >
        {/* FIXME temporary fix for https://github.com/callemall/material-ui/issues/2446*/}
        <MUI.MenuItem value={'undefined'} primaryText={" "} />
        {/* FIXME too. many. copy. paste */}
        <MUI.MenuItem
          value={'N'}
          label={<Compass direction={'N'} height={'24pt'} style={{padding: '5pt'}} />}
          primaryText={<Compass direction={'N'} height={'100%'} />} />
        <MUI.MenuItem
          value={'NE'}
          label={<Compass direction={'NE'} height={'24pt'} style={{padding: '5pt'}} />}
          primaryText={<Compass direction={'NE'} height={'100%'} />} />
        <MUI.MenuItem
          value={'E'}
          label={<Compass direction={'E'} height={'24pt'} style={{padding: '5pt'}} />}
          primaryText={<Compass direction={'E'} height={'100%'} />} />
        <MUI.MenuItem
          value={'SE'}
          label={<Compass direction={'SE'} height={'24pt'} style={{padding: '5pt'}} />}
          primaryText={<Compass direction={'SE'} height={'100%'} />} />
        <MUI.MenuItem
          value={'S'}
          label={<Compass direction={'S'} height={'24pt'} style={{padding: '5pt'}} />}
          primaryText={<Compass direction={'S'} height={'100%'} />} />
        <MUI.MenuItem
          value={'SW'}
          label={<Compass direction={'SW'} height={'24pt'} style={{padding: '5pt'}} />}
          primaryText={<Compass direction={'SW'} height={'100%'} />} />
        <MUI.MenuItem
          value={'W'}
          label={<Compass direction={'W'} height={'24pt'} style={{padding: '5pt'}} />}
          primaryText={<Compass direction={'W'} height={'100%'} />} />
        <MUI.MenuItem
          value={'NW'}
          label={<Compass direction={'NW'} height={'24pt'} style={{padding: '5pt'}} />}
          primaryText={<Compass direction={'NW'} height={'100%'} />} />
      </MUI.SelectField>
    );
  }
});
