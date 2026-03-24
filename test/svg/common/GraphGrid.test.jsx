import React from 'react';
import { render } from '@testing-library/react';

import GraphGrid from 'svg/common/GraphGrid';

describe('GraphGrid', () => {
  it('renders without crashing with defaults', () => {
    const { container } = render(
      <svg>
        <GraphGrid columns={5} rows={5} height={100} />
      </svg>
    );
    expect(container.querySelector('g')).toBeTruthy();
  });

  it('renders vertical and horizontal paths', () => {
    const { container } = render(
      <svg>
        <GraphGrid columns={3} rows={3} height={300} />
      </svg>
    );
    const paths = container.querySelectorAll('path.grid');
    expect(paths.length).toBeGreaterThan(0);
  });
});
