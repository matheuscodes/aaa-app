jest.mock('api', () => ({
  isAuthError: jest.fn(() => false),
  overview: { get: jest.fn() },
  reports: {
    getYearOverview: jest.fn(),
    getLastWeeksOverview: jest.fn(),
    getRingsOverview: jest.fn(),
    getAssessmentsOverview: jest.fn(),
  },
  assessments: { getList: jest.fn() },
  seasons: { getActive: jest.fn() },
}));
jest.mock('api/helpers/getLocalArcher', () => jest.fn(() => ({ id: 1, name: 'Test' })));

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import HomePage from 'app/homescreen/HomePage';

describe('HomePage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage messenger={{ showMessage: jest.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});
