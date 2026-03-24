import React from 'react';
import { render } from '@testing-library/react';

import ArcherStanding from 'svg/icon/ArcherStanding';

describe('ArcherStanding', () => {
  it('renders without crashing', () => {
    const { container } = render(<ArcherStanding width={100} height={100} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
