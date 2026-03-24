jest.mock('api/helpers/DownloadFile', () => jest.fn());
jest.mock('api/helpers/getLocalArcher', () => jest.fn());
jest.mock('api', () => ({
  login: jest.fn(),
  reset: jest.fn(),
}));

import React from 'react';
import { render } from '@testing-library/react';

import LoginCard from 'app/login/LoginCard';

describe('LoginCard', () => {
  it('renders without crashing', () => {
    const { container } = render(<LoginCard messenger={{showMessage: jest.fn()}} />);
    expect(container).toBeTruthy();
  });

  it('renders email and password fields', () => {
    const { container } = render(<LoginCard messenger={{showMessage: jest.fn()}} />);
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });
});
