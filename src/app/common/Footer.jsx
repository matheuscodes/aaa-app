const React = require('react');

const MUI = require('app/common/MaterialUI');
const i18nextReact = require('global/i18nextReact');

const LanguageIcon = require('svg/icon/Languages');

const languages = require('constants/Languages');

/* Styles used in the footer*/
var footerStyle = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  backgroundColor: MUI.palette.darkAccent3Color
};

var copyrightStyle = {
  display: 'inline-block',
  lineHeight: '40pt',
  color: MUI.palette.accent3Color,
  fontSize: '80%',
  padding: '4pt'
};

var linkListStyle = {
  display: 'inline-block'
};

var linkStyle = {
  display: 'inline-block',
  lineHeight: '40pt',
  color: MUI.palette.alternateTextColor,
  fontSize: '90%',
  padding: '4pt'
};

var iconStyle = {
  float: 'right',
  display: 'inline-block',
  lineHeight: '48pt',
  width: '24pt',
  height: '24pt',
  fill: '#FFF',
  margin: '20px 0 0 0'
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
    t: React.PropTypes.func
  },
  render: function() {
    var t = this.props.t;
    return (
      <footer style={footerStyle}>
        <div style={copyrightStyle}>
          Matheus Borges Teixeira &copy; 2016
        </div>
        <div style={linkListStyle}>
          <a style={linkStyle} href="#">
            {t('common:footlinks.about')}
          </a>
          <a style={linkStyle} href="#">
            {t('common:footlinks.impressum')}
          </a>
          <a style={linkStyle} href="#">
            {t('common:footlinks.privacyAndTerms')}
          </a>
        </div>
        <MUI.DropDownMenu
          labelStyle={{color: MUI.palette.alternateTextColor}}
          style={{float: 'right'}}
          value={'en'} >
          {languageNodes}
        </MUI.DropDownMenu>
        <LanguageIcon style={iconStyle} />
      </footer>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['common'], Footer);
