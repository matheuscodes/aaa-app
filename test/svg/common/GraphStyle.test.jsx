import React from 'react';
import { render } from '@testing-library/react';

import GraphStyle from 'svg/common/GraphStyle';

describe('GraphStyle', () => {
  it('renders without crashing', () => {
    const { container } = render(<svg><GraphStyle /></svg>);
    expect(container.querySelector('style')).toBeTruthy();
  });

  it('renders CSS styles', () => {
    const { container } = render(<svg><GraphStyle /></svg>);
    const style = container.querySelector('style');
    expect(style.textContent).toContain('.plan');
    expect(style.textContent).toContain('.grid');
  });
});
