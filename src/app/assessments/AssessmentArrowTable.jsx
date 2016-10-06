'use strict';
var React = require('react');

var MUI = require('app/common/MaterialUI');
var valueConverter = require('useful/valueConverter');

var styles = {
  arrowSize: 30
};

module.exports = React.createClass({
  deleteEnd: function(event) {
    var data = event.target.id.split('_');
    // data[1] == data.index == roundIndex
    // data[2] == endIndex
    this.props.deleteEnd(data[1], data[2]);
  },
  render: function() {
    var rows = this.props.data.ends.map(function(end, endIndex) {
      var total = 0;
      var arrows = end.map(function(arrow, arrowIndex) {
        total += valueConverter.integer[arrow];
        return (
          <MUI.Avatar
            key={'aaa-assessmentArrow_' + this.props.data.index + '_' + endIndex + '_' + arrowIndex}
            color={valueConverter.color[arrow]}
            backgroundColor={valueConverter.backgroundColor[arrow]}
            size={styles.arrowSize} >{arrow}</MUI.Avatar>
        );
      }, this);
      return (
        <tr key={'aaa-assessmentRow_' + this.props.data.index + '_' + endIndex}>
          <td style={{display: 'block', maxWidth: (styles.arrowSize * 6)}} >
            {arrows}
          </td>
          <td >
            {total}
            {this.props.deleteEnd ?
              <MUI.FlatButton
                id={'aaa-assessmentDelete_' + this.props.data.index + '_' + endIndex}
                onTouchTap={this.deleteEnd}
                secondary={true}
                icon={<MUI.icons.navigation.cancel />}
                style={{margin: 2, minWidth: null}} /> : null}
          </td>
        </tr>
      );
    }, this);

    return (
      <table style={{width: '100%'}}>
        <thead>
          <tr>
            <th>Text['points']</th>
            <th>Text[]</th>
          </tr>
        </thead>
        <tbody>
          {rows}
          {this.props.data.totalScore ? <tr>
            <th style={{textAlign: 'right'}}>Text['total points']</th>
            <th>{this.props.data.totalScore}</th>
          </tr> : null}
          {this.props.data.totalScore ? <tr>
            <th style={{textAlign: 'right'}}>Text['tens']</th>
            <th>{this.props.data.tens}</th>
          </tr> : null}
          {this.props.data.totalScore ? <tr>
            <th style={{textAlign: 'right'}}>Text['xs']</th>
            <th>{this.props.data.xs}</th>
          </tr> : null}
        </tbody>
      </table>
    );
  }
});
