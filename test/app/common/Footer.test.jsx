import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Footer from 'app/common/Footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it('renders a footer element', () => {
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(container.querySelector('footer')).toBeTruthy();
  });

  it('renders language selector', () => {
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(container.querySelector('select, [role="combobox"]')).toBeTruthy();
  });
});
