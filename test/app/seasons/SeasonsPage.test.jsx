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
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

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
});
