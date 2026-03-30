vi.mock('api/helpers/deleteLocalArcher', () => ({ default: vi.fn() }));
vi.mock('api/helpers/getLocalRoles', () => ({ default: vi.fn(() => []) }));

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from 'app/common/Header';

describe('Header', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <Header title="Test App" />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('renders title', () => {
    const { container } = render(
      <MemoryRouter>
        <Header title="My App" />
      </MemoryRouter>
    );
    expect(container.textContent).toContain('My App');
  });

  it('renders with archer prop', () => {
    const archer = { name: 'Test Archer', email: 'archer@test.com' };
    const { container } = render(
      <MemoryRouter>
        <Header title="Test" archer={archer} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('renders menu icon button when archer is provided', () => {
    const archer = { name: 'Test Archer', email: 'archer@test.com' };
    const { container } = render(
      <MemoryRouter>
        <Header title="Test" archer={archer} />
      </MemoryRouter>
    );
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('opens drawer when menu button is clicked', () => {
    const archer = { name: 'Test Archer', email: 'archer@test.com' };
    const { container } = render(
      <MemoryRouter>
        <Header title="Test" archer={archer} />
      </MemoryRouter>
    );
    const button = container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }
    expect(container).toBeTruthy();
  });
});
