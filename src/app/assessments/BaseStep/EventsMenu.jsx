import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

export default function EventsMenu(props){
  return (
    <MUI.SelectField
      style={{width: '100%'}}
      id={'aaa-newAssessmentEvent'}
      value={props.eventId}
      onChange={props.changeEvent}
      floatingLabelText={
        props.t('assessment:newAssessment.eventSelectField.label')
      } >
      {
        props.events.map(function(target, index) {
          return (
            <MUI.MenuItem
              key={'aaa-newAssessmentTarget_' + index}
              value={target.id}
              primaryText={target.name} />
          );
        })
      }
    </MUI.SelectField>
  );
}

EventsMenu.propTypes = {
  t: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
  style: PropTypes.object,
}
