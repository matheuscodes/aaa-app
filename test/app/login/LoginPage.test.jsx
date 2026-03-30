jest.mock('api/helpers/DownloadFile', () => jest.fn());
jest.mock('api/helpers/getLocalArcher', () => jest.fn());
jest.mock('api', () => ({
  login: jest.fn(),
  reset: jest.fn(),
  confirm: jest.fn(),
  newLogin: jest.fn(),
  replaceLogin: jest.fn(),
  isAuthError: jest.fn(),
  seasons: { getList: jest.fn() },
  assessments: { getList: jest.fn() },
  trainings: { getList: jest.fn() },
  reports: { getYearOverview: jest.fn(), getLastWeeksOverview: jest.fn(), getRingsOverview: jest.fn(), getAssessmentsOverview: jest.fn() },
  events: { getList: jest.fn(), getPublicEvents: jest.fn() },
  overview: { get: jest.fn() },
  equipment: { getList: jest.fn() },
  trainers: { getAllTrainers: jest.fn(), archers: { list: jest.fn() }, seasons: { list: jest.fn() } },
}));

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import LoginPage from 'app/login/LoginPage';

describe('LoginPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<MemoryRouter><LoginPage messenger={{showMessage: jest.fn()}} /></MemoryRouter>);
    expect(container).toBeTruthy();
  });

  it('renders the logo', () => {
    const { container } = render(<MemoryRouter><LoginPage messenger={{showMessage: jest.fn()}} /></MemoryRouter>);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
