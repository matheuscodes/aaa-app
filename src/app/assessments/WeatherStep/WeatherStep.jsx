import React from 'react';

import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import TextField from '@material-ui/core/TextField';

import Thermometer from 'svg/icon/Thermometer';
import Windmills from 'svg/icon/Windmills';
import ArcherAnchored from 'svg/icon/ArcherAnchored';

import DirectionSelector from 'app/common/DirectionSelector';
import WeatherSelector from 'app/common/WeatherSelector';

const styles = {}

function WeatherStep(props) {
  const { t } = props;
  return (
    <Step {...props}>
      <StepLabel>
        {t('assessment:newAssessment.weatherStep.title')}
      </StepLabel>
      <StepContent>
        <Grid container spacing={2}>
          <Grid item xs={2} >
            <Thermometer height={'32pt'}/>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth
              id={'aaa-newAssessmentTemperature'}
              hintText={t('assessment:newAssessment.temperatureTextField.hint')}
              label={t('assessment:newAssessment.temperatureTextField.label')}
              defaultValue={props.temperature}
              onChange={props.changeTemperature} />
          </Grid>
          <Grid item xs={4}>
            <WeatherSelector
              value={props.weather}
              onChange={props.changeWeather}
              text={t('assessment:newAssessment.weatherSelector.hint')} />
          </Grid>
          <Grid item xs={2}>
            <Windmills width={'32pt'} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth
              id={'aaa-newAssessmentWindSpeed'}
              hintText={t('assessment:newAssessment.windTextField.hint')}
              label={t('assessment:newAssessment.windTextField.label')}
              defaultValue={props.windSpeed}
              onChange={props.changeWindSpeed} />
          </Grid>
          <Grid item xs={4}>
            <DirectionSelector
              type={'WindDirection'}
              value={props.windDirection}
              onChange={props.changeWindDirection}
              text={t('assessment:newAssessment.windDirectionSelector.hint')} />
          </Grid>
          <Grid item xs={2}>
            <ArcherAnchored width={'32pt'} />
          </Grid>
          <Grid item xs={6}>
            <DirectionSelector
              type={'ShootDirection'}
              value={props.shootDirection}
              onChange={props.changeShootDirection}
              text={t('assessment:newAssessment.shootDirectionSelector.hint')} />
          </Grid>
        </Grid>
      </StepContent>
    </Step>
  );
}

export default withTranslation('assessment')(withStyles(styles)(WeatherStep));
