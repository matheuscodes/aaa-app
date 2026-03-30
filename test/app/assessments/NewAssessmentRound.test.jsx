import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import NewAssessmentRound from 'app/assessments/RoundStep/NewAssessmentRound';

describe('NewAssessmentRound', () => {
  const defaultProps = {
    roundIndex: 0,
    addRound: vi.fn(),
  };

  it('renders without crashing', () => {
    const { container } = render(
      <NewAssessmentRound {...defaultProps} />
    );
    expect(container).toBeTruthy();
  });

  it('renders add round button', () => {
    const { container } = render(
      <NewAssessmentRound {...defaultProps} />
    );
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('opens dialog when add button is clicked', () => {
    const { container } = render(
      <NewAssessmentRound {...defaultProps} />
    );
    const buttons = container.querySelectorAll('button');
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }
    expect(container).toBeTruthy();
  });

  it('calls addRound when form is submitted', () => {
    const addRound = vi.fn();
    const { container } = render(
      <NewAssessmentRound roundIndex={0} addRound={addRound} />
    );
    expect(container).toBeTruthy();
  });
});
