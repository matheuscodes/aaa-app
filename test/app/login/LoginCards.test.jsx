jest.mock('api', () => ({
  login: jest.fn(),
  reset: jest.fn(),
  confirm: jest.fn(),
  newLogin: jest.fn(),
  replaceLogin: jest.fn(),
}));

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ForgottenCard from 'app/login/ForgottenCard';
import NewPasswordCard from 'app/login/NewPasswordCard';
import NewLoginCard from 'app/login/NewLoginCard';

describe('ForgottenCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <ForgottenCard messenger={{ showMessage: jest.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('renders email input', () => {
    const { container } = render(
      <MemoryRouter>
        <ForgottenCard messenger={{ showMessage: jest.fn() }} />
      </MemoryRouter>
    );
    expect(container.querySelector('input')).toBeTruthy();
  });
});

describe('NewPasswordCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <NewPasswordCard email="test@test.com" token="abc" messenger={{ showMessage: jest.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});

describe('NewLoginCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <NewLoginCard messenger={{ showMessage: jest.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('renders registration form inputs', () => {
    const { container } = render(
      <MemoryRouter>
        <NewLoginCard messenger={{ showMessage: jest.fn() }} />
      </MemoryRouter>
    );
    expect(container.querySelectorAll('input').length).toBeGreaterThan(0);
  });
});
