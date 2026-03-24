jest.mock('api', () => ({
  login: jest.fn(),
  reset: jest.fn(),
  confirm: jest.fn(),
  newLogin: jest.fn(),
  replaceLogin: jest.fn(),
}));

import React from 'react';
import { render } from '@testing-library/react';

import ForgottenPage from 'app/login/ForgottenPage';
import NewLoginPage from 'app/login/NewLoginPage';
import ConfirmLoginPage from 'app/login/ConfirmLoginPage';

describe('ForgottenPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<ForgottenPage messenger={{showMessage: jest.fn()}} />);
    expect(container).toBeTruthy();
  });
});

describe('NewLoginPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<NewLoginPage messenger={{showMessage: jest.fn()}} />);
    expect(container).toBeTruthy();
  });
});

describe('ConfirmLoginPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<ConfirmLoginPage messenger={{showMessage: jest.fn()}} />);
    expect(container).toBeTruthy();
  });
});
