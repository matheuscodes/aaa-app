import React from 'react';
import { render } from '@testing-library/react';

import ArcherWheelChair from 'svg/icon/ArcherWheelChair';

describe('ArcherWheelChair', () => {
  it('renders without crashing', () => {
    const { container } = render(<ArcherWheelChair width={100} height={100} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
