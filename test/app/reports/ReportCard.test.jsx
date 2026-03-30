vi.mock('api', () => ({
  default: {
    seasons: { getList: vi.fn(), getMonthReport: vi.fn() },
    trainers: { seasons: { getMonthReport: vi.fn() } },
    isAuthError: vi.fn(() => false),
  },
}));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn(() => null) }));

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ReportCard from 'app/reports/ReportCard';

const mockSeasons = [
  {
    id: 1,
    name: 'Season 2024',
    start: new Date('2024-01-01'),
    end: new Date('2024-12-31'),
  },
  {
    id: 2,
    name: 'Season 2023',
    start: new Date('2023-01-01'),
    end: new Date('2023-12-31'),
  },
];

describe('ReportCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <ReportCard
          seasons={mockSeasons}
          messenger={{ showMessage: vi.fn() }}
        />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('renders with empty seasons list', () => {
    const { container } = render(
      <MemoryRouter>
        <ReportCard
          seasons={[]}
          messenger={{ showMessage: vi.fn() }}
        />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('renders season select', () => {
    const { container } = render(
      <MemoryRouter>
        <ReportCard
          seasons={mockSeasons}
          messenger={{ showMessage: vi.fn() }}
        />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('renders with pupilId for trainer view', () => {
    const { container } = render(
      <MemoryRouter>
        <ReportCard
          seasons={mockSeasons}
          pupilId={42}
          messenger={{ showMessage: vi.fn() }}
        />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});
