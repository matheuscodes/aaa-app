import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

import TextField from 'components/TextField';

function SelectField(props) {
  return (
    <TextField
      style={props.style.SelectField}
      hintText={(!props.hintText && !props.floatingLabelText) ? ' ' : props.hintText}
      floatingLabelText={props.floatingLabelText}
      disabled={props.disabled}
      id={props.id} >
      <MUI.DropDownMenu
          disabled={props.disabled}
          style={props.style.SelectField.DropDownMenu.dropDownMenu}
          labelStyle={props.style.SelectField.DropDownMenu.label}
          iconStyle={props.style.SelectField.DropDownMenu.icon}
          underlineStyle={props.style.SelectField.DropDownMenu.hideDropDownUnderline}
          menuItemStyle={props.style.SelectField.DropDownMenu.menuItemStyle}
          autoWidth={false}
          value={props.value}
          onChange={props.onChange}
          maxHeight={props.maxHeight}
          multiple={props.multiple}
          selectionRenderer={props.selectionRenderer} >
          {
            props.items.map(function(item, index) {
              return (
                <MUI.MenuItem
                  key={`aaa-selectFieldItem_${props.id}_${index}`}
                  value={item.id}
                  primaryText={item.name} />
              );
            })
          }
        </MUI.DropDownMenu>
    </TextField>
  );
}

SelectField.propTypes = {
  onChange: MUI.SelectField.propTypes.onChange,
};

export default SelectField;
