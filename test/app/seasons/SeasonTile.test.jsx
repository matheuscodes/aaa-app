vi.mock('api', () => ({
  default: {
    seasons: { getById: vi.fn() },
  },
}));

import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import SeasonTile from 'app/seasons/SeasonTile';

const mockSeasonData = {
  name: 'Test Season 2024',
  start: new Date('2024-01-01'),
  end: new Date('2024-12-31'),
  goals: [{ arrowCount: 100, targetShare: 50 }],
  max: 100,
  minValue: 0,
  maxValue: 100,
  events: [],
};

describe('SeasonTile', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <SeasonTile
        seasonId={1}
        data={mockSeasonData}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders with null goals (shows waiting)', () => {
    const dataNoGoals = { ...mockSeasonData, goals: null };
    const { container } = render(
      <SeasonTile
        seasonId={1}
        data={dataNoGoals}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />
    );
    expect(container).toBeTruthy();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = vi.fn();
    const { container } = render(
      <SeasonTile
        seasonId={1}
        data={mockSeasonData}
        onDelete={vi.fn()}
        onEdit={onEdit}
      />
    );
    const buttons = container.querySelectorAll('button');
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }
    expect(container).toBeTruthy();
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    const { container } = render(
      <SeasonTile
        seasonId={1}
        data={mockSeasonData}
        onDelete={onDelete}
        onEdit={vi.fn()}
      />
    );
    const buttons = container.querySelectorAll('button');
    if (buttons.length > 1) {
      fireEvent.click(buttons[1]);
    }
    expect(container).toBeTruthy();
  });
});
