var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className='mdl-cell mdl-cell--middle mdl-cell--4-col'>
        <div id='login_box' className='mdl-card mdl-shadow--2dp'>
          <div className='mdl-card__title' style={{background: 'url(\"img/'+Math.floor(Math.random()*17)+'.jpg\") center / cover'}} >
          </div>
          <form onSubmit='LoginPage.doLogin();return false'>
            <div className='mdl-card__supporting-text'>
              <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label aaa-login'>
                <input className='mdl-textfield__input' type='text' pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' id='email' />
                <label className='mdl-textfield__label' htmlFor='email'>Text['email']</label>
                <span className='mdl-textfield__error'>"+Text['email_error']+"</span>
              </div>
              <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label aaa-login'>
                <input className='mdl-textfield__input' type='password' id='password' />
                <label className='mdl-textfield__label' htmlFor='password'>Text['password']</label>
              </div>
            </div>
            <div className='mdl-card__actions mdl-card--border'>
              <a id='aaa_sign_up' className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effec'>
                <i className='material-icons'>person_add</i>
              </a>
              <div className='mdl-tooltip' htmlFor='aaa_sign_up'>Text['sign_up']</div>
              <button type='submit' id='login' className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effec'>
                Text['login']<i className='material-icons'>chevron_right</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
});
