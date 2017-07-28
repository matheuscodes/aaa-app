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

}
