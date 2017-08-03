import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

import Thermometer from 'svg/icon/Thermometer';
import Windmills from 'svg/icon/Windmills';
import ArcherAnchored from 'svg/icon/ArcherAnchored';

import DirectionSelector from 'app/common/DirectionSelector';
import WeatherSelector from 'app/common/WeatherSelector';

import TextField from 'components/TextField';

import WeatherStepStyle from 'app/assessments/WeatherStep/WeatherStep.style';

export default function WeatherStep(props) {
  const style = new WeatherStepStyle(props.style.styleProvider);

  return (
      <div>
        <MUI.GridList
          cols={6}
          cellHeight={'auto'}
          style={style}>
          <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
            <Thermometer
              width={style.Thermometer.width}
              style={style.Thermometer} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={3} >
            <TextField
              style={style}
              type={'number'}
              id={'aaa-newAssessmentTemperature'}
              hintText={
                props.t('assessment:newAssessment.temperatureTextField.hint')
              }
              floatingLabelText={
                props.t('assessment:newAssessment.temperatureTextField.label')
              }
              defaultValue={props.temperature}
              onChange={props.changeTemperature} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
            <WeatherSelector
              style={style}
              value={props.weather}
              onChange={props.changeWeather}
              hintText={
                props.t('assessment:newAssessment.weatherSelector.hint')
              } />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
            <Windmills
              width={style.Windmills.width}
              style={style.Windmills} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={3} >
            <TextField
              style={style}
              type={'number'}
              id={'aaa-newAssessmentWindSpeed'}
              hintText={
                props.t('assessment:newAssessment.windTextField.hint')
              }
              floatingLabelText={
                props.t('assessment:newAssessment.windTextField.label')
              }
              defaultValue={props.windSpeed}
              onChange={props.changeWindSpeed} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
            <DirectionSelector
              style={style}
              type={'WindDirection'}
              value={props.windDirection}
              onChange={props.changeWindDirection}
              hintText={
                props.t('assessment:newAssessment.windDirectionSelector.hint')
              } />
          </MUI.GridTile>

          <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
            <ArcherAnchored
              width={style.ArcherAnchored.width}
              style={style.ArcherAnchored} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={3} >
            <DirectionSelector
              style={style}
              type={'ShootDirection'}
              value={props.shootDirection}
              onChange={props.changeShootDirection}
              hintText={
                props.t('assessment:newAssessment.shootDirectionSelector.hint')
              } />
          </MUI.GridTile>
        </MUI.GridList>
      </div>
  );
}

WeatherStep.propTypes = {
  t: PropTypes.func.isRequired,
  style: PropTypes.object,
  temperature: PropTypes.string,
  changeTemperature: PropTypes.func,
  weather: PropTypes.string,
  changeWeather: PropTypes.func,
  windSpeed: PropTypes.string,
  changeWindSpeed: PropTypes.func,
  windDirection: PropTypes.string,
  changeWindDirection: PropTypes.func,
  shootDirection: PropTypes.string,
  changeShootDirection: PropTypes.func,
};
