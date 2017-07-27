import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

function DatePicker(props) {
  return (
    <div>
      <MUI.DatePicker
        style={props.style.DatePicker}
        textFieldStyle={props.style.DatePicker.textFieldStyle}
        dialogContainerStyle={props.style.DatePicker.dialogContainerStyle}
        id={props.id}
        floatingLabelText={props.floatingLabelText}
        autoOk={props.autoOk}
        value={props.value}
        onChange={props.onChange} />
    </div>

  );
}

DatePicker.propTypes = {
  onChange: MUI.DatePicker.propTypes.onChange,
  floatingLabelText: MUI.DatePicker.propTypes.floatingLabelText,
  autoOk: MUI.DatePicker.propTypes.autoOk,
  id: MUI.TextField.propTypes.id,
  style: PropTypes.shape({
    textFieldStyle: PropTypes.object,
  }).isRequired,
};

export default DatePicker;
