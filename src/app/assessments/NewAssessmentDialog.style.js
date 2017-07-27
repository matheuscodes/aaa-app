import { Style } from 'global/StyleProvider';

export default class NewAssessmentDialogStyle extends Style {

  get contentStyle() {
    return {
      width: this.styleProvider.select({
        phone: this.styleProvider.percent(90),
        tablet: this.styleProvider.percent(80),
        desktop: this.styleProvider.percent(60),
      }),
      maxWidth: this.styleProvider.select({
        phone: this.styleProvider.percent(90),
        tablet: this.styleProvider.percent(80),
        desktop: this.styleProvider.percent(60),
      }),
    }
  }

  get stepLabel() {
    return {
      fontSize: this.baseFontsize,
      height: this.styleProvider.select({
        phone: 2 * this.baseLineHeight,
        desktop: 3 * this.baseLineHeight,
      }),
      iconContainerStyle: {
        transform: `scale(${this.baseLineHeight / 24 /*step button width*/})`,
      },
      p: {
        paddingLeft: `${this.baseLineHeight / 2}px`,
      }
    }
  }

  get BaseStep() {
    return {
      width: '100%',
      cellHeight: 'auto',
      SeasonsMenu: {
        width: '100%',
      },
      EventsMenu: {
        width: '100%',
      },
      TargetsMenu: {
        width: '100%',
      },
      TextField: this.TextField,
      DatePicker: this.DatePicker,
    }
  }

  get contentDivStyle() {
    return {
      margin: `${this.baseLineHeight / 2}px`,
      width: `calc(100% - ${this.baseLineHeight / 2}px)`,
    }
  }
}
