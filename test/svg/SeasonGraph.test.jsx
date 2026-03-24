import React from 'react';
import { render } from '@testing-library/react';

import SeasonGraph from 'svg/SeasonGraph';

describe('SeasonGraph', () => {
  const data = {
    start: '2023-01-02',
    end: '2023-03-26',
    goals: [
      { week: 1, arrowCount: 36, targetShare: 50 },
      { week: 2, arrowCount: 72, targetShare: 60 },
    ],
    events: [],
    max: 72,
  };

  it('renders without crashing', () => {
    const { container } = render(<SeasonGraph data={data} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders graph elements', () => {
    const { container } = render(<SeasonGraph data={data} />);
    expect(container.querySelector('g')).toBeTruthy();
  });
});
