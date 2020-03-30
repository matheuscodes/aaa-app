import React from 'react';

import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import valueConverter from 'global/ValueConverter';

export default function ArrowRingRow(props) {

  return (
    <Grid container spacing={1}>
      {
        props.arrows.map((arrow, arrowIndex) => (
          <Grid item xs={2}>
            <Avatar
              key={`aaa-newAssessmentEndNewArrow_${arrowIndex}`}
              style={{
                backgroundColor:valueConverter.backgroundColor[arrow],
                color:valueConverter.color[arrow],
              }}
              size={(props.arrowSize || '16pt')} >{ arrow }</Avatar>
          </Grid>
        ))
      }
    </Grid>
  );
}
