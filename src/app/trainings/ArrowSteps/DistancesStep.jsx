import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

import ArrowTrainingTypes from 'constants/ArrowTrainingTypes';

import TextField from 'components/TextField';
import SelectField from 'components/SelectField';

import DistancesStepStyle from 'app/trainings/ArrowSteps/DistancesStep.style';


export default function DistancesStep(props) {
  const style = new DistancesStepStyle(props.style.styleProvider);

  return (
    <div>
      <MUI.GridList
        cols={4}
        cellHeight={'auto'}
        style={style}>
          {
            Object.keys(props.arrowDistances).map(distance => (
              <MUI.GridTile style={MUI.styles.GridTile} cols={style.columns} >
                <MUI.Checkbox
                  onCheck={(event, isInputChecked) => {
                    props.setArrowDistances({[distance]:isInputChecked});
                  }}
                  defaultChecked={props.arrowDistances[distance]}
                  label={`${distance}m`} />
              </MUI.GridTile>
            ))
          }
      </MUI.GridList>
    </div>
  );
}

DistancesStep.propTypes = {
  t: PropTypes.func.isRequired,
  style: PropTypes.object,
  setArrowTrainingTypes: PropTypes.func,
};
