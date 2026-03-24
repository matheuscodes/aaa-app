import React from 'react';
import { render } from '@testing-library/react';

import GraphAxisLabels from 'svg/common/GraphAxisLabels';

describe('GraphAxisLabels', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <svg>
        <GraphAxisLabels min={0} max={100} size={1000} type="left" title="arrows" offset={0} />
      </svg>
    );
    expect(container.querySelector('g')).toBeTruthy();
  });

  it('renders empty group when unit is zero (min equals max)', () => {
    const { container } = render(
      <svg>
        <GraphAxisLabels min={50} max={50} size={1000} type="left" title="arrows" offset={0} />
      </svg>
    );
    expect(container.querySelector('g')).toBeTruthy();
  });
});
