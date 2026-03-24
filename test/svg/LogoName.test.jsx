import React from 'react';
import { render } from '@testing-library/react';

import LogoName from 'svg/LogoName';

describe('LogoName', () => {
  it('renders without crashing', () => {
    const { container } = render(<LogoName width={300} height={100} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders nested Logo SVG', () => {
    const { container } = render(<LogoName width={300} height={100} />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(1);
  });
});
