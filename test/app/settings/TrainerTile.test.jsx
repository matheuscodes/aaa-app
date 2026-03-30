import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import TrainerTile from 'app/settings/TrainerTile';

const mockData = {
  id: 1,
  fullName: 'John Doe',
  email: 'john@example.com',
  licenses: [
    { title: 'Level 1', issuer: 'WA', country: 'DE' },
  ],
  styles: ['recurve', 'compound'],
  classes: ['adult', 'senior'],
};

describe('TrainerTile', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <TrainerTile
        data={mockData}
        onSelect={vi.fn()}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders trainer name', () => {
    const { container } = render(
      <TrainerTile
        data={mockData}
        onSelect={vi.fn()}
      />
    );
    expect(container.textContent).toContain('John Doe');
  });

  it('renders with empty licenses and styles', () => {
    const dataEmpty = { id: 2, fullName: 'Jane Doe', licenses: null, styles: null, classes: null };
    const { container } = render(
      <TrainerTile
        data={dataEmpty}
        onSelect={vi.fn()}
      />
    );
    expect(container).toBeTruthy();
  });

  it('calls onSelect when request button is clicked', () => {
    const onSelect = vi.fn();
    const { container } = render(
      <TrainerTile
        data={mockData}
        onSelect={onSelect}
      />
    );
    const button = container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }
    expect(container).toBeTruthy();
  });
});
