import { Style } from 'global/StyleProvider';

export default class BaseStepStyle extends Style {

  constructor(styleProvider) {
    super(styleProvider);

    this.cellHeight = 'auto';

    this.width = '100%';

    this.SeasonsMenu = {
      width: '100%',
    }

    this.EventsMenu = {
      width: '100%',
    }

    this.TargetsMenu = {
      width: '100%',
    }
  }
}
