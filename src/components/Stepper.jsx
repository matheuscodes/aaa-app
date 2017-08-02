import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

function StepperStep(props, stepData, index){
  return (
    <MUI.Step key={`aaa-step_${index}`}>
      <MUI.StepLabel >
        { stepData.title }
      </MUI.StepLabel>
      <MUI.StepContent>
        {stepData.content}
      </MUI.StepContent>
    </MUI.Step>
  )
}

function Stepper(props) {
  return (
    <MUI.Stepper
      style={props.style.Stepper}
      activeStep={props.stepIndex} orientation="vertical">

      { props.steps.map((step, index) => StepperStep(props, step, index)) }

    </MUI.Stepper>
  );
}

Stepper.propTypes = {
  style: PropTypes.shape({
    textFieldStyle: PropTypes.object,
  }).isRequired,
};

export default Stepper;
