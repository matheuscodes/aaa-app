import { Style } from 'global/StyleProvider';
import valueConverter from 'global/ValueConverter';

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
    const mainRaisedButton = new RaisedButtonStyle(this.overwrite({
      get baseFontsize() {
        return this.styleProvider.select({
          phone: oldBaseFontsize * 0.55,
          tablet: oldBaseFontsize * 0.7,
          desktop: oldBaseFontsize * 0.8,
        });
      }
    }));

    const arrowWidth = this.styleProvider.select({
      phone: this.styleProvider.percent(9),
      tablet: this.styleProvider.percent(6),
      desktop: this.styleProvider.percent(3),
    });

    const buttonWidth = this.styleProvider.select({
      phone: this.styleProvider.percent(17.5),
      desktop: this.styleProvider.percent(5),
    });

    const arrowButton = new RaisedButtonStyle(this);

    arrowButton.maxWidth = buttonWidth;
    arrowButton.minWidth = buttonWidth;
    arrowButton.margin = `${buttonWidth * 0.05}px`;

    return {
      RaisedButton: this.RaisedButton,
      mainButton: {
        RaisedButton: mainRaisedButton,
      },
      arrowButton: {
        RaisedButton: arrowButton,
      },
      arrow: {
        width: arrowWidth,
      },
      arrowRow: {
        display: 'block',
        textAlign: 'center',
        minWidth: arrowWidth * 6,
      },
      Dialog: {
        actionsContainerStyle: {
          textAlign: 'center',
        },
        contentStyle: {
          maxWidth: arrowWidth * 6 > buttonWidth * 4 ?
                    arrowWidth * 6 :  buttonWidth * 5,
          width: arrowWidth * 6 > buttonWidth * 4 ?
                 arrowWidth * 6 :  buttonWidth * 5,
        },
      },
    }
  }

  get NewAssessmentRound() {
    const oldBaseFontsize = this.baseFontsize;
    const mainRaisedButton = new RaisedButtonStyle(this.overwrite({
      get baseFontsize() {
        return this.styleProvider.select({
          phone: oldBaseFontsize * 0.55,
          tablet: oldBaseFontsize * 0.7,
          desktop: oldBaseFontsize * 0.8,
        });
      }
    }));

    return {
      mainButton: {
        RaisedButton: mainRaisedButton,
      }
    }
  }
}
