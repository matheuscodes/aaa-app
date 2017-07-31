import { Style } from 'global/StyleProvider';

import RaisedButtonStyle from 'components/RaisedButton.style';

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

  get actionButton() {
    const oldBaseFontsize = this.baseFontsize;

    return {
      RaisedButton: new RaisedButtonStyle(this.overwrite({
        get baseFontsize() {
          return this.styleProvider.select({
            phone: oldBaseFontsize * 0.58,
            tablet: oldBaseFontsize * 0.75,
            desktop: oldBaseFontsize * 0.85,
          });
        }
      })),
    }
  }

}
