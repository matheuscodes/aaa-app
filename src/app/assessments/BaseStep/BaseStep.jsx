import React from 'react';

import { withTranslation } from 'react-i18next'

import { withStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
              <DatePicker
                label={t('assessment:newAssessment.dateDatepicker.label')}
                format="dd.MM.yyyy"
                value={props.date}
                onChange={props.changeDate.bind(this)}
                slotProps={{ textField: { fullWidth: true, margin: 'normal', id: 'newAssessmentDate' } }}
              />
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
