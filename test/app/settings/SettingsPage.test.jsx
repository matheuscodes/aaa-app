jest.mock('api', () => ({
  isAuthError: jest.fn(() => false),
  login: jest.fn(),
  seasons: { getList: jest.fn() },
  assessments: { getList: jest.fn() },
}));
jest.mock('api/helpers/getLocalArcher', () => jest.fn(() => ({ id: 1, name: 'Test' })));

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import SettingsPage from 'app/settings/SettingsPage';

describe('SettingsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <SettingsPage messenger={{ showMessage: jest.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('renders some settings content', () => {
    const { container } = render(
      <MemoryRouter>
        <SettingsPage messenger={{ showMessage: jest.fn() }} />
      </MemoryRouter>
    );
    expect(container.querySelector('div')).toBeTruthy();
  });
});
