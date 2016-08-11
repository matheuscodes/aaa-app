var React = require('react');

var TrainingTypes = require('constants/TrainingTypes.json');

var MUI = require('app/common/MaterialUI');

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
    let current = this.state;
    current.newDistance = event.target.value;
    this.setState(current);
  },
  setDate: function(event, date){
  console.log(date);
    let current = this.state;
    current.date = date;
    this.setState(current);
  },
  setArrowCount: function(event) {
    let split = event.target.id.split('_');
    let current = this.state;
    current.arrows[split[1]][split[2]] = parseInt(event.target.value);
    this.setState(current);
  },
  increaseArrows: function(event) {
    let split = event.target.id.split('_');
    let current = this.state;
    if(typeof current.arrows[split[1]][split[2]] ==='undefined'){
      current.arrows[split[1]][split[2]] = 0;
    }
    current.arrows[split[1]][split[2]] += 1;
    this.setState(current);
  },
  decreaseArrows: function(event) {
    let split = event.target.id.split('_');
    let current = this.state;
    if(current.arrows[split[1]][split[2]] > 0){
      current.arrows[split[1]][split[2]] -= 1;
    }
    this.setState(current);
  },
  createNewDistance: function(){
    let current = this.state;
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
    let headers = TrainingTypes.map(function(type){
      return (
        <MUI.TableHeaderColumn key={'newTrainingCardType_'+type}>
          Text[{type}]
        </MUI.TableHeaderColumn>
      );
    });
    let row = {};
    //TODO move styles up, too much repetition
    for(let distance in this.state.arrows){
      row[distance] = TrainingTypes.map(function(type){
        return (
          <MUI.TableRowColumn key={'newTrainingCard_'+distance+'_'+type}>
            <MUI.IconButton id={'newTrainingInc_'+distance+'_'+type} style={{width:'25%',height:'25%',padding:0}} iconStyle={{width:'100%',height:'100%',color:MUI.palette.accent1Color}} onTouchTap={this.decreaseArrows}>
              <MUI.icons.content.remove_circle/>
            </MUI.IconButton>
            <MUI.TextField
              style={{width:'39%',padding:'0 5% 0 5%'}}
              inputStyle={{textAlign:'center'}}
              id={'newTrainingCardText_'+distance+'_'+type}
              value={this.state.arrows[distance][type]}
              onChange={this.setArrowCount} />
            <MUI.IconButton id={'newTrainingDec_'+distance+'_'+type} style={{width:'25%',height:'25%',padding:0}} iconStyle={{width:'100%',height:'100%',color:MUI.palette.accent1Color}} onTouchTap={this.increaseArrows}>
              <MUI.icons.content.add_circle/>
            </MUI.IconButton>
          </MUI.TableRowColumn>
        );
      },this);
    }

    let rows = [];
    for(let distance in row){
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
        {/*<div>
          <div id='aaa_training_card' className='mdl-cell mdl-cell--8-col'>
            <div className='mdl-card mdl-shadow--2dp'>
              <div className='mdl-card__title'>
                <h1 className='mdl-card__title-text'>Text['add_new_training']</h1>
              </div>
              <form>
                <div className='mdl-card__supporting-text mdl-grid'>
                  <div className='mdl-cell mdl-cell--12-col'>
                    <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
                      <input className='mdl-textfield__input' type='text' pattern='[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])' id='aaa_training_date' value={this.state.date} onChange={this.setDate} />
                      <label className='mdl-textfield__label' htmlFor='aaa_training_date'>Text['date']</label>
                      <span className='mdl-textfield__error'>Text['not_a_date']</span>
                    </div>
                  </div>



                  <div className='mdl-cell mdl-cell--3-col'>
                    <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
                      <input className='mdl-textfield__input' type='text' pattern='-?[0-9]*(\.[0-9]+)?' id='aaa_training_distance' onChange={this.changeNewDistance} />
                      <label className='mdl-textfield__label' htmlFor='aaa_training_distance'>Text['distance']</label>
                      <span className='mdl-textfield__error'>Text['not_a_number']</span>
                    </div>
                  </div>

                  <button id='aaa_add_training' onClick={this.createNewDistance} className='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-cell mdl-cell--1-col'>
                    <i className='material-icons'>add</i>
                  </button>
                  <div className='mdl-tooltip' htmlFor='aaa_add_training'>Text['add_distance']</div>
                </div>
              </form>

            </div>
          </div>
          <div className='mdl-layout-spacer'></div>
        </div>*/}
      </MUI.Card>
    );
  }
});
