import React from 'react';
import { render } from '@testing-library/react';

import AssessmentArrowTable from 'app/assessments/AssessmentArrowTable';

describe('AssessmentArrowTable', () => {
  const roundData = {
    index: 0,
    ends: [
      ['X', '10', '9'],
      ['8', '7', '6'],
    ],
  };

  it('renders without crashing', () => {
    const { container } = render(<AssessmentArrowTable data={roundData} />);
    expect(container.querySelector('table')).toBeTruthy();
  });

  it('renders a row for each end', () => {
    const { container } = render(<AssessmentArrowTable data={roundData} />);
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
  });

  it('renders with delete function', () => {
    const { container } = render(
      <AssessmentArrowTable data={roundData} deleteEnd={vi.fn()} />
    );
    expect(container.querySelector('table')).toBeTruthy();
  });
});
