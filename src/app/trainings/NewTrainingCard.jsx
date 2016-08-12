var React = require('react');

var TrainingTypes = require('constants/TrainingTypes.json');

var MUI = require('app/common/MaterialUI');

var style = {
  arrowCountField:{
    width:'29%',
    padding:'0 5% 0 5%'
  },
  arrowCountButton:{
    width:'30%',
    height:'30%',
    padding:0
  },
  arrowCountInput: {
    textAlign:'center',
    fontSize: '80%'
  },
  arrowCountIcon: {
    width:'100%',
    height:'100%',
    color:MUI.palette.accent1Color
  }
}

module.exports = React.createClass({
  getInitialState: function() {
    return {
      date: new Date(1451606400000),
      arrows:{
        '25':{WARMUP:33,BOARD:22},
        '12':{WARMUP:31,TARGET:21},
        '5':{WARMOUT:23,TARGET:12},
        '16':{WARMOUT:23,BOARD:121,TARGET:12},
        '1':{WARMOUT:23,TARGET:12}
      }
    };
  },
  changeNewDistance:function(event){
    var current = this.state;
    current.newDistance = event.target.value;
    this.setState(current);
  },
  setDate: function(event, date){
  console.log(date);
    var current = this.state;
    current.date = date;
    this.setState(current);
  },
  setArrowCount: function(event) {
    var split = event.target.id.split('_');
    var current = this.state;
    current.arrows[split[1]][split[2]] = parseInt(event.target.value);
    this.setState(current);
  },
  increaseArrows: function(event) {
    var split = event.target.id.split('_');
    var current = this.state;
    if(typeof current.arrows[split[1]][split[2]] ==='undefined'){
      current.arrows[split[1]][split[2]] = 0;
    }
    current.arrows[split[1]][split[2]] += 1;
    this.setState(current);
  },
  decreaseArrows: function(event) {
    var split = event.target.id.split('_');
    var current = this.state;
    if(current.arrows[split[1]][split[2]] > 0){
      current.arrows[split[1]][split[2]] -= 1;
    }
    this.setState(current);
  },
  createNewDistance: function(){
    var current = this.state;
    if(typeof current.newDistance === 'undefined'){
      //TODO throw a toast
      return;
    }
    if(typeof current.arrows[current.newDistance] === 'undefined'){
      current.arrows[current.newDistance] = {};
      delete current.newDistance;
    }
    this.setState(current);
  },

  render: function() {
    //TODO move this to a component, used in 2 places already
    var headers = TrainingTypes.map(function(type){
      return (
        <MUI.TableHeaderColumn key={'newTrainingCardType_'+type}>
          Text[{type}]
        </MUI.TableHeaderColumn>
      );
    });
    var row = {};
    //TODO move styles up, too much repetition
    for(var distance in this.state.arrows){
      row[distance] = TrainingTypes.map(function(type){
        return (
          <MUI.TableRowColumn key={'newTrainingCard_'+distance+'_'+type}>
            <MUI.IconButton id={'newTrainingInc_'+distance+'_'+type} tabIndex={-1} style={style.arrowCountButton} iconStyle={style.arrowCountIcon} onTouchTap={this.decreaseArrows}>
              <MUI.icons.content.remove_circle/>
            </MUI.IconButton>
            <MUI.TextField
              style={style.arrowCountField}
              inputStyle={style.arrowCountInput}
              id={'newTrainingCardText_'+distance+'_'+type}
              value={this.state.arrows[distance][type]}
              onChange={this.setArrowCount} />
            <MUI.IconButton id={'newTrainingDec_'+distance+'_'+type} tabIndex={-1} style={style.arrowCountButton} iconStyle={style.arrowCountIcon} onTouchTap={this.increaseArrows}>
              <MUI.icons.content.add_circle/>
            </MUI.IconButton>
          </MUI.TableRowColumn>
        );
      },this);
    }

    var rows = [];
    for(var distance in row){
      rows.push(
        <MUI.TableRow key={'newTrainingCardType_'+distance+'_distance'}>
          <MUI.TableRowColumn>{distance}</MUI.TableRowColumn>
          {row[distance]}
        </MUI.TableRow>
      )
    }
    return (
      <MUI.Card>
        <MUI.CardHeader
          title="Text[new training title]"
          subtitle="Text[new training subtitle]" />
        <MUI.CardText>
          <MUI.DatePicker
            id={'aaa-newTrainingDate'}
            floatingLabelText='Text[Training date]'
            autoOk={true}
            value={this.state.date}
            onChange={this.setDate} />
          <MUI.Table>
            <MUI.TableHeader displaySelectAll={false} adjustForCheckbox={false} >
              <MUI.TableRow>
                <MUI.TableHeaderColumn>Text['distance header']</MUI.TableHeaderColumn>
                {headers}
              </MUI.TableRow>
            </MUI.TableHeader>
            <MUI.TableBody displayRowCheckbox={false} >
              {rows}
              <MUI.TableRow>
                <MUI.TableRowColumn colSpan={'2'}>
                  <MUI.TextField
                    style={{width:'70%'}}
                    id={'newTrainingCardNewDistance'}
                    value={this.state.newDistance}
                    floatingLabelText='Text[new distance]'
                    onChange={this.changeNewDistance} />
                  <MUI.IconButton onTouchTap={this.createNewDistance}>
                    <MUI.icons.content.add_box/>
                  </MUI.IconButton>
                </MUI.TableRowColumn>
              </MUI.TableRow>
            </MUI.TableBody>
          </MUI.Table>
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
