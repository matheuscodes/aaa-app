import React from 'react';

import WorkoutStepStyle from 'app/trainings/WorkoutSteps/WorkoutStep.style';

export default function WorkoutStep(props) {
  const style = new WorkoutStepStyle(props.style.styleProvider);

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
              {props.t('training:newTraining.WorkoutSteps.comingSoon')}
            </div>
            <img
              src={'img/workout.png'}
              style={style.img} />
          </div>
        </MUI.GridTile>
      </MUI.GridList>
    </div>
  );
}

WorkoutStep.propTypes = {
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
