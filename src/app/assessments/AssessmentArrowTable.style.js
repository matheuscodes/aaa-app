import { Style } from 'global/StyleProvider';
import MUI from 'app/common/MaterialUI';

import FloatingActionButtonStyle from 'components/FloatingActionButton.style';

export default class AssessmentArrowTableStyle extends Style {

  get arrow() {
    return {
      width: this.styleProvider.select({
        phone: this.styleProvider.percent(9),
        tablet: this.styleProvider.percent(6),
        desktop: this.styleProvider.percent(3),
      }),
    }
  }

  get bottomSummary() {
    return {
      textAlign: 'right',
      color:MUI.palette.accent3Color,
    }
  }

  get table() {
    return {
      width: '100%',
    }
  }

  get rings() {
    return {
      display: 'block',
      textAlign: 'center',
      minWidth: this.arrow.width * 6,
    }
  }

  get total() {
    return {
      fontSize: this.styleProvider.select({
        phone: this.baseFontsize * 0.8,
        desktop: this.baseFontsize * 0.9,
      }),
      display: 'inline-block',
      padding: this.styleProvider.select({
        phone: this.baseFontsize * 0.8 / 2,
        desktop: this.baseFontsize * 0.9 / 2,
      }),
      verticalAlign: `middle`,
    }
  }

  get ringsHeader() {
    return {
      color: MUI.palette.accent3Color,
      textAlign: 'center',
      fontSize: `${this.baseFontsize}px`,
      minWidth: this.arrow.width * 6,
    }
  }

  get totalHeader() {
    return {
      color: MUI.palette.accent3Color,
      textAlign: 'left',
      fontSize: `${this.baseFontsize}px`,
    }
  }

  get deleteButton() {
    const oldBaseFontsize = this.baseFontsize;
    const overwrittenButton = JSON.parse(JSON.stringify(
      new FloatingActionButtonStyle(this.overwrite({
        get baseFontsize() {
          return this.styleProvider.select({
            phone: oldBaseFontsize * 0.8,
            desktop: oldBaseFontsize * 0.9,
          });
        }
      }))
    ));

    return {
      FloatingActionButton: overwrittenButton,
      icon:{
        width: this.styleProvider.select({
          phone: `${this.baseFontsize * 0.8}px`,
          desktop: `${this.baseFontsize * 0.9}px`,
        }),
        height: this.styleProvider.select({
          phone: `${this.baseFontsize * 0.8}px`,
          desktop: `${this.baseFontsize * 0.9}px`,
        }),
        padding: this.styleProvider.select({
          phone: `${this.baseFontsize * 0.8 / 2}px`,
          desktop: `${this.baseFontsize * 0.9 / 2}px`,
        }),
      }
    }
  }

}
