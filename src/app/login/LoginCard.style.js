import { Style } from 'global/StyleProvider';

export default class LoginCardStyle extends Style {
  get cardWidth() {
    return this.styleProvider.select({
      phone: this.styleProvider.percent(100),
      tablet: this.styleProvider.percent(50),
      desktop: this.styleProvider.percent(100/3),
    });
  }

  get loginButton() {
    return {
      width: '100%',
      fontSize: `${this.baseFontsize * 1.1}px`,
      lineHeight: `${this.baseLineHeight * 1.5}px`,
      height: `${this.baseLineHeight * 1.5}px`,
    }
  }

  get loginIcon() {
    return {
      height: `${this.baseLineHeight * 1.5}px`,
      width: `${this.baseLineHeight * 1.5}px`,
    }
  }

  get loginButtonContainer() {
    return {
      margin: 0,
      padding: `${0.1 * this.defaultPadding}px 0`,
    }
  }

  archeryImage(background) {
    return {
      height:`${6 * this.baseLineHeight}px`,
      width: '100%',
      background,
    }
  }

  get CardTitle() {
    return {
      height: `${this.baseLineHeight}px`,
      titleStyle: {
        fontSize: `${0.75 * this.baseFontsize}px`,
        lineHeight: `${0.75 * this.baseLineHeight}px`,
      },
      subtitleStyle: {
        fontSize: `${0.5 * this.baseFontsize}px`,
        lineHeight: `${0.5 * this.baseLineHeight}px`,
      },
    }
  }
}
