import React from 'react';
import { render } from '@testing-library/react';

import ArrowRingRow from 'app/assessments/ArrowRingRow';

describe('ArrowRingRow', () => {
  it('renders without crashing with empty arrows', () => {
    const { container } = render(<ArrowRingRow arrows={[]} />);
    expect(container).toBeTruthy();
  });

  it('renders avatar for each arrow', () => {
    const { container } = render(<ArrowRingRow arrows={['X', '10', '9']} />);
    const avatars = container.querySelectorAll('[class*="MuiAvatar"]');
    expect(avatars.length).toBe(3);
  });

  it('renders correct arrow values', () => {
    const { container } = render(<ArrowRingRow arrows={['X', '10']} />);
    expect(container.textContent).toContain('X');
    expect(container.textContent).toContain('10');
  });
});
