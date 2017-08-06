const React = require('react');

const TrainingTypes = require('constants/ArrowTrainingTypes');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const Notice = require('app/common/Notice');

const style = {
  arrowCountField: {
    width: '100%'
  },
  arrowCountInput: {
    textAlign: 'center',
    fontSize: '80%'
  }
};

const NewTrainingCell = React.createClass({
  propTypes: {
    t: React.PropTypes.func
  },
  setArrowCount: function(event) {
    this.props.setArrowCount(this.props.distance,
                       this.props.type,
                       parseInt(event.target.value, 10));
  },
  render: function() {
    const t = this.props.t;

    return (
      <MUI.TableRowColumn style={{padding:'0 5 0 5'}}>
        <MUI.TextField
          style={style.arrowCountField}
          inputStyle={style.arrowCountInput}
          id={['aaa-newTrainingCardText_', this.props.distance, '_', this.props.type].join('')}
          defaultValue={
            this.props.arrows[this.props.distance][this.props.type]
          }
          onChange={this.setArrowCount} />
      </MUI.TableRowColumn>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['training'], NewTrainingCell);
