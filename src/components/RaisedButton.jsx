import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

function RaisedButton(props) {
  return (
    <MUI.RaisedButton
      label={props.label}
      style={props.style.RaisedButton}
      overlayStyle={props.style.RaisedButton.overlayStyle}
      labelStyle={props.style.RaisedButton.labelStyle}
      buttonStyle={props.style.RaisedButton.buttonStyle}
      primary={props.primary}
      onTouchTap={props.onTouchTap} />
  );
}

export default RaisedButton;
