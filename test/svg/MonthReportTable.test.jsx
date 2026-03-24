import React from 'react';
import { render } from '@testing-library/react';

import MonthReportTable from 'svg/MonthReportTable';

describe('MonthReportTable', () => {
  const data = {
    firstDay: new Date('2023-01-01'),
    lastDay: new Date('2023-01-31'),
    month: 0,
    year: 2023,
    weeks: [],
    season: { goals: [] },
    warmUps: {},
    warmOuts: {},
    distanceTrainings: {},
    roundRings: {},
    techniqueCounts: {},
    totalCounts: {},
  };

  const allDays = { count: 31, days: [] };

  it('renders without crashing', () => {
    const { container } = render(<MonthReportTable data={data} allDays={allDays} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
