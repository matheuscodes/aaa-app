import React from 'react';
import MUI from 'app/common/MaterialUI';

export default function TextField(props){
  return (
    <MUI.TextField
      style={props.style.TextField}
      inputStyle={props.style.TextField.inputStyle}
      errorStyle={props.style.TextField.errorStyle}
      hintStyle={props.style.TextField.hintStyle}
      floatingLabelStyle={props.style.TextField.floatingLabelStyle}
      underlineStyle={props.style.TextField.underlineStyle}
      floatingLabelShrinkStyle={props.style.TextField.floatingLabelShrinkStyle}
      onChange={props.onChange}
      hintText={props.hintText}
      floatingLabelText={props.floatingLabelText}
      type={props.type}
      id={props.id} />
  );
}
