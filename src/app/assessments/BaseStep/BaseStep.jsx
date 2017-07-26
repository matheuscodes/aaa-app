import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

import TextField from 'components/TextField';
import DatePicker from 'components/DatePicker';

import EventsMenu from 'app/assessments/BaseStep/EventsMenu';
import TargetsMenu from 'app/assessments/BaseStep/TargetsMenu';
import SeasonsMenu from 'app/assessments/BaseStep/SeasonsMenu';

export default function BaseStep(props){
  return (
      <div>
        <MUI.GridList
          cols={4}
          padding={10}
          cellHeight={props.style.cellHeight}
          style={props.style}>
          <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
            <SeasonsMenu
              t={props.t}
              style={props.style.SeasonsMenu}
              seasonId={props.seasonId}
              changeSeason={props.changeSeason}
              seasons={props.seasons} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
            <DatePicker
              style={props.style}
              id={'aaa-newAssessmentDate'}
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
              id={'aaa-newAssessmentDistance'}
              hintText={props.t('assessment:newAssessment.distanceTextField.hint')}
              floatingLabelText={
                props.t('assessment:newAssessment.distanceTextField.label')
              }
              defaultValue={props.distance}
              onChange={props.changeDistance} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
            <TargetsMenu
              t={props.t}
              style={props.style.TargetsMenu}
              targetId={props.targetId}
              changeTarget={props.changeTarget}
              targets={props.targets} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
            <EventsMenu
              t={props.t}
              style={props.style.EventsMenu}
              eventId={props.eventId}
              changeEvent={props.changeEvent}
              events={props.events} />
          </MUI.GridTile>
        </MUI.GridList>
      </div>
  );
}

BaseStep.propTypes = {
  t: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
  style: PropTypes.object,
}
