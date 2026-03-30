vi.mock('api', () => ({
  default: {
    isAuthError: vi.fn(() => false),
    overview: { get: vi.fn() },
    reports: {
      getYearOverview: vi.fn(),
      getLastWeeksOverview: vi.fn(),
      getRingsOverview: vi.fn(),
      getAssessmentsOverview: vi.fn(),
    },
    assessments: { getList: vi.fn() },
    seasons: { getActive: vi.fn() },
    },
}));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn(() => ({ id: 1, name: 'Test' })) }));

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import HomePage from 'app/homescreen/HomePage';

describe('HomePage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});
