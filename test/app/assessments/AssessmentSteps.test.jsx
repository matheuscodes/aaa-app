import React from 'react';
import { render } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import BaseStep from 'app/assessments/BaseStep/BaseStep';
import WeatherStep from 'app/assessments/WeatherStep/WeatherStep';

const mockProps = {
  seasons: [{ id: 1, name: 'Season 2023' }],
  targets: [{ id: 'face', name: 'Face' }],
  events: [],
  seasonId: 1,
  changeSeason: vi.fn(),
  date: new Date(),
  changeDate: vi.fn(),
  distance: 18,
  changeDistance: vi.fn(),
  target: 'face',
  changeTarget: vi.fn(),
  event: '',
  changeEvent: vi.fn(),
};

const mockWeatherProps = {
  temperature: 20,
  changeTemperature: vi.fn(),
  weather: 'FAIR',
  changeWeather: vi.fn(),
  windSpeed: 5,
  changeWindSpeed: vi.fn(),
  windDirection: 'N',
  changeWindDirection: vi.fn(),
  shootDirection: 'S',
  changeShootDirection: vi.fn(),
};

describe('BaseStep', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
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
