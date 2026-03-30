vi.mock('api', () => ({
  default: {
    login: vi.fn(),
    reset: vi.fn(),
    confirm: vi.fn(),
    newLogin: vi.fn(),
    replaceLogin: vi.fn(),
    },
}));

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ForgottenPage from 'app/login/ForgottenPage';
import NewLoginPage from 'app/login/NewLoginPage';
import ConfirmLoginPage from 'app/login/ConfirmLoginPage';

describe('ForgottenPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<MemoryRouter><ForgottenPage messenger={{showMessage: vi.fn()}} /></MemoryRouter>);
    expect(container).toBeTruthy();
  });
});

describe('NewLoginPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<MemoryRouter><NewLoginPage messenger={{showMessage: vi.fn()}} /></MemoryRouter>);
    expect(container).toBeTruthy();
  });
});

describe('ConfirmLoginPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<MemoryRouter><ConfirmLoginPage messenger={{showMessage: vi.fn()}} /></MemoryRouter>);
    expect(container).toBeTruthy();
  });
});
