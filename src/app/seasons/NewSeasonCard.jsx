var React = require('react');

var MUI = require('app/common/MaterialUI');
var API = require('api');
var Waiting = require('app/common/Waiting.jsx');

var NewSeason= function(context){
  var equipment = context.state.equipment.map(function(equipment){
    return(
      <MUI.MenuItem
        key={'aaa-equipmentChoice_'+equipment.id}
        value={equipment.id}
        label={"Text [label]" +equipment.name}
        primaryText={"Text [primary]" + equipment.name} />
    );
  });

  var weekPlans = context.state.season.goals.map(function(goal,index){
    return(
      <MUI.GridTile key={'aaa-newSeasonGoal_'+index} style={{padding:'5pt'}} cols={1} >
        <MUI.GridList cellHeight={'auto'} cols={1} padding={10} >
          <MUI.GridTile style={{padding:'5pt'}} cols={1} >
            <MUI.TextField
              style={{width:'100%'}}
              id={'aaa-newSeasonArrowCount_'+index}
              value={goal.arrowCount}
              hintText={"Text[count] week "+goal.week}
              floatingLabelText={"Text[count] week "+goal.week} />
          </MUI.GridTile>
          <MUI.GridTile style={{padding:'5pt'}} cols={1} >
            <MUI.TextField
              style={{width:'100%'}}
              id={'aaa-newSeasonTargetShare_'+index}
              value={goal.targetShare}
              hintText={"Text[share] week "+goal.week}
              floatingLabelText={"Text[share] week "+goal.week} />
          </MUI.GridTile>
        </MUI.GridList>
      </MUI.GridTile>
    );
  });

  return(
    <MUI.GridList cellHeight={'auto'} cols={4} padding={10} >
      <MUI.GridTile style={{padding:'5pt'}} cols={4} >
        <MUI.TextField
          style={{width:'100%'}}
          id={'aaa-newSeasonName'}
          value={context.state.season.name}
          hintText={"Text[name]"}
          floatingLabelText={"Text[name]"} />
      </MUI.GridTile>
      <MUI.GridTile style={{padding:'5pt'}} cols={4} >
        <MUI.SelectField
          style={{width:'100%'}}
          id={'aaa-newSeasonEquipment'}
          value={context.state.season.equipmentId}
          floatingLabelFixed={true}
          floatingLabelText={" "}
          hintText={"Text[weather]"} >
          {/*FIXME temporary fix for https://github.com/callemall/material-ui/issues/2446*/}
          <MUI.MenuItem value={'undefined'} primaryText={"Text[no equipment]"} />
          {equipment}
        </MUI.SelectField>
      </MUI.GridTile>
      <MUI.GridTile style={{padding:'5pt'}} cols={2} >
        <MUI.DatePicker
          id={'aaa-seasonStartDate'}
          floatingLabelText='Text[Season start date]'
          autoOk={true}
          defaultDate={context.state.season.start}
          onChange={context.setStartDate} />
      </MUI.GridTile>
      <MUI.GridTile style={{padding:'5pt'}} cols={2} >
        <MUI.DatePicker
          id={'aaa-seasonEndDate'}
          floatingLabelText='Text[Season start date]'
          autoOk={true}
          defaultDate={context.state.season.end}
          onChange={context.setEndDate} />
      </MUI.GridTile>
      {weekPlans}
    </MUI.GridList>
  );
}

module.exports = React.createClass({
  getInitialState: function() {
    return {equipment:[]};
  },
  componentDidMount: function() {
    if(typeof this.props.seasonId !== 'undefined'){
      API.seasons.getById(this.props.seasonId,this,function(season){
        API.equipment.getList(this,function(list){
          this.setState({equipment:list,season:season});
        });
      });
    }
    else{
      API.equipment.getList(this,function(list){
        this.setState({equipment:list,season:{}});
      });
    }
  },
  render: function() {
    return (
      <MUI.Card>
        <MUI.CardHeader
          title="Text[new season title]"
          subtitle="Text[new season subtitle]" />
        <MUI.CardText>
          {this.state.season ? NewSeason(this) : <Waiting />}
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
