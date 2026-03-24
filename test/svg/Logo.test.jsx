import React from 'react';
import { render } from '@testing-library/react';

import Logo from 'svg/Logo';

describe('Logo', () => {
  it('renders without crashing', () => {
    const { container } = render(<Logo width={100} height={100} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders with custom dimensions', () => {
    const { container } = render(<Logo width={200} height={150} />);
    const svg = container.querySelector('svg');
    expect(svg.getAttribute('width')).toBe('200');
    expect(svg.getAttribute('height')).toBe('150');
  });
});
