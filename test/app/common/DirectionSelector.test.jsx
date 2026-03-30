import React from 'react';
import { render } from '@testing-library/react';

import DirectionSelector from 'app/common/DirectionSelector';

describe('DirectionSelector', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <DirectionSelector value="N" text="Direction" onChange={jest.fn()} />
    );
    expect(container).toBeTruthy();
  });

  it('renders a select element', () => {
    const { container } = render(
      <DirectionSelector value="N" text="Direction" onChange={jest.fn()} />
    );
    expect(container.querySelector('select, [role="combobox"]')).toBeTruthy();
  });
});
