import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';
import valueConverter from 'global/ValueConverter';

export default function ArrowRingRow(props) {
  const style = (props.style || {});
  style.minHeight = props.arrowSize * (props.rows ? props.rows : 1);

  return (
    <div style={style}>
      {
        props.arrows.map((arrow, arrowIndex) => (
          <MUI.Avatar
            key={`aaa-newAssessmentEndNewArrow_${arrowIndex}`}
            color={valueConverter.color[arrow]}
            backgroundColor={valueConverter.backgroundColor[arrow]}
            size={props.arrowSize} >{ arrow }</MUI.Avatar>
        ))
      }
    </div>
  );
}

ArrowRingRow.propTypes = {
  style: PropTypes.object,
  arrowSize: PropTypes.number,
  rows: PropTypes.number,
  arrows: PropTypes.array,
};
