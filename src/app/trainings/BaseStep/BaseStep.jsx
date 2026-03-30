import React from 'react';
import { withTranslation } from 'react-i18next'

import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function BaseStep(props) {

  function setArrows(event){
    props.setTrainingCategories({arrows:event.target.checked})
  }

  function setWorkouts(event){
    props.setTrainingCategories({workouts:event.target.checked})
  }

  function setNeurobics(event){
    props.setTrainingCategories({neurobics:event.target.checked})
  }
  const { t, seasons, changeSeason, seasonId } = props;
  return (
    <Step {...props}>
      <StepLabel>{t('training:newTraining.baseStep.title')}</StepLabel>
      <StepContent>
        <FormControl style={{minWidth: '100%'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel htmlFor="newAssessmentSeason">
                {t('training:newTraining.seasonSelectField.label')}
              </InputLabel>
              <Select fullWidth
                labelId="newAssessmentSeason"
                id="newAssessmentSeason"
                value={seasonId}
                onChange={changeSeason} >
                {seasons.map((season) => <MenuItem key={season.id} value={season.id}>{season.name}</MenuItem> )}
              </Select>
            </Grid>
            <Grid item xs={2} >
              <DatePicker
                label={t('training:newTraining.dateDatepicker.label')}
                format="dd.MM.yyyy"
                value={props.date}
                onChange={props.changeDate.bind(this)}
                slotProps={{ textField: { fullWidth: true, margin: 'normal', id: 'newAssessmentDate' } }}
              />
            </Grid>

            <Grid item xs={10} >
              <FormLabel component="legend">{t('training:newTraining.classes.label')}</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={props.categories.workouts} onChange={setWorkouts} />}
                  label={
                    props.t('training:newTraining.baseStep.classes.workouts')
                  }
                />
                <FormControlLabel
                  control={<Checkbox checked={props.categories.neurobics} onChange={setNeurobics} />}
                  label={
                    props.t('training:newTraining.baseStep.classes.neurobics')
                  }
                />
                <FormControlLabel
                  control={<Checkbox checked={props.categories.arrows} onChange={setArrows} />}
                  label={
                    props.t('training:newTraining.baseStep.classes.arrows')
                  }
                />
              </FormGroup>
            </Grid>
          </Grid>
        </FormControl>

      </StepContent>
    </Step>
  );
}
export default withTranslation('training')(BaseStep);
