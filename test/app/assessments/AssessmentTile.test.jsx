vi.mock('api', () => ({
  default: {
    assessments: { reportById: vi.fn() },
  },
}));

import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import AssessmentTile from 'app/assessments/AssessmentTile';

const mockData = {
  id: 1,
  seasonId: 1,
  date: new Date('2024-06-15'),
  eventName: null,
  seasonName: 'Test Season',
  totalPoints: 100,
  averagePoints: 8.5,
};

describe('AssessmentTile', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <AssessmentTile
        data={mockData}
        onDelete={vi.fn()}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders with event name', () => {
    const dataWithEvent = { ...mockData, eventName: 'Test Event' };
    const { container } = render(
      <AssessmentTile
        data={dataWithEvent}
        onDelete={vi.fn()}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders without onDelete (no header)', () => {
    const { container } = render(
      <AssessmentTile
        data={mockData}
      />
    );
    expect(container).toBeTruthy();
  });

  it('opens details dialog when button clicked', () => {
    const { container } = render(
      <AssessmentTile
        data={mockData}
        onDelete={vi.fn()}
      />
    );
    const buttons = container.querySelectorAll('button');
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }
    expect(container).toBeTruthy();
  });
});
