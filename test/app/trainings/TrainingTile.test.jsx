import React from 'react';
import { render } from '@testing-library/react';

import TrainingTile from 'app/trainings/TrainingTile';

describe('TrainingTile', () => {
  const data = {
    id: 1,
    seasonId: 10,
    date: new Date('2023-06-15'),
    arrows: {
      '18': {
        TARGET: 36,
        WARMUP: 12,
      },
    },
  };

  it('renders without crashing', () => {
    const { container } = render(
      <TrainingTile data={data} onDelete={vi.fn()} />
    );
    expect(container).toBeTruthy();
  });

  it('renders a card', () => {
    const { container } = render(
      <TrainingTile data={data} onDelete={vi.fn()} />
    );
    expect(container.querySelector('[class*="MuiCard"]')).toBeTruthy();
  });
});
