'use strict'
var React = require('react');

var MUI = require('app/common/MaterialUI');

var MiniCalendar = require('svg/common/MiniCalendar.jsx');
var TrainingTypes = require('constants/TrainingTypes.json');

module.exports = React.createClass({
  delete: function() {
    this.props.onDelete(this.props.data.id)
  },
  render: function() {

    var headers = TrainingTypes.map(function(type){
      return (
        <MUI.TableHeaderColumn key={'trainingHeader_'+type}>Text[{type}]</MUI.TableHeaderColumn>
      );
    });

    var row = {};
    for(var distance in this.props.data.arrows){
      row[distance] = TrainingTypes.map(function(type,index){
        return (
          <MUI.TableRowColumn key={'aaa-trainingCell_'+ index}>
            {this.props.data.arrows[distance][type] ? this.props.data.arrows[distance][type] : " - "}
          </MUI.TableRowColumn>
        );
      },this);
    }

    var rows = [];
    for(var distance in row){
      rows.push(
        <MUI.TableRow key={'aaa-trainingRow_'+distance}>
          <MUI.TableRowColumn>{distance}</MUI.TableRowColumn>
          {row[distance]}
        </MUI.TableRow>
      )
    }

    var subtitle = this.props.data.totalArrows ? 'Text[total time]' + this.props.data.time : '';
    subtitle += this.props.data.totalArrows ? ', Text[arrows per minute]' + (this.props.data.total_arrows / this.props.data.time).toFixed(2) : '';

    return (
      <MUI.Paper style={{display:'inline-block'}} zDepth={1}>
        <MUI.Card>
          <MUI.CardHeader
            title={'Text[total arrows] ' + this.props.data.totalArrows}
            subtitle={subtitle}
            avatar={
              <MiniCalendar
                width='32pt'
                height='32pt'
                day={this.props.data.date.getDate()}
                month={this.props.data.date.getMonth()} />
            }/>
          <MUI.CardText>
            <MUI.Table style={{width:'100%'}}>
              <MUI.TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                <MUI.TableRow>
                  <MUI.TableHeaderColumn>Text['distance header']</MUI.TableHeaderColumn>
                  {headers}
                </MUI.TableRow>
              </MUI.TableHeader>
              <MUI.TableBody displayRowCheckbox={false} >
                {rows}
              </MUI.TableBody>
            </MUI.Table>
          </MUI.CardText>
          <MUI.CardActions style={{textAlign:'right'}}>
            <MUI.FloatingActionButton mini={true} onTouchTap={this.delete} secondary={true} style={{margin: '5pt'}}>
              <MUI.icons.action.delete />
            </MUI.FloatingActionButton>
          </MUI.CardActions>
        </MUI.Card>
      </MUI.Paper>
    );
  }
});
