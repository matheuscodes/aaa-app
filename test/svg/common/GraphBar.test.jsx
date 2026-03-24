import React from 'react';
import { render } from '@testing-library/react';

import GraphBar from 'svg/common/GraphBar';

describe('GraphBar', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <svg>
        <GraphBar value={100} column={0} position={0} size={1} type="plan" />
      </svg>
    );
    expect(container.querySelector('g')).toBeTruthy();
  });

  it('renders a rect with correct class', () => {
    const { container } = render(
      <svg>
        <GraphBar value={200} column={1} position={0} size={2} type="training" />
      </svg>
    );
    expect(container.querySelector('rect.training')).toBeTruthy();
  });
});
