jest.mock('api', () => ({
  isAuthError: jest.fn(() => false),
  seasons: {
    getList: jest.fn(),
    getById: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    permit: jest.fn(),
    deny: jest.fn(),
  },
  trainers: {
    getAllTrainers: jest.fn(),
  },
  events: {
    getList: jest.fn(),
    getPublicEvents: jest.fn(),
  },
}));
jest.mock('api/helpers/getLocalArcher', () => jest.fn(() => ({ id: 1, name: 'Test' })));

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
      <NewSeasonCard messenger={{ showMessage: jest.fn() }} onSaved={jest.fn()} />
    );
    expect(container).toBeTruthy();
  });
});
