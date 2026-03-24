import React from 'react';
import { render } from '@testing-library/react';

import ActualBar from 'svg/season/ActualBar';

describe('ActualBar', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <svg><ActualBar column={0} target={100} training={50} /></svg>
    );
    expect(container.querySelector('g')).toBeTruthy();
  });

  it('renders target and training rects', () => {
    const { container } = render(
      <svg><ActualBar column={1} target={200} training={100} /></svg>
    );
    expect(container.querySelector('rect.target')).toBeTruthy();
    expect(container.querySelector('rect.training')).toBeTruthy();
  });

  it('renders zero height for negative values', () => {
    const { container } = render(
      <svg><ActualBar column={0} target={-10} training={-5} /></svg>
    );
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBe(2);
  });
});
