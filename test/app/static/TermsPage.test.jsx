import React from 'react';
import { render } from '@testing-library/react';

import TermsPage from 'app/static/TermsPage';

describe('TermsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<TermsPage />);
    expect(container).toBeTruthy();
  });

  it('renders the terms card', () => {
    const { container } = render(<TermsPage />);
    expect(container.querySelector('[class*="MuiCard"]')).toBeTruthy();
  });
});
