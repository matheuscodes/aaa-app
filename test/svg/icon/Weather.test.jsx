import React from 'react';
import { render } from '@testing-library/react';

import WeatherIcons from 'svg/icon/Weather';

describe('Weather icons', () => {
  it('exports an object with weather icons', () => {
    expect(typeof WeatherIcons).toBe('object');
  });

  it('has Fair icon component', () => {
    expect(typeof WeatherIcons.Fair).toBe('function');
    const { container } = render(<WeatherIcons.Fair width={50} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('has BarelyCloudy icon component', () => {
    expect(typeof WeatherIcons.BarelyCloudy).toBe('function');
  });

  it('has Rainy icon component', () => {
    expect(typeof WeatherIcons.Rainy).toBe('function');
    const { container } = render(<WeatherIcons.Rainy width={50} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('has all 8 weather types', () => {
    const expectedKeys = ['Fair', 'BarelyCloudy', 'PartlyCloudy', 'MostlyCloudy', 'LightShower', 'HeavyShower', 'Overcast', 'Rainy'];
    expectedKeys.forEach((key) => {
      expect(WeatherIcons[key]).toBeDefined();
    });
  });
});
