import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

function StepperStep(props, stepData){
  return (
    <MUI.Step>
      <MUI.StepLabel
        iconContainerStyle={props.style.stepLabel.iconContainerStyle}
        style={props.style.stepLabel} >
        <p style={props.style.stepLabel.p}>{ stepData.title }</p>
      </MUI.StepLabel>
      <MUI.StepContent>
        {stepData.content}
      </MUI.StepContent>
    </MUI.Step>
  )
}

function Stepper(props) {
  return (
    <div style={props.style.contentDivStyle}>
      <MUI.Stepper activeStep={props.stepIndex} orientation="vertical">

        { props.steps.map(step => StepperStep(props, step)) }
        
      </MUI.Stepper>
    </div>
  );
}

Stepper.propTypes = {
  style: PropTypes.shape({
    textFieldStyle: PropTypes.object,
  }).isRequired,
};

export default Stepper;
