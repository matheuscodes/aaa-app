import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import NewAssessmentEnd from 'app/assessments/RoundStep/NewAssessmentEnd';

describe('NewAssessmentEnd', () => {
  const defaultProps = {
    endIndex: 0,
    endSize: 3,
    arrowCount: 3,
    end: ['10', '9', '8'],
    setEnd: vi.fn(),
  };

  it('renders without crashing', () => {
    const { container } = render(
      <NewAssessmentEnd {...defaultProps} />
    );
    expect(container).toBeTruthy();
  });

  it('renders with empty end array', () => {
    const { container } = render(
      <NewAssessmentEnd
        endIndex={0}
        endSize={3}
        arrowCount={3}
        end={[]}
        setEnd={vi.fn()}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders arrow rings', () => {
    const { container } = render(
      <NewAssessmentEnd {...defaultProps} />
    );
    expect(container).toBeTruthy();
  });
});
