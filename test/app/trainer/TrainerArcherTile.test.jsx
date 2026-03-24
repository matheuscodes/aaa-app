import React from 'react';
import { render } from '@testing-library/react';

import TrainerArcherTile from 'app/trainer/TrainerArcherTile';

describe('TrainerArcherTile', () => {
  const data = {
    id: 1,
    name: 'Test Archer',
    email: 'archer@test.com',
    status: 'APPROVED',
    updatedAt: '2023-01-15',
    privateNotes: '',
  };

  it('renders without crashing', () => {
    const { container } = render(
      <TrainerArcherTile
        data={data}
        onReject={jest.fn()}
        onApprove={jest.fn()}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders a card', () => {
    const { container } = render(
      <TrainerArcherTile
        data={data}
        onReject={jest.fn()}
        onApprove={jest.fn()}
      />
    );
    expect(container.querySelector('[class*="MuiCard"]')).toBeTruthy();
  });
});
