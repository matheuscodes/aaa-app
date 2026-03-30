import React from 'react';
import { render } from '@testing-library/react';

import RoundStep from 'app/assessments/RoundStep/RoundStep';
import NewAssessmentEnd from 'app/assessments/RoundStep/NewAssessmentEnd';
import NewAssessmentRound from 'app/assessments/RoundStep/NewAssessmentRound';

describe('NewAssessmentEnd', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <NewAssessmentEnd roundIndex={0} addEnd={vi.fn()} />
    );
    expect(container).toBeTruthy();
  });
});

describe('NewAssessmentRound', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <NewAssessmentRound roundIndex={0} addRound={vi.fn()} />
    );
    expect(container).toBeTruthy();
  });
});

describe('RoundStep', () => {
  const round = { index: 0, ends: [['X', '10', '9']] };

  it('renders without crashing', () => {
    const { container } = render(
      <div>
        <RoundStep
          roundIndex={0}
          round={round}
          addEnd={vi.fn()}
          addRound={vi.fn()}
          deleteEnd={vi.fn()}
        />
      </div>
    );
    expect(container).toBeTruthy();
  });
});
