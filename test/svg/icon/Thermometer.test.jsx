import React from 'react';
import { render } from '@testing-library/react';

import Thermometer from 'svg/icon/Thermometer';

describe('Thermometer', () => {
  it('renders without crashing', () => {
    const { container } = render(<Thermometer width={50} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
