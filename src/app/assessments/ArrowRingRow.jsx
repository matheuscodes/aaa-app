import React from 'react';

import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import valueConverter from 'global/ValueConverter';

export default function ArrowRingRow(props) {
  const style = (props.style || {});
  style.minHeight = props.arrowSize * (props.rows ? props.rows : 1);

  return (
    <div style={style}>
      {
        props.arrows.map((arrow, arrowIndex) => (
          <Avatar
            key={`aaa-newAssessmentEndNewArrow_${arrowIndex}`}
            color={valueConverter.color[arrow]}
            backgroundColor={valueConverter.backgroundColor[arrow]}
            size={props.arrowSize} >{ arrow }</Avatar>
        ))
      }
    </div>
  );
}
