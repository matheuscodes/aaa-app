import React from 'react';
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import {KeyboardDatePicker} from '@material-ui/pickers';

import BaseStepStyle from 'app/trainings/BaseStep/BaseStep.style';

const styles = {}

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
  const { t, key, seasons, changeSeason, seasonId } = props;
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
              <KeyboardDatePicker fullWidth autoOk
                margin="normal"
                id={'newAssessmentDate'}
                label={t('training:newTraining.dateDatepicker.label')}
                format="dd.MM.yyyy"
                value={props.date}
                onChange={props.changeDate.bind(this)} />
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
export default withTranslation('training')(withStyles(styles)(BaseStep));
