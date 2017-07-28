import { Style } from 'global/StyleProvider';

export default class WeatherSelectorStyle extends Style {

    get labelHeight() {
      return this.baseLineHeight;
    }

    get listHeight() {
      return this.baseLineHeight * 2;
    }

}
