import React from 'react';
import { render } from '@testing-library/react';

import GraphBottomLabels from 'svg/common/GraphBottomLabels';

describe('GraphBottomLabels', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <svg>
        <GraphBottomLabels min={0} max={100} content={['Jan', 'Feb', 'Mar']} />
      </svg>
    );
    expect(container.querySelector('g')).toBeTruthy();
  });

  it('renders empty group when unit is zero', () => {
    const { container } = render(
      <svg>
        <GraphBottomLabels min={0} max={0} content={[]} />
      </svg>
    );
    expect(container.querySelector('g')).toBeTruthy();
  });

  it('renders labels for each content item', () => {
    const { container } = render(
      <svg>
        <GraphBottomLabels min={0} max={100} content={['A', 'B', 'C']} />
      </svg>
    );
    const texts = container.querySelectorAll('text.bottom');
    expect(texts.length).toBe(3);
  });

  it('renders prefix labels when prefix is provided', () => {
    const { container } = render(
      <svg>
        <GraphBottomLabels min={0} max={100} content={['A']} prefix="Week" />
      </svg>
    );
    const texts = container.querySelectorAll('text.bottom');
    expect(texts.length).toBe(2);
  });
});
