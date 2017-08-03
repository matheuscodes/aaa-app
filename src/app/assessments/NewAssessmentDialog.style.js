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

  get bodyStyle(){
    return { padding: '0px' }
  }

  get actionButton() {
    return {
      margin: '1%',
      maxWidth: '47%',
      minWidth: '47%',
    }
  }

  get uploadButton() {
    return {
      margin: '5%',
    }
  }

}
