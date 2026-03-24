jest.mock('api', () => ({
  isAuthError: jest.fn(() => false),
  reports: {
    getYearOverview: jest.fn(),
    getLastWeeksOverview: jest.fn(),
    getRingsOverview: jest.fn(),
    getAssessmentsOverview: jest.fn(),
  },
  seasons: { getList: jest.fn(), getById: jest.fn(), getMonthReport: jest.fn() },
}));
jest.mock('api/helpers/getLocalArcher', () => jest.fn(() => ({ id: 1, name: 'Test' })));

import React from 'react';
import { render } from '@testing-library/react';

import ReportsPage from 'app/reports/ReportsPage';

describe('ReportsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ReportsPage messenger={{ showMessage: jest.fn() }} />
    );
    expect(container).toBeTruthy();
  });
});
