import React from 'react';
import { render } from '@testing-library/react';

import SeasonLabels from 'svg/season/SeasonLabels';

describe('SeasonLabels', () => {
  it('renders without crashing', () => {
    const { container } = render(<svg><SeasonLabels max={1000} /></svg>);
    expect(container.querySelector('g')).toBeTruthy();
  });

  it('renders rects for each label type', () => {
    const { container } = render(<svg><SeasonLabels max={1000} /></svg>);
    expect(container.querySelector('rect.plan')).toBeTruthy();
    expect(container.querySelector('rect.training')).toBeTruthy();
    expect(container.querySelector('rect.target')).toBeTruthy();
  });
});
