jest.mock('api', () => ({
  isAuthError: jest.fn(() => false),
  login: jest.fn(),
  seasons: { getList: jest.fn() },
  assessments: { getList: jest.fn() },
}));
jest.mock('api/helpers/getLocalArcher', () => jest.fn(() => ({ id: 1, name: 'Test' })));

import React from 'react';
import { render } from '@testing-library/react';

import SettingsPage from 'app/settings/SettingsPage';

describe('SettingsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <SettingsPage messenger={{ showMessage: jest.fn() }} />
    );
    expect(container).toBeTruthy();
  });

  it('renders some settings content', () => {
    const { container } = render(
      <SettingsPage messenger={{ showMessage: jest.fn() }} />
    );
    expect(container.querySelector('div')).toBeTruthy();
  });
});
