jest.mock('api/helpers/DownloadFile', () => jest.fn());
jest.mock('api/helpers/getLocalArcher', () => jest.fn());
jest.mock('api', () => ({
  login: jest.fn(),
  reset: jest.fn(),
}));

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import LoginCard from 'app/login/LoginCard';

describe('LoginCard', () => {
  it('renders without crashing', () => {
    const { container } = render(<MemoryRouter><LoginCard messenger={{showMessage: jest.fn()}} /></MemoryRouter>);
    expect(container).toBeTruthy();
  });

  it('renders email and password fields', () => {
    const { container } = render(<MemoryRouter><LoginCard messenger={{showMessage: jest.fn()}} /></MemoryRouter>);
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });
});
