import React from 'react';
import { render } from '@testing-library/react';

import ArcherAnchored from 'svg/icon/ArcherAnchored';

describe('ArcherAnchored', () => {
  it('renders without crashing', () => {
    const { container } = render(<ArcherAnchored width={100} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
