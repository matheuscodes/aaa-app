vi.mock('api', () => ({
  default: {
    assessments: { reportById: vi.fn() },
  },
}));

import React from 'react';
import { render } from '@testing-library/react';

import AssessmentReport from 'app/assessments/AssessmentReport';

const mockData = {
  id: 1,
  seasonId: 1,
  date: new Date('2024-06-15'),
  totalPoints: 100,
  averagePoints: 8.5,
};

describe('AssessmentReport', () => {
  it('renders without crashing when closed', () => {
    const { container } = render(
      <AssessmentReport
        open={false}
        handleClose={vi.fn()}
        assessmentId={1}
        seasonId={1}
        data={mockData}
        onDelete={vi.fn()}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders without crashing when open', () => {
    const { container } = render(
      <AssessmentReport
        open={true}
        handleClose={vi.fn()}
        assessmentId={1}
        seasonId={1}
        data={mockData}
        onDelete={vi.fn()}
      />
    );
    expect(container).toBeTruthy();
  });
});
