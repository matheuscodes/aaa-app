import React from 'react';
import { render } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns as AdapterDateFnsV2 } from '@mui/x-date-pickers/AdapterDateFnsV2';

import BaseStep from 'app/assessments/BaseStep/BaseStep';
import WeatherStep from 'app/assessments/WeatherStep/WeatherStep';

const mockProps = {
  seasons: [{ id: 1, name: 'Season 2023' }],
  targets: [{ id: 'face', name: 'Face' }],
  events: [],
  seasonId: 1,
  changeSeason: jest.fn(),
  date: new Date(),
  changeDate: jest.fn(),
  distance: 18,
  changeDistance: jest.fn(),
  target: 'face',
  changeTarget: jest.fn(),
  event: '',
  changeEvent: jest.fn(),
};

const mockWeatherProps = {
  temperature: 20,
  changeTemperature: jest.fn(),
  weather: 'FAIR',
  changeWeather: jest.fn(),
  windSpeed: 5,
  changeWindSpeed: jest.fn(),
  windDirection: 'N',
  changeWindDirection: jest.fn(),
  shootDirection: 'S',
  changeShootDirection: jest.fn(),
};

describe('BaseStep', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <LocalizationProvider dateAdapter={AdapterDateFnsV2}>
        <div>
          <BaseStep {...mockProps} />
        </div>
      </LocalizationProvider>
    );
    expect(container).toBeTruthy();
  });
});

describe('WeatherStep', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <div>
        <WeatherStep {...mockWeatherProps} />
      </div>
    );
    expect(container).toBeTruthy();
  });
});
