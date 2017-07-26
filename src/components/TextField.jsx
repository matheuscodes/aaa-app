import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

function TextField(props) {
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
      defaultValue={props.defaultValue}
      type={props.type}
      id={props.id} />
  );
}

TextField.propTypes = {
  onChange: MUI.TextField.propTypes.onChange,
  hintText: MUI.TextField.propTypes.hintText,
  floatingLabelText: MUI.TextField.propTypes.floatingLabelText,
  type: MUI.TextField.propTypes.type,
  id: MUI.TextField.propTypes.id,
  style: PropTypes.shape({
    TextField: PropTypes.object,
    inputStyle: PropTypes.object,
    errorStyle: PropTypes.object,
    hintStyle: PropTypes.object,
    floatingLabelStyle: PropTypes.object,
    underlineStyle: PropTypes.object,
    floatingLabelShrinkStyle: PropTypes.object,
  }).isRequired,
};

export default TextField;
