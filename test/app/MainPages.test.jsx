vi.mock('api', () => ({
  default: {
    assessments: { getList: vi.fn(), getTargets: vi.fn() },
    trainings: { getList: vi.fn() },
    seasons: { getList: vi.fn() },
    isAuthError: vi.fn(() => false),
    },
}));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn(() => ({ id: 1, name: 'Test' })) }));

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AssessmentsPage from 'app/assessments/AssessmentsPage';
import TrainingsPage from 'app/trainings/TrainingsPage';

describe('AssessmentsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <AssessmentsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});

describe('TrainingsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <TrainingsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});
