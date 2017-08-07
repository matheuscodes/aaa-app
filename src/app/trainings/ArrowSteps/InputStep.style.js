import { Style } from 'global/StyleProvider';

export default class InputStepStyle extends Style {

  get typeColumns() {
    return this.styleProvider.select({
      phone: 2,
      desktop: 1,
    })
  }

  get distanceColumns() {
    return this.styleProvider.select({
      desktop: 1,
    })
  }

  get h5() {
    return {
      margin: 0,
    }
  }

}
