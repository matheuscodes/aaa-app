import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

function SelectField(props) {
  return (
    <MUI.SelectField
      style={props.style.SelectField}
      hintText={props.hintText}
      floatingLabelFixed={props.floatingLabelFixed}
      floatingLabelText={props.floatingLabelText}
      disabled={props.disabled}
      value={props.value}
      onChange={props.onChange}
      multiple={props.multiple}
      maxHeight={props.maxHeight}
      selectionRenderer={props.selectionRenderer}
      autoWidth={props.autoWidth}
      id={props.id} >
      {
        props.items.map(function(item, index) {
          let primaryText = item.name;
          if (typeof primaryText === 'string') {
            primaryText = (
              <p style={props.style.SelectField.p}>
                {primaryText}
              </p>
            );
          }
          let label = (item.label || item.name);
          return (
            <MUI.MenuItem
              style={props.style.SelectField.MenuItem}
              innerDivStyle={props.style.SelectField.MenuItem.innerDivStyle}
              key={`aaa-selectFieldItem_${props.id}_${index}`}
              value={item.id}
              label={label}
              primaryText={primaryText} />
          );
        })
      }
    </MUI.SelectField>
  );
}

SelectField.propTypes = {
  items: PropTypes.array,
  style: PropTypes.object,
  hintText: MUI.SelectField.propTypes.hintText,
  floatingLabelFixed: MUI.SelectField.propTypes.floatingLabelFixed,
  floatingLabelText: MUI.SelectField.propTypes.floatingLabelText,
  disabled: MUI.SelectField.propTypes.disabled,
  value: MUI.SelectField.propTypes.value,
  onChange: MUI.SelectField.propTypes.onChange,
  multiple: MUI.SelectField.propTypes.multiple,
  maxHeight: MUI.SelectField.propTypes.maxHeight,
  selectionRenderer: MUI.SelectField.propTypes.selectionRenderer,
  autoWidth: MUI.SelectField.propTypes.autoWidth,
  id: MUI.SelectField.propTypes.id,
};

export default SelectField;
