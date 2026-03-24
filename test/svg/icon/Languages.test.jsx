import React from 'react';
import { render } from '@testing-library/react';

import Languages from 'svg/icon/Languages';

describe('Languages Icon', () => {
  it('renders without crashing', () => {
    const { container } = render(<Languages />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
