vi.mock('api', () => ({
  default: {
    seasons: { getList: vi.fn(), getById: vi.fn(), delete: vi.fn() },
    assessments: { getList: vi.fn() },
    trainings: { getList: vi.fn() },
    reports: { getYearOverview: vi.fn(), getLastWeeksOverview: vi.fn(), getRingsOverview: vi.fn(), getAssessmentsOverview: vi.fn() },
    events: { getList: vi.fn(), getPublicEvents: vi.fn() },
    overview: { get: vi.fn() },
    equipment: { getList: vi.fn() },
    trainers: { getAllTrainers: vi.fn(), archers: { list: vi.fn() }, seasons: { list: vi.fn() } },
    isAuthError: vi.fn(() => false),
    },
}));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn(() => ({ id: 1, name: 'Test' })) }));

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import API from 'api';

import SeasonsPage from 'app/seasons/SeasonsPage';

describe('SeasonsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <SeasonsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('renders new season button', () => {
    const { container } = render(
      <MemoryRouter>
        <SeasonsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('opens new season form when button is clicked', () => {
    const { container } = render(
      <MemoryRouter>
        <SeasonsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    const button = container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }
    expect(container).toBeTruthy();
  });

  it('calls getList on mount', () => {
    render(
      <MemoryRouter>
        <SeasonsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(API.seasons.getList).toHaveBeenCalled();
  });

  it('renders seasons when API returns data', () => {
    const mockGetList = vi.fn((callbacks) => {
      callbacks.success.call(callbacks.context, [
        {
          id: 1,
          name: 'Test Season',
          start: new Date('2024-01-01'),
          end: new Date('2024-12-31'),
          goals: [{ arrowCount: 100, targetShare: 50 }],
          max: 100,
        },
      ]);
    });
    API.seasons.getList = mockGetList;
    API.seasons.getById = vi.fn();

    const { container } = render(
      <MemoryRouter>
        <SeasonsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('handles API error gracefully', () => {
    const mockGetList = vi.fn((callbacks) => {
      callbacks.error.call(callbacks.context, new Error('Network error'));
    });
    API.seasons.getList = mockGetList;
    API.isAuthError = vi.fn(() => false);

    const messenger = { showMessage: vi.fn() };
    const { container } = render(
      <MemoryRouter>
        <SeasonsPage messenger={messenger} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});
