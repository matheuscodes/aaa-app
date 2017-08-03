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
      width: `35px`,
      height: `35px`,
      fill: '#FFF',
      margin: `20px 0 0 0`
    }
  }

  get copyright() {
    return {
      div: {
        width:'100%',
        float:'left'
      },
      span: {
        lineHeight: `${1.5 * this.baseLineHeight}px`,
        color: MUI.palette.accent3Color,
        fontSize: `${0.8 * this.baseFontsize}px`,
        margin: `${0.5 * this.defaultPadding}px`,
      },
    }
  }

  get footer() {
    return {
      width: '100%',
      height: this.styleProvider.select({
        phone: '200px',
        desktop: '100px',
      }),
      backgroundColor: MUI.palette.darkAccent3Color,
    }
  }

  get DropDownMenu() {
    return {
      labelStyle:{
        color: MUI.palette.alternateTextColor,
      },
      float: 'right',
    }
  }

  get FlatButton(){
    return {
      margin: `10px`,
      maxWidth: this.styleProvider.select({
        phone: '100%',
        desktop: 'calc(50% - 20px)',
      }),
      minWidth: this.styleProvider.select({
        phone: '100%',
      }),
      labelStyle: {
        fontSize: '12px',
        padding: '6px',
      },
    }
  }

  get divLanguages(){
    return {
      float: 'left',
      maxWidth: this.styleProvider.select({
        phone: '50%',
        desktop: '30%',
      }),
      minWidth: this.styleProvider.select({
        phone: '50%',
        desktop: '30%',
      }),
    }
  }

  get divButtons(){
    return {
      float: 'left',
      maxWidth: this.styleProvider.select({
        phone: '50%',
        desktop: '70%',
      }),
      minWidth: this.styleProvider.select({
        phone: '50%',
        desktop: '70%',
      }),
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
        <div style={this.style.divButtons}>
          <MUI.FlatButton
            style={this.style.FlatButton}
            labelStyle={this.style.FlatButton.labelStyle}
            label={t('common:footlinks.about')}
            primary={true}
            onTouchTap={this.openAbout} />
          <MUI.FlatButton
            style={this.style.FlatButton}
            labelStyle={this.style.FlatButton.labelStyle}
            label={t('common:footlinks.impressum')}
            primary={true}
            onTouchTap={this.openTerms} />
        </div>
        <div style={this.style.divLanguages}>
          <MUI.DropDownMenu
            style={this.style.DropDownMenu}
            labelStyle={this.style.DropDownMenu.labelStyle}
            onChange={this.changeLanguage}
            value={this.state.language} >
            {languageNodes}
          </MUI.DropDownMenu>
          <LanguageIcon style={this.style.languageIcon} />
        </div>
        <div style={this.style.copyright.div}>
          <span style={this.style.copyright.span}>
            Matheus Borges Teixeira &copy; 2016 - Version 1.5.0
          </span>
        </div>
      </footer>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['common'], Footer);
