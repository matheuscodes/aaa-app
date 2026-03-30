vi.mock('api', () => ({
  default: {
    isAuthError: vi.fn(() => false),
    trainers: {
      getAllTrainers: vi.fn(),
      getTrainerRequests: vi.fn(),
      getTrainerArchers: vi.fn(),
      postArcherToTrainer: vi.fn(),
      putArcherToTrainer: vi.fn(),
      putTrainerArcher: vi.fn(),
      deleteArcherToTrainer: vi.fn(),
      archers: { list: vi.fn() },
      seasons: { list: vi.fn(), getMonthReport: vi.fn() },
    },
    seasons: { getList: vi.fn(), getById: vi.fn(), getMonthReport: vi.fn() },
    reports: { getYearOverview: vi.fn(), getLastWeeksOverview: vi.fn(), getRingsOverview: vi.fn(), getAssessmentsOverview: vi.fn() },
    },
}));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn(() => ({ id: 1, name: 'Test', trainerId: 100 })) }));

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import TrainerRequestsPage from 'app/trainer/TrainerRequestsPage';
import TrainerArchersPage from 'app/trainer/TrainerArchersPage';
import TrainerReportsPage from 'app/trainer/TrainerReportsPage';

describe('TrainerRequestsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <TrainerRequestsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});

describe('TrainerArchersPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <TrainerArchersPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});

describe('TrainerReportsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <TrainerReportsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});
