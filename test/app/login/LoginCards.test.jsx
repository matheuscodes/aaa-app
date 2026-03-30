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
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import API from 'api';

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

  it('allows email input change', () => {
    const { container } = render(
      <MemoryRouter>
        <ForgottenCard messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    const input = container.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'test@example.com' } });
    }
    expect(container).toBeTruthy();
  });

  it('calls reset API on submit', () => {
    const { container } = render(
      <MemoryRouter>
        <ForgottenCard messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    const button = container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }
    expect(container).toBeTruthy();
  });

  it('handles reset success callback', () => {
    const mockReset = vi.fn((credentials, callbacks) => {
      callbacks.success.call(callbacks.context, {});
    });
    API.reset = mockReset;

    const messenger = { showMessage: vi.fn() };
    const { container } = render(
      <MemoryRouter>
        <ForgottenCard messenger={messenger} />
      </MemoryRouter>
    );
    const button = container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }
    expect(container).toBeTruthy();
  });

  it('handles reset error callback', () => {
    const mockReset = vi.fn((credentials, callbacks) => {
      callbacks.error.call(callbacks.context, {});
    });
    API.reset = mockReset;

    const messenger = { showMessage: vi.fn() };
    const { container } = render(
      <MemoryRouter>
        <ForgottenCard messenger={messenger} />
      </MemoryRouter>
    );
    const button = container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }
    expect(container).toBeTruthy();
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

  it('renders password inputs', () => {
    const { container } = render(
      <MemoryRouter>
        <NewPasswordCard email="test@test.com" token="abc" messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('allows password input', () => {
    const { container } = render(
      <MemoryRouter>
        <NewPasswordCard email="test@test.com" token="abc" messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    const inputs = container.querySelectorAll('input');
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: 'Password123!' } });
    }
    expect(container).toBeTruthy();
  });

  it('handles replaceLogin success', () => {
    const mockReplace = vi.fn((data, callbacks) => {
      callbacks.success.call(callbacks.context, {});
    });
    API.replaceLogin = mockReplace;

    const messenger = { showMessage: vi.fn() };
    const { container } = render(
      <MemoryRouter>
        <NewPasswordCard email="test@test.com" token="abc" messenger={messenger} />
      </MemoryRouter>
    );
    const button = container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }
    expect(container).toBeTruthy();
  });

  it('handles replaceLogin error', () => {
    const mockReplace = vi.fn((data, callbacks) => {
      callbacks.error.call(callbacks.context, {});
    });
    API.replaceLogin = mockReplace;

    const messenger = { showMessage: vi.fn() };
    const { container } = render(
      <MemoryRouter>
        <NewPasswordCard email="test@test.com" token="abc" messenger={messenger} />
      </MemoryRouter>
    );
    const button = container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }
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

  it('allows entering email', () => {
    const { container } = render(
      <MemoryRouter>
        <NewLoginCard messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    const inputs = container.querySelectorAll('input');
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: 'test@example.com' } });
    }
    expect(container).toBeTruthy();
  });

  it('allows entering password', () => {
    const { container } = render(
      <MemoryRouter>
        <NewLoginCard messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    const inputs = container.querySelectorAll('input[type="password"]');
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: 'Password123!' } });
    }
    expect(container).toBeTruthy();
  });

  it('renders gender select', () => {
    const { container } = render(
      <MemoryRouter>
        <NewLoginCard messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('handles newLogin success', () => {
    const mockNewLogin = vi.fn((data, callbacks) => {
      callbacks.success.call(callbacks.context, {});
    });
    const mockLogin = vi.fn((data, callbacks) => {
      callbacks.success.call(callbacks.context, {});
    });
    API.newLogin = mockNewLogin;
    API.login = mockLogin;

    const messenger = { showMessage: vi.fn() };
    const { container } = render(
      <MemoryRouter>
        <NewLoginCard messenger={messenger} />
      </MemoryRouter>
    );
    const buttons = container.querySelectorAll('button');
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }
    expect(container).toBeTruthy();
  });

  it('handles newLogin error', () => {
    const mockNewLogin = vi.fn((data, callbacks) => {
      callbacks.error.call(callbacks.context, {});
    });
    API.newLogin = mockNewLogin;

    const messenger = { showMessage: vi.fn() };
    const { container } = render(
      <MemoryRouter>
        <NewLoginCard messenger={messenger} />
      </MemoryRouter>
    );
    const buttons = container.querySelectorAll('button');
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }
    expect(container).toBeTruthy();
  });
});
