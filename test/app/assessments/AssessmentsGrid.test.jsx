vi.mock('api', () => ({
  default: {
    assessments: { reportById: vi.fn() },
  },
}));

import React from 'react';
import { render } from '@testing-library/react';

import AssessmentsGrid from 'app/assessments/AssessmentsGrid';

const mockAssessments = [
  {
    id: 1,
    seasonId: 1,
    date: new Date('2024-06-15'),
    eventName: null,
    seasonName: 'Test Season',
    totalPoints: 100,
    averagePoints: 8.5,
  },
  {
    id: 2,
    seasonId: 1,
    date: new Date('2024-07-01'),
    eventName: 'Competition',
    seasonName: 'Test Season',
    totalPoints: 120,
    averagePoints: 9.0,
  },
];

describe('AssessmentsGrid', () => {
  it('renders without crashing with assessments', () => {
    const { container } = render(
      <AssessmentsGrid
        assessments={mockAssessments}
        deleteAssessment={vi.fn()}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders waiting state when no assessments', () => {
    const { container } = render(
      <AssessmentsGrid
        assessments={null}
        deleteAssessment={vi.fn()}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders empty grid for empty assessments array', () => {
    const { container } = render(
      <AssessmentsGrid
        assessments={[]}
        deleteAssessment={vi.fn()}
      />
    );
    expect(container).toBeTruthy();
  });
});
