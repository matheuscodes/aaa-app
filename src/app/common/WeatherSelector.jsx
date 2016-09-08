'use strict'

var React = require('react');
var MUI = require('app/common/MaterialUI');

var WeatherConditions = require('constants/weatherConditions.json');
var WeatherIcons = require('svg/icon/Weather.jsx');

module.exports = React.createClass({
  getInitialState: function(){
    return {weathers:[]};
  },
  componentDidMount: function(){
    var current = this.state;
    for(var weather in WeatherConditions){
      var CurrentIcon = WeatherIcons[WeatherConditions[weather]];
      current.weathers.push(
        <MUI.MenuItem
          key={'aaa-weatherChoice_'+weather}
          value={weather}
          label={<CurrentIcon height={'24pt'} style={{padding:'5pt'}} />}
          primaryText={<CurrentIcon height={'100%'} />} />
      );
    }
    this.setState(current);
  },
  render: function(){
    return (
      <MUI.SelectField
        style={this.props.style}
        id={'aaa-weatherSelector'}
        value={this.props.value}
        onChange={this.props.onChange}
        floatingLabelFixed={true}
        floatingLabelText={" "}
        hintText={this.props.hintText} >
        {/*FIXME temporary fix for https://github.com/callemall/material-ui/issues/2446*/}
        <MUI.MenuItem value={'undefined'} primaryText={" "} />
        {this.state.weathers}
      </MUI.SelectField>
    );
  }
});
