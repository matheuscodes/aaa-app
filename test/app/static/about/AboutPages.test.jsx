import React from 'react';
import { render } from '@testing-library/react';

import AboutHome from 'app/static/about/AboutHome';
import AboutSeasons from 'app/static/about/AboutSeasons';
import AboutTrainings from 'app/static/about/AboutTrainings';
import AboutAssessments from 'app/static/about/AboutAssessments';
import AboutReports from 'app/static/about/AboutReports';

describe('About sub-pages', () => {
  it('AboutHome renders without crashing', () => {
    const { container } = render(<AboutHome />);
    expect(container).toBeTruthy();
  });

  it('AboutSeasons renders without crashing', () => {
    const { container } = render(<AboutSeasons />);
    expect(container).toBeTruthy();
  });

  it('AboutTrainings renders without crashing', () => {
    const { container } = render(<AboutTrainings />);
    expect(container).toBeTruthy();
  });

  it('AboutAssessments renders without crashing', () => {
    const { container } = render(<AboutAssessments />);
    expect(container).toBeTruthy();
  });

  it('AboutReports renders without crashing', () => {
    const { container } = render(<AboutReports />);
    expect(container).toBeTruthy();
  });
});
