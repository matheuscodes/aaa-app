import React from 'react';
import { render } from '@testing-library/react';

import Compass from 'svg/icon/Compass';

describe('Compass', () => {
  it('renders without crashing', () => {
    const { container } = render(<Compass direction="N" width={50} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders with different directions', () => {
    ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'].forEach((dir) => {
      const { container } = render(<Compass direction={dir} width={50} />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
