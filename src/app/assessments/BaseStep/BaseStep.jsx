import React from 'react';

import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const styles = {}

function BaseStep(props) {

  return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Select
              id={'newAssessmentSeason'}
              value={props.seasonId}
              onChange={props.changeSeason}
              items={props.seasons}
              floatingLabelText={
                props.t('assessment:newAssessment.seasonSelectField.label')
              } />
          </Grid>
          <Grid item xs={6}>
            {/*<MUI.DatePicker
              id={'newAssessmentDate'}
              floatingLabelText={
                props.t('assessment:newAssessment.dateDatepicker.label')
              }
              autoOk={true}
              value={props.date}
              onChange={props.changeDate} />*/}
          </Grid>
          <Grid item xs={3}>
            <TextField
              id={'newAssessmentDistance'}
              hintText={
                props.t('assessment:newAssessment.distanceTextField.hint')
              }
              floatingLabelText={
                props.t('assessment:newAssessment.distanceTextField.label')
              }
              type={'number'}
              defaultValue={props.distance}
              onChange={props.changeDistance} />
          </Grid>
          <Grid item xs={6}>
            <Select
              id={'newAssessmentTarget'}
              value={props.targetId}
              onChange={props.changeTarget}
              items={props.targets}
              floatingLabelText={
                props.t('assessment:newAssessment.targetSelectField.label')
              } />
          </Grid>
          <Grid item xs={6}>
            <Select
              id={'newAssessmentEvent'}
              value={props.eventId}
              onChange={props.changeEvent}
              items={props.events}
              floatingLabelText={
                props.t('assessment:newAssessment.eventSelectField.label')
              } />
          </Grid>
        </Grid>
      </div>
  );
}

export default withTranslation('assessment')(withStyles(styles)(BaseStep));
