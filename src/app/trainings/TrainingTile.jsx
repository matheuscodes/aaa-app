'use strict'
var React = require('react');
var MUI = require('app/common/MaterialUI');

var dateToId = require('useful/DateToId');
var MiniCalendar = require('svg/common/MiniCalendar.jsx');
var TrainingTypes = require('constants/TrainingTypes.json');

module.exports = React.createClass({
  render: function() {

    let headers = TrainingTypes.map(function(type){
      return (
        <MUI.TableHeaderColumn key={'trainingHeader_'+type}>Text[{type}]</MUI.TableHeaderColumn>
      );
    });

    let row = {};
    for(let distance in this.props.training.arrows){
      row[distance] = TrainingTypes.map(function(type){
        return (
          <MUI.TableRowColumn key={'aaa-trainingCell_'+ dateToId(this.props.training.date) +'_'+distance+'_'+type}>
            {this.props.training.arrows[distance][type] ? this.props.training.arrows[distance][type] : " - "}
          </MUI.TableRowColumn>
        );
      },this);
    }

    let rows = [];
    for(let distance in row){
      rows.push(
        <MUI.TableRow key={'aaa-trainingRow_'+ dateToId(this.props.training.date) +'_'+distance}>
          <MUI.TableRowColumn>{distance}</MUI.TableRowColumn>
          {row[distance]}
        </MUI.TableRow>
      )
    }
    return (
      <MUI.Paper style={{display:'inline-block'}} zDepth={1}>
        <MUI.GridList cellHeight={'auto'} cols={8} rows={1} padding={10} >
          <MUI.GridTile style={{padding:'5pt'}}
            cols={1} >
            <MiniCalendar
              width='32pt'
              height='32pt'
              day={this.props.training.date.getDate()}
              month={this.props.training.date.getMonth()} />
          </MUI.GridTile>
          <MUI.GridTile style={{padding:'5pt'}} cols={6} >
            <p>
              Text['total arrows'] {this.props.training.total_arrows} <br/>
              Text['total time'] {this.props.training.time} <br/>
              Text['arrows per minute'] {(this.props.training.total_arrows / this.props.training.time).toPrecision(3)}
            </p>
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
          </MUI.GridTile>
          <MUI.GridTile style={{padding:'5pt'}} cols={1} >
            <MUI.FloatingActionButton mini={true} secondary={true} style={{margin: '5pt'}}>
              <MUI.icons.action.delete />
            </MUI.FloatingActionButton>
          </MUI.GridTile>
        </MUI.GridList>
      </MUI.Paper>
    );
  }
});
