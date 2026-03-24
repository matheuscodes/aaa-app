import React from 'react';
import { render } from '@testing-library/react';

import TrainerRequestTile from 'app/trainer/TrainerRequestTile';

describe('TrainerRequestTile', () => {
  const data = {
    id: 1,
    archer: { name: 'Test Archer', email: 'archer@test.com' },
    message: 'Request message',
    status: 'NEW',
    receivedAt: '2023-01-15',
    updatedAt: '2023-01-15',
  };

  it('renders without crashing with NEW status', () => {
    const { container } = render(
      <TrainerRequestTile
        data={data}
        onReject={jest.fn()}
        onApprove={jest.fn()}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders reject and approve buttons for NEW requests', () => {
    const { container } = render(
      <TrainerRequestTile
        data={data}
        onReject={jest.fn()}
        onApprove={jest.fn()}
      />
    );
    expect(container.querySelectorAll('button').length).toBeGreaterThanOrEqual(2);
  });

  it('renders without buttons for non-NEW status', () => {
    const approvedData = { ...data, status: 'APPROVED', archer: { name: 'Test Archer' } };
    const { container } = render(
      <TrainerRequestTile
        data={approvedData}
        onReject={jest.fn()}
        onApprove={jest.fn()}
      />
    );
    expect(container.querySelectorAll('button').length).toBeLessThan(2);
  });
});
