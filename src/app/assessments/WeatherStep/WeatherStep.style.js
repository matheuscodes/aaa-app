import { Style } from 'global/StyleProvider';

export default class WeatherStepStyle extends Style {

  get Thermometer() {
    return {
      width: this.baseLineHeight * 0.4,
      paddingTop: `${this.baseLineHeight * 1.5}px`,
      float:'right',
    }
  }

  get Windmills() {
    return {
      width: this.baseLineHeight * 1.2,
      float:'right',
    }
  }

  get ArcherAnchored() {
    return {
      width: this.baseLineHeight * 1.2,
      float:'right',
    }
  }
}
