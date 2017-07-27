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

        <MUI.Step>
          <MUI.StepLabel>Create an ad group</MUI.StepLabel>
          <MUI.StepContent>
            <p>An ad group contains one or more ads which target a shared set of keywords.</p>
          </MUI.StepContent>
        </MUI.Step>

        <MUI.Step>
          <MUI.StepLabel>Create an ad</MUI.StepLabel>
          <MUI.StepContent>
            <p>
              Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.
            </p>
          </MUI.StepContent>
        </MUI.Step>
      </MUI.Stepper>
      {
        props.finished && (
          <p style={{margin: '20px 0', textAlign: 'center'}}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }} >
              Click here
            </a> to reset the example.
          </p>
        )
      }
    </div>
  );
}

Stepper.propTypes = {
  style: PropTypes.shape({
    textFieldStyle: PropTypes.object,
  }).isRequired,
};

export default Stepper;
