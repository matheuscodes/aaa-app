import { Style } from 'global/StyleProvider';

export default class DistancesStepStyle extends Style {

  get columns() {
    return this.styleProvider.select({
      phone: 2,
      desktop: 1,
    })
  }

  get distanceTextField() {
    return {
      width: '100%'
    }
  }

  get distanceAddButton() {
    return {
      height: 36,
      width: 36,
    }
  }
}
