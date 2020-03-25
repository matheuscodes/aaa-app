import React from 'react';

import ArrowTrainingTypes from 'constants/ArrowTrainingTypes';

import InputStepStyle from 'app/trainings/ArrowSteps/InputStep.style';


@autobind
export default class InputStep extends React.Component {

  constructor(props){
    super(props);
    this.style = new InputStepStyle(this.props.style.styleProvider);
    this.state = {};
  }

  render(){
    const { t } = this.props;
    return (
      <div>
        <MUI.GridList
          cols={2}
          cellHeight={'auto'} >
          {
            Object.keys(this.props.arrowTrainingTypes)
              .filter((type) => this.props.arrowTrainingTypes[type])
              .map((type, index) => (
              <MUI.GridTile
                style={MUI.styles.GridTile}
                cols={this.style.typeColumns} >
                <h5 style={this.style.h5}>
                  {t(`training:arrowTrainingTypes.${type}`)}:
                </h5>
                <MUI.GridList
                  cols={4}
                  cellHeight={'auto'} >
                  {
                    Object.keys(this.props.arrowDistances)
                      .filter((distance) => this.props.arrowDistances[distance])
                      .map((distance, index) => (
                        <MUI.GridTile
                          key={index}
                          style={MUI.styles.GridTile}
                          cols={this.style.distanceColumns} >
                          <MUI.TextField
                            style={this.style.TextField}
                            id={`aaa-arrowTraining_${type}_${distance}`}
                            type={'number'}
                            hintText={`${distance}m`}
                            floatingLabelText={`${distance}m`}
                            onChange={(event, value) => {
                              this.props.setArrowCount(distance, type, value);
                            }} />
                        </MUI.GridTile>
                      ))
                  }
                </MUI.GridList>
              </MUI.GridTile>
            ))
          }
        </MUI.GridList>
      </div>
    );
  }



}

InputStep.propTypes = {
  t: PropTypes.func.isRequired,
  style: PropTypes.object,
  setArrowTrainingTypes: PropTypes.func,
};
