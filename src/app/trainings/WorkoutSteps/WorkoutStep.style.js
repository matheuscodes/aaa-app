import { Style } from 'global/StyleProvider';

export default class WorkoutStepStyle extends Style {

  get img() {
    return {
      width: '100%',
      maxWidth: this.styleProvider.select({
        phone: `${this.styleProvider.percent(50)}px`,
        desktop: '250px',
      }),
    };
  }
}
