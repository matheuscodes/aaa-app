import React from 'react';
import { render } from '@testing-library/react';

import Waiting from 'app/common/Waiting';

describe('Waiting', () => {
  it('renders without crashing', () => {
    const { container } = render(<Waiting />);
    expect(container).toBeTruthy();
  });

  it('renders a centered container', () => {
    const { container } = render(<Waiting />);
    const div = container.querySelector('div');
    expect(div).toBeTruthy();
    expect(div.style.textAlign).toBe('center');
  });
});
