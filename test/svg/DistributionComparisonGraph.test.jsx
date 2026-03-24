import React from 'react';
import { render } from '@testing-library/react';

import DistributionComparisonGraph from 'svg/DistributionComparisonGraph';

describe('DistributionComparisonGraph', () => {
  const emptyDist = { M: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, X: 0 };
  const data = {
    maxPercentage: 0.5,
    distributionNow: emptyDist,
    totalNow: 100,
    distributionBefore: emptyDist,
    totalBefore: 80,
  };

  it('renders without crashing', () => {
    const { container } = render(<DistributionComparisonGraph data={data} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
