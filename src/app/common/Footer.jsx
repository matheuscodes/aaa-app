var React = require('react');
var LanguagesIcon = require('icons/Languages.jsx');

module.exports = React.createClass({
  render: function() {
    var languageNodes = this.props.languages.map(function(language) {
      return (
        <li key={language.code} className='mdl-menu__item' onClick={'Application.swapLanguage(' + language.code + ')'} >
          <button className='mdl-button mdl-js-button mdl-button--icon aaa-languages'>
            {language.code}
          </button>
          {language.name}
        </li>
      );
    });
    return (
      <footer className='mdl-mini-footer'>
        <div className='mdl-mini-footer__left-section'>
          <div className='mdl-logo'>Matheus Borges Teixeira &copy; 2015</div>
          <ul className='mdl-mini-footer__link-list'>
            <li><a href='coisa'>Text[help]</a></li>
            <li><a href='#'>Privacy & Terms</a></li>
          </ul>
        </div>
        <div className='mdl-layout-spacer'></div>
        <button id='aaa_languages' className='mdl-button mdl-js-button mdl-button--icon aaa-languages'>
          EN
        </button>
        <LanguagesIcon />
        <ul className='mdl-menu mdl-menu--top-right mdl-js-menu mdl-js-ripple-effect' htmlFor='aaa_languages'>
          {languageNodes}
        </ul>
      </footer>
    );
  }
});
