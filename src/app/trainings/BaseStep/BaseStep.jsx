import React from 'react';

import BaseStepStyle from 'app/trainings/BaseStep/BaseStep.style';

export default function BaseStep(props) {
  const style = new BaseStepStyle(props.style.styleProvider);

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
          <SelectField
            style={style}
            id={'newAssessmentSeason'}
            value={props.seasonId}
            onChange={props.changeSeason}
            items={props.seasons}
            floatingLabelText={
              props.t('training:newTraining.seasonSelectField.label')
            } />
        </MUI.GridTile>
        <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
          <MUI.DatePicker
            id={'newAssessmentDate'}
            floatingLabelText={
              props.t('training:newTraining.dateDatepicker.label')
            }
            autoOk={true}
            value={props.date}
            onChange={props.changeDate} />
        </MUI.GridTile>
        <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
          <MUI.Checkbox
            onCheck={setArrows}
            defaultChecked={props.classes.arrows}
            label={
              props.t('training:newTraining.baseStep.classes.arrows')
            } />
          <MUI.Checkbox
            onCheck={setWorkouts}
            defaultChecked={props.classes.workouts}
            label={
              props.t('training:newTraining.baseStep.classes.workouts')
            } />
          <MUI.Checkbox
            onCheck={setNeurobics}
            defaultChecked={props.classes.neurobics}
            label={
              props.t('training:newTraining.baseStep.classes.neurobics')
            } />
        </MUI.GridTile>
      </MUI.GridList>
    </div>
  );
}

BaseStep.propTypes = {
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
