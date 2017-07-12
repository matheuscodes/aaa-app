const React = require('react');

const MUI = require('app/common/MaterialUI');
const i18nextReact = require('global/i18nextReact');

const LanguageIcon = require('svg/icon/Languages');

const languages = require('constants/Languages');

const ReactPageSwitcherType = require('global/ReactPageSwitcherType');

import { Style } from 'global/StyleProvider';

class FooterStyle extends Style {
  get languageIcon() {
    return {
      float:'right',
      lineHeight: `${1.2 * this.baseLineHeight}px`,
      width: `${1.2 * this.baseLineHeight}px`,
      height: `${1.2 * this.baseLineHeight}px`,
      fill: '#FFF',
      margin: `${0.8 * this.defaultPadding}px 0 0 0`
    }
  }

  get copyrightString() {
    return {
      lineHeight: `${1.5 * this.baseLineHeight}px`,
      color: MUI.palette.accent3Color,
      fontSize: `${0.8 * this.baseFontsize}px`,
      margin: `${0.5 * this.defaultPadding}px`,
    }
  }

  get footer() {
    return {
      width: '100%',
      height: `${3 * this.baseLineHeight + 2 * 0.5 * this.defaultPadding}px`,
      backgroundColor: MUI.palette.darkAccent3Color,
    }
  }

  get DropDownMenu() {
    return {
      labelStyle:{
        color: MUI.palette.alternateTextColor,
        fontSize: `${this.baseFontsize}px`,
        lineHeight: `${this.baseLineHeight}px`,
        height: `${this.baseLineHeight}px`,
      },
      style: {
        float: 'right',
        margin: `${0.8 * this.defaultPadding}px 0 0 0`,
        fontSize: `${this.baseFontsize}px`,
        lineHeight: `${this.baseLineHeight}px`,
        height: `${this.baseLineHeight}px`,
      },
      menuItemStyle: {
        fontSize: `${this.baseFontsize}px`,
        lineHeight: `${this.baseLineHeight}px`,
        height: `${this.baseLineHeight}px`,
      },
      iconStyle: {
        fontSize: `${this.baseFontsize}px`,
        lineHeight: `${this.baseLineHeight}px`,
        height: `${this.baseLineHeight}px`,
        width: `${this.baseLineHeight}px`,
        right: `${this.baseLineHeight}px`,
        top: 0,
        padding: 0,
      },
    }
  }

  get FlatButton(){
    return {
      margin: `${0.25  * this.defaultPadding}px`,
      height: `${1.1 * this.baseLineHeight}px`,
      lineHeight: `${1.1 * this.baseLineHeight}px`,
      fontSize: `${0.75 * this.baseFontsize}px`,
    }
  }
}


/**
 * Footer with language selection.
 * @author Matheus
 * @since 1.0.0
 */
var languageNodes = languages.map(function(language) {
  return (
    <MUI.MenuItem
      value={language.code}
      key={language.code}
      primaryText={language.name} />
  );
});

var Footer = React.createClass({
  propTypes: {
    switcher: ReactPageSwitcherType.isRequired,
    t: React.PropTypes.func
  },
  getInitialState: function(){
    this.style = new FooterStyle(this.props.styleProvider);
    return {language:this.props.i18n.language}
  },
  changeLanguage: function(event, index, value){
    this.props.i18n.changeLanguage(value);
    this.setState({language:this.props.i18n.language});
  },
  openTerms: function(event, index, value){
  this.props.switcher.switchTo('termsPage');
  },
  openAbout: function(event, index, value){
  this.props.switcher.switchTo('aboutPage');
  },
  render: function() {
    var t = this.props.t;
    return (
      <footer style={this.style.footer}>
        <div>
          <MUI.FlatButton
            style={this.style.FlatButton}
            labelStyle={this.style.FlatButton}
            label={t('common:footlinks.about')}
            primary={true}
            onTouchTap={this.openAbout} />
          <MUI.FlatButton
            style={this.style.FlatButton}
            labelStyle={this.style.FlatButton}
            label={t('common:footlinks.impressum')}
            primary={true}
            onTouchTap={this.openTerms} />
          <MUI.DropDownMenu
            style={this.style.DropDownMenu.style}
            labelStyle={this.style.DropDownMenu.labelStyle}
            menuItemStyle={this.style.DropDownMenu.menuItemStyle}
            iconStyle={this.style.DropDownMenu.iconStyle}
            onChange={this.changeLanguage}
            value={this.state.language} >
            {languageNodes}
          </MUI.DropDownMenu>
          <LanguageIcon style={this.style.languageIcon} />
        </div>
        <div>
          <span style={this.style.copyrightString}>
            Matheus Borges Teixeira &copy; 2016
          </span>
        </div>
      </footer>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['common'], Footer);
