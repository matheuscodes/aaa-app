var React = require('react');

var TrainingTypes = require('constants/TrainingTypes.json');

module.exports = React.createClass({
  getInitialState: function() {
    return {date:'2016-06-06',arrows:{}};
  },
  changeNewDistance:function(event){
    //TODO change convention to this and no longer "_":
    this.state.newDistance = event.target.value;
  },
  setDate: function(event){
    this.state.date = event.target.value;
  },
  createNewDistance: function(){
    //this.state.arrows[this.state.newDistance] = {};
    console.log(this.state);
  },
  render: function() {
    //TODO move this to a component, used in 2 places already
    let headers = TrainingTypes.map(function(type){
      return (
        <th key={'newTrainingCardType_'+type}> Text[{type}] </th>
      );
    });
    let row = {};
    for(let distance in this.state.arrows){
      row[distance] = TrainingTypes.map(function(type){
        return (
          <td key={'newTrainingCard_'+distance+'_'+type}> {this.state.arrows[distance][type] ? this.state.arrows[distance][type] : " - "} </td>
        );
      });
    }

    let rows = [];
    for(let distance in row){
      rows.push(
        <tr>
          <td> {distance} </td>
          {row[distance]}
        </tr>
      )
    }
    return (
      <div>
        <div className='mdl-layout-spacer'></div>
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

                <table className='mdl-card__supporting-text mdl-grid'>
                  <tbody>
                    <tr>
                      <th> Text['distance header'] </th>
                      {headers}
                    </tr>
                    {rows}
                  </tbody>
                </table>

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
            <div className='mdl-card__menu'>
              <button id='aaa_upload_training' onClick={this.createNewDistance} className='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>
                <i className='material-icons'>backup</i>
              </button>
              <div className='mdl-tooltip' htmlFor='aaa_upload_training'>Text['upload_training']</div>
              <button id='aaa_discard_training' onClick={this.createNewDistance} className='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>
                <i className='material-icons'>delete</i>
              </button>
              <div className='mdl-tooltip' htmlFor='aaa_discard_training'>Text['discard_training']</div>
            </div>
          </div>
        </div>
        <div className='mdl-layout-spacer'></div>
      </div>
    );
  }
});
