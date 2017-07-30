import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

function FloatingActionButton(props) {
  return (
    <MUI.FloatingActionButton
      mini={props.mini}
      secondary={props.secondary}
      style={props.style.FloatingActionButton}
      iconStyle={props.style.FloatingActionButton}
      onTouchTap={props.onClose} >
      {props.children}
    </MUI.FloatingActionButton>
  );
}

export default FloatingActionButton;
