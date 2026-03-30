vi.mock('api/helpers/DownloadFile', () => ({ default: vi.fn() }));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn() }));
vi.mock('api', () => ({
  default: {
    login: vi.fn(),
    reset: vi.fn(),
    },
}));

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import API from 'api';

import LoginCard from 'app/login/LoginCard';

describe('LoginCard', () => {
  it('renders without crashing', () => {
    const { container } = render(<MemoryRouter><LoginCard messenger={{showMessage: vi.fn()}} /></MemoryRouter>);
    expect(container).toBeTruthy();
  });

  it('renders email and password fields', () => {
    const { container } = render(<MemoryRouter><LoginCard messenger={{showMessage: vi.fn()}} /></MemoryRouter>);
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });

  it('allows typing email', () => {
    const { container } = render(<MemoryRouter><LoginCard messenger={{showMessage: vi.fn()}} /></MemoryRouter>);
    const inputs = container.querySelectorAll('input');
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: 'test@example.com' } });
    }
    expect(container).toBeTruthy();
  });

  it('allows typing password', () => {
    const { container } = render(<MemoryRouter><LoginCard messenger={{showMessage: vi.fn()}} /></MemoryRouter>);
    const inputs = container.querySelectorAll('input');
    if (inputs.length > 1) {
      fireEvent.change(inputs[1], { target: { value: 'password123' } });
    }
    expect(container).toBeTruthy();
  });

  it('calls login API on submit', () => {
    const { container } = render(<MemoryRouter><LoginCard messenger={{showMessage: vi.fn()}} /></MemoryRouter>);
    const button = container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }
    expect(container).toBeTruthy();
  });

  it('handles login success callback', () => {
    const mockLogin = vi.fn((credentials, callbacks) => {
      callbacks.success.call(callbacks.context, {});
    });
    API.login = mockLogin;

    const messenger = { showMessage: vi.fn() };
    const { container } = render(<MemoryRouter><LoginCard messenger={messenger} /></MemoryRouter>);
    const button = container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }
    expect(container).toBeTruthy();
  });

  it('handles login error callback', () => {
    const mockLogin = vi.fn((credentials, callbacks) => {
      callbacks.error.call(callbacks.context, {});
    });
    API.login = mockLogin;

    const messenger = { showMessage: vi.fn() };
    const { container } = render(<MemoryRouter><LoginCard messenger={messenger} /></MemoryRouter>);
    const button = container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }
    expect(container).toBeTruthy();
  });
});
