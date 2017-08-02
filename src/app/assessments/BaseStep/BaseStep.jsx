import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

import TextField from 'components/TextField';
import SelectField from 'components/SelectField';

import BaseStepStyle from 'app/assessments/BaseStep/BaseStep.style';

export default function BaseStep(props) {
  const style = new BaseStepStyle(props.style.styleProvider);

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
                props.t('assessment:newAssessment.seasonSelectField.label')
              } />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
            <MUI.DatePicker
              id={'newAssessmentDate'}
              floatingLabelText={
                props.t('assessment:newAssessment.dateDatepicker.label')
              }
              autoOk={true}
              value={props.date}
              onChange={props.changeDate} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
            <TextField
              style={style}
              id={'newAssessmentDistance'}
              hintText={
                props.t('assessment:newAssessment.distanceTextField.hint')
              }
              floatingLabelText={
                props.t('assessment:newAssessment.distanceTextField.label')
              }
              type={'number'}
              defaultValue={props.distance}
              onChange={props.changeDistance} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
            <SelectField
              style={style}
              id={'newAssessmentTarget'}
              value={props.targetId}
              onChange={props.changeTarget}
              items={props.targets}
              floatingLabelText={
                props.t('assessment:newAssessment.targetSelectField.label')
              } />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
            <SelectField
              style={style}
              id={'newAssessmentEvent'}
              value={props.eventId}
              onChange={props.changeEvent}
              items={props.events}
              floatingLabelText={
                props.t('assessment:newAssessment.eventSelectField.label')
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
  distance: PropTypes.number,
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
