import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

import Thermometer from 'svg/icon/Thermometer';
import Windmills from 'svg/icon/Windmills';
import ArcherAnchored from 'svg/icon/ArcherAnchored';

import DirectionSelector from 'app/common/DirectionSelector';
import WeatherSelector from 'app/common/WeatherSelector';

import TextField from 'components/TextField';
import DatePicker from 'components/DatePicker';
import SelectField from 'components/SelectField';

import WeatherStepStyle from 'app/assessments/WeatherStep/WeatherStep.style';

export default function WeatherStep(props){
  const style = new WeatherStepStyle(props.style.styleProvider);

  return (
      <div>
        <MUI.GridList
          cols={6}
          padding={10}
          cellHeight={'auto'}
          style={props.style}>
          <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
            <Thermometer
              height={32}
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
              hintText={props.t('assessment:newAssessment.weatherSelector.hint')} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
            <Windmills
              height={32}
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
              height={32}
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
}