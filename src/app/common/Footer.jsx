var React = require('react');
//var ReactMDL = require('react-mdl');

var LanguagesIcon = require('icons/Languages.jsx');

module.exports = React.createClass({
  render: function() {
    var languageNodes = this.props.languages.map(function(language) {
      return (
        <ReactMDL.MenuItem key={language.code}>
          <button className='mdl-button mdl-js-button mdl-button--icon aaa-languages'>
            {language.code}
          </button>
          {language.name}
        </ReactMDL.MenuItem>
      );
    });
    return (
      <ReactMDL.Footer size='mini'>
          <ReactMDL.FooterSection type='left' logo='Matheus Borges Teixeira &copy; 2015'>
              <ReactMDL.FooterLinkList>
                <a href='coisa'>Text[help]</a>
                <a href='#'>Privacy & Terms</a>
              </ReactMDL.FooterLinkList>
          </ReactMDL.FooterSection>
          {/*<div className='mdl-layout-spacer'></div>
          <div>
              <button id='aaa-languages' className='mdl-button mdl-js-button mdl-button--icon aaa-languages'>
                EN
              </button>
              <LanguagesIcon />
              <ReactMDL.Menu target="aaa-languages" valign="top" align="right">
                  {languageNodes}
              </ReactMDL.Menu>
          </div>*/}
      </ReactMDL.Footer>
    );
  }
});
