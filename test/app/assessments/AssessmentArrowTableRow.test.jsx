import React from 'react';
import { render } from '@testing-library/react';

import AssessmentArrowTableRow from 'app/assessments/AssessmentArrowTableRow';

describe('AssessmentArrowTableRow', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <table><tbody>
        <AssessmentArrowTableRow
          end={['X', '10', '9']}
          endIndex={0}
          roundIndex={0}
        />
      </tbody></table>
    );
    expect(container.querySelector('tr')).toBeTruthy();
  });

  it('displays total for the end', () => {
    const { container } = render(
      <table><tbody>
        <AssessmentArrowTableRow
          end={['10', '10', '10']}
          endIndex={0}
          roundIndex={0}
        />
      </tbody></table>
    );
    expect(container.textContent).toContain('30');
  });

  it('renders delete button when deleteEnd is provided', () => {
    const { container } = render(
      <table><tbody>
        <AssessmentArrowTableRow
          end={['X', '10']}
          endIndex={0}
          roundIndex={0}
          deleteEnd={vi.fn()}
        />
      </tbody></table>
    );
    expect(container.querySelector('button')).toBeTruthy();
  });

  it('renders no delete button when deleteEnd is not provided', () => {
    const { container } = render(
      <table><tbody>
        <AssessmentArrowTableRow
          end={['X', '10']}
          endIndex={0}
          roundIndex={0}
        />
      </tbody></table>
    );
    expect(container.querySelector('button')).toBeNull();
  });
});
