const React = require('react');

const MUI = require('app/common/MaterialUI');
const i18nextReact = require('global/i18nextReact');

const valueConverter = require('global/ValueConverter');

import RaisedButton from 'components/RaisedButton';

function createRound(rings, arrows, ends){
  const endSize = Math.floor(arrows / ends);
  const endPoints = Math.floor(rings / ends);
  let endRest = rings % ends;
  const allEnds = [];
  for(let i = 0; i < ends; i += 1){
    const allArrows = [];
    let arrowPoints;
    let arrowRest;
    if(endRest > 0){
      arrowPoints = Math.floor((endPoints + 1) / endSize);
      arrowRest = (endPoints + 1) % endSize;
      endRest -= 1;
    } else {
      arrowPoints = Math.floor(endPoints / endSize);
      arrowRest = endPoints % endSize;
    }

    for(let j = 0; j < endSize; j += 1){
      if(arrowRest > 0){
        allArrows.push(valueConverter.letter[arrowPoints + 1]);
        arrowRest -= 1;
      } else {
        allArrows.push(valueConverter.letter[arrowPoints]);
      }
    }
    allEnds.push(allArrows)
  }
  return {ends: allEnds}
}

const NewAssessmentRound = React.createClass({
  propTypes: {
    roundIndex: React.PropTypes.number,
    addRound: React.PropTypes.func,
    t: React.PropTypes.func
  },
  getInitialState: function() {
    return {open: false, rings: 0, arrows: 0, ends: 0};
  },
  handleOpen: function() {
    this.state.open = true;
    this.setState(this.state);
  },
  handleClose: function() {
    this.setState({open: false, rings: 0, arrows: 0, ends: 0});
  },
  handleSubmit: function() {
    this.props.addRound(this.props.roundIndex, createRound(this.state.rings,
                                                           this.state.arrows,
                                                           this.state.ends));
    this.handleClose();
  },
  changeRings: function(event) {
    this.state.rings = event.target.value
    this.setState(this.state);
  },
  changeArrows: function(event) {
    this.state.arrows = event.target.value
    this.setState(this.state);
  },
  changeEnds: function(event) {
    this.state.ends = event.target.value
    this.setState(this.state);
  },
  render: function() {
    const t = this.props.t;
    return (
      <div style={this.props.style ? this.props.style : null}>
        <RaisedButton
          style={this.props.style.mainButton}
          label={t('assessment:addTotal')}
          onTouchTap={this.handleOpen} />
        <MUI.Dialog
          contentStyle={{maxWidth: 300}}
          title={t('assessment:newRound.title')}
          actions={
            <MUI.RaisedButton
              label={t('assessment:newRound.submit')}
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.handleSubmit} />
          }
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose} >
          <MUI.TextField
            style={{width: '100%'}}
            id={'aaa-newRoundRings'}
            onChange={this.changeRings}
            hintText={t('assessment:newRound.ringsTextField.hint')}
            floatingLabelText={t('assessment:newRound.ringsTextField.label')} />
          <MUI.TextField
            style={{width: '100%'}}
            id={'aaa-newRoundArrows'}
            onChange={this.changeArrows}
            hintText={t('assessment:newRound.arrowsTextField.hint')}
            floatingLabelText={t('assessment:newRound.arrowsTextField.label')} />
          <MUI.TextField
            style={{width: '100%'}}
            id={'aaa-newRoundEnds'}
            onChange={this.changeEnds}
            hintText={t('assessment:newRound.endsTextField.hint')}
            floatingLabelText={t('assessment:newRound.endsTextField.label')} />
        </MUI.Dialog>
      </div>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['assessment'],
                                               NewAssessmentRound);
