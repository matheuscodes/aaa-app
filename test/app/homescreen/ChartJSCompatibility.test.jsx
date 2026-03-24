// This test reproduces the react-chartjs-2 compatibility issue:
// react-chartjs-2 v5+ uses react/jsx-runtime which requires React 17+.
// The build fails with React 16 because React 16's package.json has an empty
// "exports" field, so webpack 5 cannot resolve "react/jsx-runtime" from an
// ESM module. This test verifies that react/jsx-runtime is available and that
// the Bar component from react-chartjs-2 renders correctly.
import React from 'react';
import { render } from '@testing-library/react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

describe('react-chartjs-2 jsx-runtime compatibility', () => {
  it('react/jsx-runtime exports jsx transform functions (React 17+ required)', () => {
    const { jsx, jsxs, Fragment } = require('react/jsx-runtime');
    expect(typeof jsx).toBe('function');
    expect(typeof jsxs).toBe('function');
    expect(Fragment).toBeDefined();
  });

  it('Bar from react-chartjs-2 renders without crashing', () => {
    const data = {
      labels: ['January', 'February', 'March'],
      datasets: [
        {
          label: 'Test Dataset',
          data: [10, 20, 30],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
    const { container } = render(<Bar data={data} />);
    expect(container).toBeTruthy();
  });
});
