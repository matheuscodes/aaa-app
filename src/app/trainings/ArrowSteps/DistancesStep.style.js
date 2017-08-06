import { Style } from 'global/StyleProvider';

export default class DistancesStepStyle extends Style {

  get columns() {
    return this.styleProvider.select({
      phone: 2,
      desktop: 1,
    })
  }
}
