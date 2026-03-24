import React from 'react';
import { render } from '@testing-library/react';

import ReportTableStyle from 'svg/common/ReportTableStyle';

describe('ReportTableStyle', () => {
  it('renders without crashing', () => {
    const { container } = render(<svg><ReportTableStyle /></svg>);
    expect(container.querySelector('style')).toBeTruthy();
  });

  it('renders CSS styles for report table', () => {
    const { container } = render(<svg><ReportTableStyle /></svg>);
    const style = container.querySelector('style');
    expect(style.textContent).toContain('.aaa-reportDay');
  });
});
