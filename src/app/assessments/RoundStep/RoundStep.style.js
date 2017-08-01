import { Style } from 'global/StyleProvider';
import valueConverter from 'global/ValueConverter';

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

    const arrowWidth = this.styleProvider.select({
      phone: this.styleProvider.percent(9),
      tablet: this.styleProvider.percent(6),
      desktop: this.styleProvider.percent(3),
    });

    const buttonWidth = this.styleProvider.select({
      phone: this.styleProvider.percent(17.5),
      desktop: this.styleProvider.percent(5),
    });

    return {
      h3: this.h3,
      arrowButton: {
        maxWidth: buttonWidth,
        minWidth: buttonWidth,
        margin: `${buttonWidth * 0.04}px`,
      },
      actionButton: {
        margin: `${buttonWidth * 0.04}px`,
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

    return {
      TextField: this.TextField,
      h3: this.h3,
      Dialog: {
        actionsContainerStyle: {
          textAlign: 'center',
        },
        contentStyle: {
          maxWidth: this.styleProvider.select({
            phone: this.styleProvider.percent(80),
            tablet: this.styleProvider.percent(40),
            desktop: this.styleProvider.percent(30),
          }),
          width: this.styleProvider.select({
            phone: this.styleProvider.percent(80),
            tablet: this.styleProvider.percent(40),
            desktop: this.styleProvider.percent(30),
          }),
        },
      },
    }
  }
}
