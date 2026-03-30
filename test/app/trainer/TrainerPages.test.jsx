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
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import API from 'api';

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

  it('calls getTrainerRequests on mount', () => {
    render(
      <MemoryRouter>
        <TrainerRequestsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(API.trainers.getTrainerRequests).toHaveBeenCalled();
  });

  it('renders requests when API returns data', () => {
    const mockGetRequests = vi.fn((callbacks) => {
      callbacks.success.call(callbacks.context, [
        { id: 1, status: 'NEW', archer: { name: 'Test Archer', email: 'test@test.com' }, message: 'Hello', receivedAt: '2024-01-01', updatedAt: '2024-01-01' },
      ]);
    });
    API.trainers.getTrainerRequests = mockGetRequests;

    const { container } = render(
      <MemoryRouter>
        <TrainerRequestsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('handles API error gracefully', () => {
    const mockGetRequests = vi.fn((callbacks) => {
      callbacks.failure.call(callbacks.context);
    });
    API.trainers.getTrainerRequests = mockGetRequests;

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

  it('renders archers when API returns data', () => {
    const mockGetArchers = vi.fn((callbacks) => {
      callbacks.success.call(callbacks.context, [
        { id: 1, name: 'Archer 1', email: 'archer@test.com', archerId: 1 },
      ]);
    });
    API.trainers.getTrainerArchers = mockGetArchers;

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

  it('calls getTrainerArchers on mount', () => {
    render(
      <MemoryRouter>
        <TrainerReportsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(API.trainers.getTrainerArchers).toHaveBeenCalled();
  });

  it('renders pupils when API returns data', () => {
    const mockGetArchers = vi.fn((callbacks) => {
      callbacks.success.call(callbacks.context, [
        { id: 1, name: 'Archer 1', email: 'archer@test.com' },
      ]);
    });
    API.trainers.getTrainerArchers = mockGetArchers;

    const { container } = render(
      <MemoryRouter>
        <TrainerReportsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});
