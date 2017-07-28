import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

import TextField from 'components/TextField';
import DatePicker from 'components/DatePicker';
import SelectField from 'components/SelectField';

export default function BaseStep(props){
  return (
      <div>
        <MUI.GridList
          cols={4}
          padding={10}
          cellHeight={props.style.cellHeight}
          style={props.style}>
          <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
            <SelectField
              style={props.style}
              id={'newAssessmentSeason'}
              value={props.seasonId}
              onChange={props.changeSeason}
              items={props.seasons}
              floatingLabelText={
                props.t('assessment:newAssessment.seasonSelectField.label')
              } />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
            <DatePicker
              style={props.style}
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
              style={props.style}
              id={'newAssessmentDistance'}
              hintText={props.t('assessment:newAssessment.distanceTextField.hint')}
              floatingLabelText={
                props.t('assessment:newAssessment.distanceTextField.label')
              }
              type={'number'}
              defaultValue={props.distance}
              onChange={props.changeDistance} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
            <SelectField
              style={props.style}
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
              style={props.style}
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
}
