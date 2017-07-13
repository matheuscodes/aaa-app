import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

export default function TargetsMenu(props){
  return (
    <MUI.SelectField
      style={props.style}
      id={'aaa-newAssessmentTarget'}
      value={props.targetId}
      onChange={props.changeTarget}
      floatingLabelText={
        props.t('assessment:newAssessment.targetSelectField.label')
      } >
      {
        props.targets.map(function(target, index) {
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

TargetsMenu.propTypes = {
  t: PropTypes.func.isRequired,
  targets: PropTypes.object.isRequired,
  style: PropTypes.object,
}
