import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

import TextField from 'components/TextField';
import SelectField from 'components/SelectField';

import NeurobicsStepStyle from 'app/trainings/NeurobicsSteps/NeurobicsStep.style';

export default function NeurobicsStep(props) {
  const style = new NeurobicsStepStyle(props.style.styleProvider);

  function setArrows(event, isInputChecked){
    props.setTrainingClasses({arrows:isInputChecked})
  }

  function setWorkouts(event, isInputChecked){
    props.setTrainingClasses({workouts:isInputChecked})
  }

  function setNeurobics(event, isInputChecked){
    props.setTrainingClasses({neurobics:isInputChecked})
  }

  return (
    <div>
      <MUI.GridList
        cols={4}
        cellHeight={'auto'}
        style={style}>
        <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
          <div>
            <div>
              {props.t('training:newTraining.NeurobicsSteps.comingSoon')}
            </div>
            <img
              src={'img/neurobics.png'}
              style={style.img} />
          </div>
        </MUI.GridTile>
      </MUI.GridList>
    </div>
  );
}

NeurobicsStep.propTypes = {
  t: PropTypes.func.isRequired,
  style: PropTypes.object,
  events: PropTypes.array,
  targets: PropTypes.array,
  seasons: PropTypes.array,
  distance: PropTypes.string,
  date: PropTypes.object,
  eventId: PropTypes.number,
  targetId: PropTypes.number,
  seasonId: PropTypes.number,
  changeSeason: PropTypes.func,
  changeTarget: PropTypes.func,
  changeEvent: PropTypes.func,
  changeDistance: PropTypes.func,
  changeDate: PropTypes.func,
};
