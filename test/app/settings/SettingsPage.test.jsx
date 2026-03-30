vi.mock('api', () => ({
  default: {
    isAuthError: vi.fn(() => false),
    login: vi.fn(),
    seasons: { getList: vi.fn() },
    assessments: { getList: vi.fn() },
    },
}));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn(() => ({ id: 1, name: 'Test' })) }));

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import SettingsPage from 'app/settings/SettingsPage';

describe('SettingsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <SettingsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('renders some settings content', () => {
    const { container } = render(
      <MemoryRouter>
        <SettingsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container.querySelector('div')).toBeTruthy();
  });
});
