var React = require('react');
var BaseLayout = require('app/common/BaseLayout.jsx');

var TrainingList = require('app/trainings/TrainingList.jsx');
var NewTrainingCard = require('app/trainings/NewTrainingCard.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <BaseLayout layoutName='trainingsPage' languages={this.props.languages} title='Welcome to Advanced Archery' >
        <div className='mdl-cell--12-col'>
          <button id='aaa_new_training' className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'>
            <i className='material-icons'>add</i> Text['add_new_training']
          </button>
          <div className='mdl-tooltip' htmlFor='aaa_new_training'>Text['add_new_training']</div>
        </div>
        <div id='aaa_training_page_content' className='mdl-grid mdl-cell--12-col'>
            <NewTrainingCard />
        </div>
      </BaseLayout>
    );
  }
});
