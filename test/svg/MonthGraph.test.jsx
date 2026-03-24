import React from 'react';
import { render } from '@testing-library/react';

import MonthGraph from 'svg/MonthGraph';

describe('MonthGraph', () => {
  const data = {
    max: 100,
    overview: [
      { day: 1, value: 30, shots: 36, techniqueShots: 12 },
      { day: 2, value: 60, shots: 72, techniqueShots: 24 },
    ],
  };

  it('renders without crashing', () => {
    const { container } = render(<MonthGraph data={data} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
