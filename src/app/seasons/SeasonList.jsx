'use strict'
var React = require('react');

var MUI = require('app/common/MaterialUI');
var API = require('api');

var SeasonTile = require('app/seasons/SeasonTile.jsx');
var Waiting = require('app/common/Waiting.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    API.seasons.getList(this,function(list){
      this.setState({seasons:list});
    });
  },
  render: function() {
    var seasons;
    if(typeof this.state.seasons !== 'undefined') {
      seasons = this.state.seasons.map(function(season, index) {
        return (
          <MUI.GridTile key={'aaa-season_'+season.id} style={{padding:'5pt'}} cols={1} >
            <SeasonTile seasonId={season.id} data={season} />
          </MUI.GridTile>
        );
      });
    }
    return (
      <MUI.GridList cellHeight={'auto'} cols={1} padding={10} >
        {seasons ? seasons : <Waiting />}
      </MUI.GridList>
    );
  }
});
