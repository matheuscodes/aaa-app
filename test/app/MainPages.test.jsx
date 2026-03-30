jest.mock('api', () => ({
  assessments: { getList: jest.fn(), getTargets: jest.fn() },
  trainings: { getList: jest.fn() },
  seasons: { getList: jest.fn() },
  isAuthError: jest.fn(() => false),
}));
jest.mock('api/helpers/getLocalArcher', () => jest.fn(() => ({ id: 1, name: 'Test' })));

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AssessmentsPage from 'app/assessments/AssessmentsPage';
import TrainingsPage from 'app/trainings/TrainingsPage';

describe('AssessmentsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <AssessmentsPage messenger={{ showMessage: jest.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});

describe('TrainingsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <TrainingsPage messenger={{ showMessage: jest.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});
