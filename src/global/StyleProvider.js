import MobileDetect from 'mobile-detect';
import TextFieldStyle from 'components/TextField.style';

export class StyleProvider {

  /**
    Fallback values for server rendering
    https://mydevice.io/devices/
    https://www.w3schools.com/browsers/browsers_display.asp
  */

  static get phoneWidth() {
    return 480;
  }

  static get tabletWidth() {
    return 800;
  }


  static get desktopWidth() {
    return 1200;
  }

  constructor(agent) {
    this.detected = new MobileDetect(agent);
    const deviceOS = this.detected.os();
    if(deviceOS && deviceOS.match('iOS|AndroidOS')){
      const mobile = this.detected.mobile();
      if(mobile){
        if(mobile.match('Tablet|iPad')){
          this.device = 'tablet';
        } else if(mobile.match('Phone|Mobile')) {
          this.device = 'phone';
        }
      } else {
        this.device = 'desktop';
      }
    } else {
      this.device = 'desktop';
    }
  }

  loadScreenSizes() {
    const body = document.getElementsByTagName('body')[0];
    this.width = parseInt(body.offsetWidth);
    if(this.device === 'desktop') {
      if(this.width < StyleProvider.tabletWidth &&
         this.width > StyleProvider.phoneWidth) {
        this.device = 'tablet';
      } else if(this.width < StyleProvider.phoneWidth) {
        this.device = 'phone';
      }
    }
    this.loaded = true;
  }

  percent(value) {
    if(this.width){
      return (value / 100) * this.width;
    } else {
      switch(this.device){
        case 'phone': return (value / 100) * StyleProvider.phoneWidth;
        case 'tablet': return (value / 100) * StyleProvider.tabletWidth;
        case 'desktop': return (value / 100) * StyleProvider.desktopWidth;
        default: return (value / 100) * StyleProvider.desktopWidth;
      }
    }
  }

  select({phone, tablet, desktop}) {
    switch(this.device) {
      case 'phone': return phone ? phone : desktop;
      case 'tablet': return tablet ? tablet : desktop;
      case 'desktop': return desktop;
      default: return desktop;
    }
  }

}


export class Style {

  get defaultPadding() {
    return this.styleProvider.percent(2);
  }

  get baseFontsize() {
    return this.styleProvider.select({
      phone: this.styleProvider.percent(4.5),
      tablet: this.styleProvider.percent(3),
      desktop: this.styleProvider.percent(1.2),
    });
  }

  get baseLineHeight() {
    return  1.5 * this.baseFontsize;
  }

  get TextField() {
    return TextFieldStyle(this);
  }

  constructor(styleProvider){
    this.styleProvider = styleProvider;
  }

}
