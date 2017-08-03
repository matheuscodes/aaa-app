import { Style } from 'global/StyleProvider';

export default class LoginPageStyle extends Style {
  get card() {
    return {
      padding: this.styleProvider.select({
        phone: `${this.defaultPadding}`,
        tablet: `${this.defaultPadding} ${this.styleProvider.percent(15)}`,
        desktop: `${this.defaultPadding} ${this.styleProvider.percent(30)}`,
      }),
    }
  }

  get logo() {
    return {
      height: this.styleProvider.select({
        phone: this.styleProvider.percent(20),
        tablet: this.styleProvider.percent(14),
        desktop: this.styleProvider.percent(8),
      }),
      width: '100%',
      padding: '12px',
    }
  }
}
