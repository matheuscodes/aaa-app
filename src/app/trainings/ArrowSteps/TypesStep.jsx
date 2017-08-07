import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

import ArrowTrainingTypes from 'constants/ArrowTrainingTypes';

import TextField from 'components/TextField';
import SelectField from 'components/SelectField';

import TypesStepStyle from 'app/trainings/ArrowSteps/TypesStep.style';


export default function TypesStep(props) {
  const style = new TypesStepStyle(props.style.styleProvider);

  return (
    <div>
      <MUI.GridList
        cols={2}
        cellHeight={'auto'}
        style={style}>
          {
            ArrowTrainingTypes.map(type => (
              <MUI.GridTile style={MUI.styles.GridTile} cols={style.columns} >
                <MUI.Checkbox
                  onCheck={(event, isInputChecked) => {
                    props.setArrowTrainingTypes({[type]:isInputChecked});
                  }}
                  defaultChecked={props.arrowTrainingTypes[type]}
                  label={
                    props.t(`training:arrowTrainingTypes.${type}`)
                  } />
              </MUI.GridTile>
            ))
          }
      </MUI.GridList>
    </div>
  );
}

TypesStep.propTypes = {
  t: PropTypes.func.isRequired,
  style: PropTypes.object,
  setArrowTrainingTypes: PropTypes.func,
};
