var React = require('react');
var AvatarHeader = require('./AvatarHeader.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div id='aaa_drawer' className='mdl-layout__drawer'>
        <AvatarHeader />
        <nav className='mdl-navigation'>
          <a className='mdl-navigation__link mdl-color-text--primary-dark' onClick='HomePage.buildHomePage();'><i className='material-icons'>home</i>Text['home']</a>
          <a className='mdl-navigation__link mdl-color-text--primary-dark' onClick='ProfilePage.buildProfilePage();'><i className='material-icons'>assignment_ind</i>Text['manage_profile']</a>
          <a className='mdl-navigation__link mdl-color-text--primary-dark' onClick='TrainingsPage.buildTrainingsPage();'><i className='material-icons'>create</i>Text['manage_trainings']</a>
          <a className='mdl-navigation__link mdl-color-text--primary-dark' onClick='PerformancePage.buildPerformancePage();'><i className='material-icons'>history</i>Text['performance_history']</a>
          <a className='mdl-navigation__link mdl-color-text--primary-dark' onClick=''><i className='material-icons'>help_outline</i>Text['help']</a>
        </nav>
      </div>
    );
  }
});
