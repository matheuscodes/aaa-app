vi.mock('api', () => ({
  default: {
    isAuthError: vi.fn(() => false),
    reports: {
      getYearOverview: vi.fn(),
      getLastWeeksOverview: vi.fn(),
      getRingsOverview: vi.fn(),
      getAssessmentsOverview: vi.fn(),
    },
    seasons: { getList: vi.fn(), getById: vi.fn(), getMonthReport: vi.fn() },
    },
}));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn(() => ({ id: 1, name: 'Test' })) }));

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ReportsPage from 'app/reports/ReportsPage';

describe('ReportsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <ReportsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});
