import React from 'react';
import { render } from '@testing-library/react';

import GraphEstimations from 'svg/common/GraphEstimations';

describe('GraphEstimations', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <svg>
        <GraphEstimations data={[5, 6, 7]} min={0} max={10} size={1000} />
      </svg>
    );
    expect(container.querySelector('g')).toBeTruthy();
  });

  it('renders a path element', () => {
    const { container } = render(
      <svg>
        <GraphEstimations data={[5, 6, 7]} min={0} max={10} size={1000} />
      </svg>
    );
    expect(container.querySelector('path')).toBeTruthy();
  });

  it('renders bullet circles for positive values', () => {
    const { container } = render(
      <svg>
        <GraphEstimations data={[3, 5, 7]} min={0} max={10} size={1000} />
      </svg>
    );
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBe(3);
  });
});
