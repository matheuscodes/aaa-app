import React from 'react';
import { render } from '@testing-library/react';

import AboutPage from 'app/static/AboutPage';

describe('AboutPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<AboutPage />);
    expect(container).toBeTruthy();
  });
});
