jest.mock('api', () => ({
  isAuthError: jest.fn(() => false),
  trainers: {
    getAllTrainers: jest.fn(),
    getTrainerRequests: jest.fn(),
    getTrainerArchers: jest.fn(),
    postArcherToTrainer: jest.fn(),
    putArcherToTrainer: jest.fn(),
    putTrainerArcher: jest.fn(),
    deleteArcherToTrainer: jest.fn(),
    archers: { list: jest.fn() },
    seasons: { list: jest.fn(), getMonthReport: jest.fn() },
  },
  seasons: { getList: jest.fn(), getById: jest.fn(), getMonthReport: jest.fn() },
  reports: { getYearOverview: jest.fn(), getLastWeeksOverview: jest.fn(), getRingsOverview: jest.fn(), getAssessmentsOverview: jest.fn() },
}));
jest.mock('api/helpers/getLocalArcher', () => jest.fn(() => ({ id: 1, name: 'Test', trainerId: 100 })));

import React from 'react';
import { render } from '@testing-library/react';

import TrainerRequestsPage from 'app/trainer/TrainerRequestsPage';
import TrainerArchersPage from 'app/trainer/TrainerArchersPage';
import TrainerReportsPage from 'app/trainer/TrainerReportsPage';

describe('TrainerRequestsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <TrainerRequestsPage messenger={{ showMessage: jest.fn() }} />
    );
    expect(container).toBeTruthy();
  });
});

describe('TrainerArchersPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <TrainerArchersPage messenger={{ showMessage: jest.fn() }} />
    );
    expect(container).toBeTruthy();
  });
});

describe('TrainerReportsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <TrainerReportsPage messenger={{ showMessage: jest.fn() }} />
    );
    expect(container).toBeTruthy();
  });
});
