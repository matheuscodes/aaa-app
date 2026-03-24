import React from 'react';
import { render } from '@testing-library/react';

import PlanBar from 'svg/season/PlanBar';

describe('PlanBar', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <svg><PlanBar column={0} value={100} /></svg>
    );
    expect(container.querySelector('g')).toBeTruthy();
  });

  it('renders a plan rect', () => {
    const { container } = render(
      <svg><PlanBar column={2} value={150} /></svg>
    );
    expect(container.querySelector('rect.plan')).toBeTruthy();
  });
});
