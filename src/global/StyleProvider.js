import React from 'react';
import MobileDetect from 'mobile-detect';
import TextFieldStyle from 'components/TextField.style';
import SelectFieldStyle from 'components/SelectField.style';
import StepperStyle from 'components/Stepper.style';

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
        } else {
          this.device = 'phone';
        }
      } else {
        this.device = 'desktop';
      }
    } else {
      this.device = 'desktop';
    }

    this.getPolyfills();
  }

  getPolyfills(){
    //Intl
    if(this.detected.is('Safari') ||
       (this.detected.ua && this.detected.ua.match('Mac OS'))){
       require('intl');
       require('intl/locale-data/jsonp/en.js');
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
      case 'phone': return typeof phone !== 'undefined' ? phone : desktop;
      case 'tablet': return typeof tablet !== 'undefined' ? tablet : desktop;
      case 'desktop': return desktop;
      default: return desktop;
    }
  }

}


export class Style {

  get defaultPadding() {
    return this.styleProvider.percent(1);
  }

  get defaultMargin() {
    return this.styleProvider.percent(1);
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


  get h3() {
    return {
      fontSize: `${this.baseFontsize * 1.1}px`,
      padding: `${this.baseFontsize * 1.1}px`,
      lineHeight: `${this.baseLineHeight * 1.1}px`,
    }
  }

  get TextField() {
    return TextFieldStyle(this);
  }

  get SelectField() {
    return SelectFieldStyle(this);
  }

  get Stepper() {
    return StepperStyle(this);
  }

  constructor(styleProvider){
    this.styleProvider = styleProvider;
  }

  overwrite(object){
    const clone = Object.create(Object.getPrototypeOf(this));

    Object.getOwnPropertyNames(this).forEach((key) => {
        const desc = Object.getOwnPropertyDescriptor(this, key);
        Object.defineProperty(clone, key, desc);
    });

    Object.getOwnPropertyNames(object).forEach((key) => {
        const desc = Object.getOwnPropertyDescriptor(object, key);
        Object.defineProperty(clone, key, desc);
    });

    return clone;
  }

}
