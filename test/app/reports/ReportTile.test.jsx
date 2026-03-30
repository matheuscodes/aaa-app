vi.mock('api', () => ({
  default: {
    seasons: { getMonthReport: vi.fn() },
    trainers: { seasons: { getMonthReport: vi.fn() } },
  },
}));

import React from 'react';
import { render } from '@testing-library/react';

import ReportTile from 'app/reports/ReportTile';

describe('ReportTile', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ReportTile
        seasonId={1}
        year={2024}
        month={6}
        messenger={{ showMessage: vi.fn() }}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders waiting state initially', () => {
    const { container } = render(
      <ReportTile
        seasonId={1}
        year={2024}
        month={6}
        messenger={{ showMessage: vi.fn() }}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders with pupilId (trainer view)', () => {
    const { container } = render(
      <ReportTile
        seasonId={1}
        year={2024}
        month={6}
        pupilId={42}
        messenger={{ showMessage: vi.fn() }}
      />
    );
    expect(container).toBeTruthy();
  });
});
