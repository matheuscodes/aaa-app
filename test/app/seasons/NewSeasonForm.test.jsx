vi.mock('api', () => ({
  default: {
    events: { getList: vi.fn(), getPublicEvents: vi.fn() },
    seasons: { permit: vi.fn(), deny: vi.fn() },
  },
}));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn(() => ({ id: 1, name: 'Test' })) }));

import React from 'react';
import { render } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import NewSeasonForm from 'app/seasons/NewSeasonForm';

const mockSeason = {
  name: 'Test Season',
  availableTrainers: [],
  goals: [],
  start: new Date('2024-01-01'),
  end: new Date('2024-12-31'),
  equipmentId: null,
  permitted: [],
  max: 100,
  minValue: 0,
  maxValue: 100,
  updateWeeks: vi.fn(),
  changeWeekPlan: vi.fn(),
  changeWeekTargetShare: vi.fn(),
  setPermission: vi.fn(),
};

const mockEquipment = [
  { id: 1, name: 'Bow 1' },
  { id: 2, name: 'Bow 2' },
];

describe('NewSeasonForm', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <NewSeasonForm
          season={mockSeason}
          equipment={mockEquipment}
          messenger={{ showMessage: vi.fn() }}
        />
      </LocalizationProvider>
    );
    expect(container).toBeTruthy();
  });

  it('renders with trainers', () => {
    const seasonWithTrainers = {
      ...mockSeason,
      availableTrainers: [
        { trainerId: 1, name: 'Trainer 1' },
      ],
    };
    const { container } = render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <NewSeasonForm
          season={seasonWithTrainers}
          equipment={mockEquipment}
          messenger={{ showMessage: vi.fn() }}
        />
      </LocalizationProvider>
    );
    expect(container).toBeTruthy();
  });

  it('renders with empty equipment', () => {
    const { container } = render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <NewSeasonForm
          season={mockSeason}
          equipment={[]}
          messenger={{ showMessage: vi.fn() }}
        />
      </LocalizationProvider>
    );
    expect(container).toBeTruthy();
  });
});
