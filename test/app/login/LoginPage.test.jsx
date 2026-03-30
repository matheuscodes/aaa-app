vi.mock('api/helpers/DownloadFile', () => ({ default: vi.fn() }));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn() }));
vi.mock('api', () => ({
  default: {
    login: vi.fn(),
    reset: vi.fn(),
    confirm: vi.fn(),
    newLogin: vi.fn(),
    replaceLogin: vi.fn(),
    isAuthError: vi.fn(),
    seasons: { getList: vi.fn() },
    assessments: { getList: vi.fn() },
    trainings: { getList: vi.fn() },
    reports: { getYearOverview: vi.fn(), getLastWeeksOverview: vi.fn(), getRingsOverview: vi.fn(), getAssessmentsOverview: vi.fn() },
    events: { getList: vi.fn(), getPublicEvents: vi.fn() },
    overview: { get: vi.fn() },
    equipment: { getList: vi.fn() },
    trainers: { getAllTrainers: vi.fn(), archers: { list: vi.fn() }, seasons: { list: vi.fn() } },
    },
}));

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import LoginPage from 'app/login/LoginPage';

describe('LoginPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<MemoryRouter><LoginPage messenger={{showMessage: vi.fn()}} /></MemoryRouter>);
    expect(container).toBeTruthy();
  });

  it('renders the logo', () => {
    const { container } = render(<MemoryRouter><LoginPage messenger={{showMessage: vi.fn()}} /></MemoryRouter>);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
