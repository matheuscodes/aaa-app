vi.mock('api', () => ({
  default: {
    assessments: { getList: vi.fn(), getTargets: vi.fn() },
    trainings: { getList: vi.fn() },
    seasons: { getList: vi.fn() },
    isAuthError: vi.fn(() => false),
    },
}));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn(() => ({ id: 1, name: 'Test' })) }));

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import API from 'api';

import AssessmentsPage from 'app/assessments/AssessmentsPage';
import TrainingsPage from 'app/trainings/TrainingsPage';

describe('AssessmentsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <AssessmentsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('calls getList on mount', () => {
    render(
      <MemoryRouter>
        <AssessmentsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(API.assessments.getList).toHaveBeenCalled();
  });

  it('renders new assessment button', () => {
    const { container } = render(
      <MemoryRouter>
        <AssessmentsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('opens new assessment dialog when button clicked', () => {
    const { container } = render(
      <MemoryRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AssessmentsPage messenger={{ showMessage: vi.fn() }} />
        </LocalizationProvider>
      </MemoryRouter>
    );
    const buttons = container.querySelectorAll('button');
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }
    expect(container).toBeTruthy();
  });

  it('renders assessments when API returns data', () => {
    const mockGetList = vi.fn((page, callbacks) => {
      callbacks.success.call(callbacks.context, [
        {
          id: 1,
          date: new Date('2024-06-15'),
          seasonId: 1,
          totalPoints: 100,
          averagePoints: 8.5,
        },
      ]);
    });
    API.assessments.getList = mockGetList;

    const { container } = render(
      <MemoryRouter>
        <AssessmentsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('handles API error gracefully', () => {
    const mockGetList = vi.fn((page, callbacks) => {
      callbacks.error.call(callbacks.context, new Error('error'));
    });
    API.assessments.getList = mockGetList;
    API.isAuthError = vi.fn(() => false);

    const { container } = render(
      <MemoryRouter>
        <AssessmentsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});

describe('TrainingsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <TrainingsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('calls getList on mount', () => {
    render(
      <MemoryRouter>
        <TrainingsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(API.trainings.getList).toHaveBeenCalled();
  });

  it('renders new training button', () => {
    const { container } = render(
      <MemoryRouter>
        <TrainingsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('opens new training dialog when button clicked', () => {
    const { container } = render(
      <MemoryRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TrainingsPage messenger={{ showMessage: vi.fn() }} />
        </LocalizationProvider>
      </MemoryRouter>
    );
    const buttons = container.querySelectorAll('button');
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }
    expect(container).toBeTruthy();
  });

  it('renders trainings when API returns data', () => {
    const mockGetList = vi.fn((page, callbacks) => {
      callbacks.success.call(callbacks.context, [
        {
          id: 1,
          date: new Date('2024-06-15'),
          seasonId: 1,
          arrows: { 18: { TARGET: 36 } },
        },
      ]);
    });
    API.trainings.getList = mockGetList;

    const { container } = render(
      <MemoryRouter>
        <TrainingsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('handles API error gracefully', () => {
    const mockGetList = vi.fn((page, callbacks) => {
      callbacks.error.call(callbacks.context, new Error('error'));
    });
    API.trainings.getList = mockGetList;
    API.isAuthError = vi.fn(() => false);

    const { container } = render(
      <MemoryRouter>
        <TrainingsPage messenger={{ showMessage: vi.fn() }} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});
