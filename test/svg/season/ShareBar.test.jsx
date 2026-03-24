import React from 'react';
import { render } from '@testing-library/react';

import ShareBar from 'svg/season/ShareBar';

describe('ShareBar', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <svg><ShareBar column={0} value={100} /></svg>
    );
    expect(container.querySelector('g')).toBeTruthy();
  });

  it('renders share and share-shadow rects', () => {
    const { container } = render(
      <svg><ShareBar column={1} value={200} /></svg>
    );
    expect(container.querySelector('rect.share')).toBeTruthy();
    expect(container.querySelector('rect.share-shadow')).toBeTruthy();
  });
});
