vi.mock('api/helpers/DownloadFile', () => ({ default: vi.fn() }));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn() }));
vi.mock('api', () => ({
  default: {
    login: vi.fn(),
    reset: vi.fn(),
    },
}));

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

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
});
