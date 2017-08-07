import { Style } from 'global/StyleProvider';

export default class NeurobicsStepStyle extends Style {

  get img() {
    return {
      width: '100%',
      maxWidth: this.styleProvider.select({
        phone: '100%',
        desktop: '500px',
      }),
    };
  }
}
