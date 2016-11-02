const React = require('react');

const MUI = require('app/common/MaterialUI');

const ReportTile = require('app/reports/ReportTile.jsx');

module.exports = React.createClass({
  render: function() {

    return (
      <MUI.Card>
        <MUI.CardHeader
          title="Text[report title]"
          subtitle="Text[report subtitle]" />
        <MUI.CardText>
          <ReportTile seasonId={1} year={2015} month={'08'} />
        </MUI.CardText>
      </MUI.Card>
    );
  }
});
