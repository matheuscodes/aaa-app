import React from 'react';
import { render } from '@testing-library/react';

import WeatherSelector from 'app/common/WeatherSelector';

describe('WeatherSelector', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <WeatherSelector value="FAIR" text="Weather" onChange={vi.fn()} />
    );
    expect(container).toBeTruthy();
  });
});
