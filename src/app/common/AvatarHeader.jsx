var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <header id='aaa_sidebar_header' className='aaa-drawer-header mdl-layout__header'>
        <div id='aaa_sidebar_header_avatar'></div>
        <div id='aaa_sidebar_header_dropdown' className='aaa-options-dropdown'>
          <span id='aaa_sidebar_header_email'></span>
          <div className='mdl-layout-spacer'></div>
          <button id='aaa_sidebar_user_options' className='mdl-button mdl-js-button mdl-button--icon'>
            <i className='material-icons'>arrow_drop_down</i>
          </button>
          <div className='mdl-tooltip' htmlFor='aaa_sidebar_user_options'>Text['options']</div>
          <ul className='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect' htmlFor='aaa_sidebar_user_options'>
            <li className='mdl-menu__item'><i className='material-icons'>settings</i>Text['settings']</li>
            <li onClick='LoginPage.doLogout()' className='mdl-menu__item'><i className='material-icons'>exit_to_app</i> Text['logout']</li>
          </ul>
        </div>
      </header>
    );
  }
});
