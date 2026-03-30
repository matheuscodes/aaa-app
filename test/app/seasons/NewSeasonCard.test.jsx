vi.mock('api', () => ({
  default: {
    isAuthError: vi.fn(() => false),
    seasons: {
      getList: vi.fn(),
      getById: vi.fn(),
      save: vi.fn(),
      delete: vi.fn(),
      permit: vi.fn(),
      deny: vi.fn(),
    },
    trainers: {
      getAllTrainers: vi.fn(),
    },
    events: {
      getList: vi.fn(),
      getPublicEvents: vi.fn(),
    },
    equipment: {
      getList: vi.fn(),
      getById: vi.fn(),
    },
    },
}));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn(() => ({ id: 1, name: 'Test' })) }));

import React from 'react';
import { render } from '@testing-library/react';

import NewSeasonCard from 'app/seasons/NewSeasonCard';
import NewSeasonForm from 'app/seasons/NewSeasonForm';
import Season from 'model/Season';

const season = new Season({
  start: '2023-01-02',
  end: '2023-12-31',
  goals: [],
});

describe('NewSeasonCard', () => {
  it('renders FAB button without crashing', () => {
    const { container } = render(
      <NewSeasonCard messenger={{ showMessage: vi.fn() }} onSaved={vi.fn()} />
    );
    expect(container).toBeTruthy();
  });
});
