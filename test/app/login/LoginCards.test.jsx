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

import ForgottenCard from 'app/login/ForgottenCard';
import NewPasswordCard from 'app/login/NewPasswordCard';
import NewLoginCard from 'app/login/NewLoginCard';

describe('ForgottenCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <ForgottenCard messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('renders email input', () => {
    const { container } = render(
      <MemoryRouter>
        <ForgottenCard messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container.querySelector('input')).toBeTruthy();
  });
});

describe('NewPasswordCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <NewPasswordCard email="test@test.com" token="abc" messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});

describe('NewLoginCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <NewLoginCard messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('renders registration form inputs', () => {
    const { container } = render(
      <MemoryRouter>
        <NewLoginCard messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container.querySelectorAll('input').length).toBeGreaterThan(0);
  });
});
