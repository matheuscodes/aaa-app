'use strict'

var React = require('react');
var MUI = require('app/common/MaterialUI');

var BaseLayout = require('app/common/BaseLayout.jsx');
var NewSeasonCard = require('app/seasons/NewSeasonCard.jsx');
var SeasonList = require('app/seasons/SeasonList.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <BaseLayout layoutName='seasonsPage' userAgent={this.props.userAgent} languages={this.props.languages} title='Text[seasons]' >
        <MUI.GridList cellHeight={'unset'} cols={4} padding={10} style={{width: '100%'}} >
          <MUI.GridTile style={{padding:'5pt'}}
            cols={2} >
            <NewSeasonCard seasonId={3} />
          </MUI.GridTile>
          <MUI.GridTile style={{padding:'5pt'}}
            cols={2} >
            <SeasonList />
          </MUI.GridTile>
        </MUI.GridList>
      </BaseLayout>
    );
  }
});
