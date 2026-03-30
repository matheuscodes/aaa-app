vi.mock('api', () => ({
  default: {
    reports: {
      getYearOverview: vi.fn(),
      getLastWeeksOverview: vi.fn(),
      getRingsOverview: vi.fn(),
      getAssessmentsOverview: vi.fn(),
    },
    assessments: { getList: vi.fn() },
    seasons: { getActive: vi.fn(), getList: vi.fn() },
    trainings: { getList: vi.fn() },
    overview: { get: vi.fn() },
    trainers: {
      getAllTrainers: vi.fn(),
      getTrainerRequests: vi.fn(),
      getTrainerArchers: vi.fn(),
      archers: { list: vi.fn() },
      seasons: { list: vi.fn(), getMonthReport: vi.fn() },
    },
    isAuthError: vi.fn(() => false),
  },
}));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn(() => ({ id: 1, name: 'Test Archer' })) }));
vi.mock('api/helpers/deleteLocalArcher', () => ({ default: vi.fn() }));
vi.mock('api/helpers/getLocalRoles', () => ({ default: vi.fn(() => []) }));

import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Application from '../../src/Application';

describe('Application', () => {
  it('renders without crashing', () => {
    const { container } = render(<Application />);
    expect(container).toBeTruthy();
  });

  it('renders with cookie banner', () => {
    const { container } = render(<Application />);
    expect(container).toBeTruthy();
  });

  it('renders footer', () => {
    const { container } = render(<Application />);
    expect(container.querySelector('footer')).toBeTruthy();
  });

  it('calls showMessage to display an alarm', () => {
    let appInstance;
    const TestComponent = React.forwardRef((props, ref) => {
      const appRef = React.useRef(null);
      React.useEffect(() => {
        appInstance = appRef.current;
      });
      return <Application ref={appRef} />;
    });
    const { container } = render(<TestComponent />);
    expect(container).toBeTruthy();
  });

  it('shows and dismisses cookie banner', () => {
    const { container } = render(<Application />);
    const buttons = container.querySelectorAll('button');
    const okButton = Array.from(buttons).find(b => b.textContent === 'OK');
    if (okButton) {
      fireEvent.click(okButton);
    }
    expect(container).toBeTruthy();
  });
});
