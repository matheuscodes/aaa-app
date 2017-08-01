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
          if(typeof primaryText === 'string'){
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
  onChange: MUI.SelectField.propTypes.onChange,
};

export default SelectField;
