jest.mock('api', () => ({
  seasons: { getList: jest.fn(), getById: jest.fn(), delete: jest.fn() },
  assessments: { getList: jest.fn() },
  trainings: { getList: jest.fn() },
  reports: { getYearOverview: jest.fn(), getLastWeeksOverview: jest.fn(), getRingsOverview: jest.fn(), getAssessmentsOverview: jest.fn() },
  events: { getList: jest.fn(), getPublicEvents: jest.fn() },
  overview: { get: jest.fn() },
  equipment: { getList: jest.fn() },
  trainers: { getAllTrainers: jest.fn(), archers: { list: jest.fn() }, seasons: { list: jest.fn() } },
  isAuthError: jest.fn(() => false),
}));
jest.mock('api/helpers/getLocalArcher', () => jest.fn(() => ({ id: 1, name: 'Test' })));

import React from 'react';
import { render } from '@testing-library/react';

import SeasonsPage from 'app/seasons/SeasonsPage';

describe('SeasonsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <SeasonsPage messenger={{ showMessage: jest.fn() }} />
    );
    expect(container).toBeTruthy();
  });
});
