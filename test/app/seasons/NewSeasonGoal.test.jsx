import React from 'react';
import { render } from '@testing-library/react';

import NewSeasonGoal from 'app/seasons/NewSeasonGoal';

describe('NewSeasonGoal', () => {
  const goal = { arrowCount: 36, targetShare: 50, week: 1 };

  it('renders without crashing', () => {
    const { container } = render(
      <NewSeasonGoal
        goal={goal}
        goalIndex={0}
        xs={4}
        changeWeekPlan={jest.fn()}
        changeWeekShare={jest.fn()}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders input fields', () => {
    const { container } = render(
      <NewSeasonGoal
        goal={goal}
        goalIndex={0}
        xs={4}
        changeWeekPlan={jest.fn()}
        changeWeekShare={jest.fn()}
      />
    );
    expect(container.querySelectorAll('input').length).toBeGreaterThan(0);
  });
});
