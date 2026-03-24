import React from 'react';
import { render } from '@testing-library/react';

import Windmills from 'svg/icon/Windmills';

describe('Windmills', () => {
  it('renders without crashing', () => {
    const { container } = render(<Windmills width={50} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
