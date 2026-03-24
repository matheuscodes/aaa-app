import React from 'react';
import { render } from '@testing-library/react';

import EventBar from 'svg/season/EventBar';

describe('EventBar', () => {
  it('renders without crashing', () => {
    const event = { nameShort: 'CHM', color: '#FF0000' };
    const { container } = render(
      <svg><EventBar column={0} event={event} /></svg>
    );
    expect(container.querySelector('g')).toBeTruthy();
  });

  it('renders text with event name', () => {
    const event = { nameShort: 'WC', color: '#0000FF' };
    const { container } = render(
      <svg><EventBar column={1} event={event} /></svg>
    );
    expect(container.querySelector('text').textContent).toBe('WC');
  });
});
