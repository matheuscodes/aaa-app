import React from 'react';

import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import { KeyboardDatePicker } from '@material-ui/pickers';

const styles = {}

function BaseStep(props) {
  const { t } = props;
  return (
    <Step {...props}>
      <StepLabel>{t('assessment:newAssessment.baseStep.title')}</StepLabel>
      <StepContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="newAssessmentSeason">
                {t('assessment:newAssessment.seasonSelectField.label')}
              </InputLabel>
              <Select fullWidth
                labelId="newAssessmentSeason"
                id="newAssessmentSeason"
                value={props.seasonId}
                onChange={props.changeSeason} >
                {props.seasons.map((season,index) => <MenuItem key={index} value={season.id}>{season.name}</MenuItem> )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} >
            <FormControl fullWidth>
              <KeyboardDatePicker fullWidth autoOk
                margin="normal"
                id={'newAssessmentDate'}
                label={t('assessment:newAssessment.dateDatepicker.label')}
                format="dd.MM.yyyy"
                value={props.date}
                onChange={props.changeDate.bind(this)} />
            </FormControl>
          </Grid>
          <Grid item xs={6} >
            <FormControl fullWidth>
              <TextField fullWidth
                id={'newAssessmentDistance'}
                onChange={props.changeDistance}
                defaultValue={props.distance}
                hintText={t('assessment:newAssessment.distanceTextField.hint')}
                label={t('assessment:newAssessment.distanceTextField.label')} />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="newAssessmentTarget">
                {t('assessment:newAssessment.targetSelectField.label')}
              </InputLabel>
              <Select fullWidth
                labelId="newAssessmentTarget"
                id="newAssessmentTarget"
                value={props.targetId}
                onChange={props.changeTarget} >
                {props.targets.map((target,index) => <MenuItem key={index} value={target.id}>{target.name}</MenuItem> )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="newAssessmentEvent">
                {t('assessment:newAssessment.eventSelectField.label')}
              </InputLabel>
              <Select fullWidth
                labelId="newAssessmentEvent"
                id="newAssessmentEvent"
                value={props.eventId}
                onChange={props.changeEvent} >
                {props.events.map((event,index) => <MenuItem key={index} value={event.id}>{event.name}</MenuItem> )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </StepContent>
    </Step>
  );
}

export default withTranslation('assessment')(withStyles(styles)(BaseStep));
