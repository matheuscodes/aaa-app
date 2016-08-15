var React = require('react');

var MUI = require('app/common/MaterialUI');
var MonthReportTable = require('svg/MonthReportTable.jsx');

var style = {
}

module.exports = React.createClass({
  getInitialState: function() {
    return {
      firstDay: new Date('2016-08-01'),
      lastDay: new Date('2016-09-04')
    };
  },
  render: function() {
    return (
      <MUI.Card>
        <MUI.CardHeader
          title="Text[report title]"
          subtitle="Text[report subtitle]" />
        <MUI.CardText>
          <MUI.GridList cellHeight={'unset'} cols={2} padding={10} style={{width:'100%'}}>
            <MUI.GridTile cols={1} >
              <MonthReportTable data={this.state} />
            </MUI.GridTile>
          </MUI.GridList>
        </MUI.CardText>

        <MUI.CardActions style={{textAlign:'right'}}>
          <MUI.FloatingActionButton mini={true} secondary={true} style={{margin: '5pt'}}>
            <MUI.icons.action.delete />
          </MUI.FloatingActionButton>
          <MUI.FloatingActionButton style={{margin: '5pt'}}>
            <MUI.icons.action.backup />
          </MUI.FloatingActionButton>
        </MUI.CardActions>
      </MUI.Card>
    );
  }
});
