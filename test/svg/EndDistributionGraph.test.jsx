import React from 'react';
import { render } from '@testing-library/react';

import EndDistributionGraph from 'svg/EndDistributionGraph';

describe('EndDistributionGraph', () => {
  const data = {
    id: 'test',
    endCount: 3,
    maxCount: 10,
    counts: {
      tens: [5, 3, 2],
      xs: [1, 0, 2],
    },
  };

  it('renders without crashing', () => {
    const { container } = render(<EndDistributionGraph id="test" data={data} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
