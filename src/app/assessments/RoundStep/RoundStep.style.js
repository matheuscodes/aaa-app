import { Style } from 'global/StyleProvider';
import RaisedButtonStyle from 'components/RaisedButton.style';

export default class RoundStepStyle extends Style {

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

  get NewAssessmentEnd() {
    const oldBaseFontsize = this.baseFontsize;
    const mainRaisedButton = JSON.parse(JSON.stringify(
      new RaisedButtonStyle(this.overwrite({
        get baseFontsize() {
          return this.styleProvider.select({
            phone: oldBaseFontsize * 0.55,
            tablet: oldBaseFontsize * 0.7,
            desktop: oldBaseFontsize * 0.8,
          });
        }
      }))
    ));

    return {
      mainButton: {
        RaisedButton: mainRaisedButton,
      },
      arrow: {
        width: this.styleProvider.select({
          phone: this.baseFontsize * 0.55,
          tablet: oldBaseFontsize * 0.7,
          desktop: oldBaseFontsize * 0.8,
        })
      },
    }
  }

  get NewAssessmentRound() {
    const oldBaseFontsize = this.baseFontsize;
    const mainRaisedButton = JSON.parse(JSON.stringify(
      new RaisedButtonStyle(this.overwrite({
        get baseFontsize() {
          return this.styleProvider.select({
            phone: oldBaseFontsize * 0.55,
            tablet: oldBaseFontsize * 0.7,
            desktop: oldBaseFontsize * 0.8,
          });
        }
      }))
    ));

    return {
      mainButton: {
        RaisedButton: mainRaisedButton,
      }
    }
  }
}
