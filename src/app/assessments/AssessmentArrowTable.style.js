import { Style } from 'global/StyleProvider';
import MUI from 'app/common/MaterialUI';

export default class AssessmentArrowTableStyle extends Style {

  get arrow() {
    return {
      width: this.styleProvider.select({
        phone: this.styleProvider.percent(8),
        tablet: this.styleProvider.percent(5.5),
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
    const baseFontsize = this.styleProvider.select({
      phone: this.baseFontsize * 0.8,
      desktop: this.baseFontsize * 0.9,
    });

    return {
      width: `${baseFontsize * 2}px`,
      height: `${baseFontsize * 2}px`,
      verticalAlign: `middle`,
      minWidth: null,
      iconStyle: {
        width: `${baseFontsize * 2}px`,
        height: `${baseFontsize * 2}px`,
        minWidth: null,
      },
      icon:{
        width: `${baseFontsize}px`,
        height: `${baseFontsize}px`,
        padding: `${baseFontsize / 2}px`,
      }
    }
  }

}
