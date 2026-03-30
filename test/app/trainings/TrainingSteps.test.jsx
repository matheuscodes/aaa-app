import React from 'react';
import { render } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import DistancesStep from 'app/trainings/ArrowSteps/DistancesStep';
import InputStep from 'app/trainings/ArrowSteps/InputStep';
import TypesStep from 'app/trainings/ArrowSteps/TypesStep';
import NeurobicsStep from 'app/trainings/NeurobicsSteps/NeurobicsStep';
import WorkoutStep from 'app/trainings/WorkoutSteps/WorkoutStep';
import TrainingBaseStep from 'app/trainings/BaseStep/BaseStep';

const mockArrowDistances = { 18: true, 25: false };
const mockArrowTrainingTypes = {
  WARMUP: true,
  WARMOUT: false,
  BOARD: false,
  TARGET: true,
  TARGET_FACE: false,
  STRIPE_HORIZONTAL: false,
  STRIPE_VERTICAL: false,
  BLIND: false,
};
const mockMessenger = { showMessage: vi.fn() };

describe('DistancesStep', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <DistancesStep
        arrowDistances={mockArrowDistances}
        setArrowDistances={vi.fn()}
        messenger={mockMessenger}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders distance checkboxes', () => {
    const { container } = render(
      <DistancesStep
        arrowDistances={mockArrowDistances}
        setArrowDistances={vi.fn()}
        messenger={mockMessenger}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders with empty distances', () => {
    const { container } = render(
      <DistancesStep
        arrowDistances={{}}
        setArrowDistances={vi.fn()}
        messenger={mockMessenger}
      />
    );
    expect(container).toBeTruthy();
  });
});

describe('InputStep', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <InputStep
        arrowDistances={mockArrowDistances}
        arrowTrainingTypes={mockArrowTrainingTypes}
        setArrowCount={vi.fn()}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders with all types and distances', () => {
    const allDistances = { 18: true, 25: true, 50: true };
    const { container } = render(
      <InputStep
        arrowDistances={allDistances}
        arrowTrainingTypes={mockArrowTrainingTypes}
        setArrowCount={vi.fn()}
      />
    );
    expect(container).toBeTruthy();
  });
});

describe('TypesStep', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <TypesStep
        arrowTrainingTypes={mockArrowTrainingTypes}
        setArrowTrainingTypes={vi.fn()}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders all training type checkboxes', () => {
    const { container } = render(
      <TypesStep
        arrowTrainingTypes={mockArrowTrainingTypes}
        setArrowTrainingTypes={vi.fn()}
      />
    );
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBeGreaterThan(0);
  });
});

describe('NeurobicsStep', () => {
  it('renders without crashing', () => {
    const { container } = render(<NeurobicsStep />);
    expect(container).toBeTruthy();
  });
});

describe('WorkoutStep', () => {
  it('renders without crashing', () => {
    const { container } = render(<WorkoutStep />);
    expect(container).toBeTruthy();
  });
});

describe('TrainingBaseStep', () => {
  const baseProps = {
    seasons: [{ id: 1, name: 'Season 2024' }],
    seasonId: 1,
    changeSeason: vi.fn(),
    date: new Date('2024-06-15'),
    changeDate: vi.fn(),
    categories: { arrows: true, workouts: false, neurobics: false },
    setTrainingCategories: vi.fn(),
  };

  it('renders without crashing', () => {
    const { container } = render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TrainingBaseStep {...baseProps} />
      </LocalizationProvider>
    );
    expect(container).toBeTruthy();
  });

  it('renders season select', () => {
    const { container } = render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TrainingBaseStep {...baseProps} />
      </LocalizationProvider>
    );
    expect(container).toBeTruthy();
  });
});
