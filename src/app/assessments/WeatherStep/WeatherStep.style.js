import { Style } from 'global/StyleProvider';

export default class WeatherStepStyle extends Style {

  get Thermometer() {
    return {
      height: this.baseLineHeight * 3 / 2,
      padding: `${this.baseLineHeight  * 3 / 2 }px ${this.baseLineHeight / 4}px`,
      float:'right',
    }
  }

  get Windmills() {
    return {
      height: this.baseLineHeight * 3,
      width: this.baseLineHeight * 4 / 3,
      float:'right',
    }
  }

  get ArcherAnchored() {
    return {
      height: this.baseLineHeight * 3,
      width: this.baseLineHeight * 4 / 3,
      float:'right',
    }
  }
}
