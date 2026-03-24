import React from 'react';
import { render } from '@testing-library/react';

import MiniCalendar from 'svg/common/MiniCalendar';

describe('MiniCalendar', () => {
  it('renders without crashing', () => {
    const { container } = render(<MiniCalendar />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders with custom width and height', () => {
    const { container } = render(<MiniCalendar width={100} height={100} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });
});
