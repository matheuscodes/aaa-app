const React = require('react');

const MUI = require('app/common/MaterialUI');
const i18nextReact = require('global/i18nextReact');

const LanguageIcon = require('svg/icon/Languages');

const languages = require('constants/Languages');

const ReactPageSwitcherType = require('global/ReactPageSwitcherType');

/* Styles used in the footer*/
var footerStyle = {
  width: '100%',
  backgroundColor: MUI.palette.darkAccent3Color
};

var copyrightStyle = {
  lineHeight: '48pt',
  color: MUI.palette.accent3Color,
  fontSize: '80%',
  padding: '4pt'
};

var linkListStyle = {
};

var iconStyle = {
  float:'right',
  lineHeight: 48,
  width: 24,
  height: 24,
  fill: '#FFF',
  margin: '20 0 0 0'
};

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
      <footer style={footerStyle}>
          <span style={copyrightStyle}>
            Matheus Borges Teixeira &copy; 2016
          </span>
          <MUI.FlatButton
            label={t('common:footlinks.about')}
            primary={true}
            onTouchTap={this.openAbout} />
          <MUI.FlatButton
            label={t('common:footlinks.impressum')}
            primary={true}
            onTouchTap={this.openTerms} />
        <MUI.DropDownMenu
          labelStyle={{color: MUI.palette.alternateTextColor}}
          style={{float: 'right'}}
          onChange={this.changeLanguage}
          value={this.state.language} >
          {languageNodes}
        </MUI.DropDownMenu>
        <LanguageIcon style={iconStyle} />
      </footer>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['common'], Footer);
