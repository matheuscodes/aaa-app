import React from 'react';

import ArrowTrainingTypes from 'constants/ArrowTrainingTypes';

import DistancesStepStyle from 'app/trainings/ArrowSteps/DistancesStep.style';


@autobind
export default class DistancesStep extends React.Component {

  constructor(props){
    super(props);
    this.style = new DistancesStepStyle(this.props.style.styleProvider);
    this.state = {};
  }

  createNewDistances(){
    if (typeof this.state.newDistances === 'undefined' ||
        this.state.newDistances === '') {
      this.props.messenger.showMessage(
        this.props.t('training:messages.emptyError'),
        "ERROR"
      );
      return;
    } else {
      const distances = [];
      let error = false;
      this.state.newDistances.split(',').forEach(string => {
          const number = string.replace('m','').replace('M','').trim();
          const distance = parseFloat(number);
          if(!number.match('^[0-9]*$') || isNaN(distance)) {
            this.props.messenger.showMessage(
              this.props.t('training:messages.notANumberError'),
              "ERROR"
            );
            error = true;
          } else {
            distances.push(distance);
          }
      });
      if(!error && distances.length > 0){
        distances.forEach(distance => {
          this.props.setArrowDistances({[distance]:true});
        });
        this.setState(this.state);
      }
    }
  }

  changeNewDistances(event) {
    this.state.newDistances = event.target.value;
  }

  render(){
    const { t } = this.props;
    return (
      <div>
        <MUI.GridList
          cols={4}
          cellHeight={'auto'} >
          {
            Object.keys(this.props.arrowDistances).map((distance, index) => (
              <MUI.GridTile
                key={index}
                style={MUI.styles.GridTile}
                cols={this.style.columns} >
                <MUI.Checkbox
                  onCheck={(event, isInputChecked) => {
                    this.props.setArrowDistances({[distance]:isInputChecked});
                  }}
                  defaultChecked={this.props.arrowDistances[distance]}
                  label={`${distance}m`} />
              </MUI.GridTile>
            ))
          }
          <MUI.GridTile
            style={MUI.styles.GridTile}
            cols={4} >
            <MUI.GridList
              cols={4}
              cellHeight={'auto'} >
              <MUI.GridTile
                style={MUI.styles.GridTile}
                cols={3} >
                <MUI.TextField
                  style={this.style.distanceTextField}
                  id={'newTrainingCardNewDistance'}
                  hintText={t('training:newTraining.distanceTextField.hint')}
                  floatingLabelText={
                    t('training:newTraining.distanceTextField.label')
                  }
                  defaultValue={this.state.newDistances}
                  onChange={this.changeNewDistances} />
              </MUI.GridTile>
              <MUI.GridTile
                style={MUI.styles.GridTile}
                cols={1} >
                <MUI.IconButton
                  iconStyle={this.style.distanceAddButton}
                  onTouchTap={this.createNewDistances}>
                  <MUI.icons.content.add_box/>
                </MUI.IconButton>
              </MUI.GridTile>
            </MUI.GridList>
          </MUI.GridTile>
        </MUI.GridList>
      </div>
    );
  }



}

DistancesStep.propTypes = {
  t: PropTypes.func.isRequired,
  style: PropTypes.object,
  setArrowTrainingTypes: PropTypes.func,
};
