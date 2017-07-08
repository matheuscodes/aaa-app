const React = require('react');

const MUI = require('app/common/MaterialUI');
const i18nextReact = require('global/i18nextReact');
const LogoName = require('svg/LogoName');

const BaseLayout = require('app/common/BaseLayout');
const LoginCard = require('app/login/LoginCard');
const PageSwitcher = require('app/common/PageSwitcher');

import { Style } from 'global/StyleProvider';

class LoginPageStyle extends Style {
  get cardPadding() {
    return this.styleProvider.select({
      phone: `${this.defaultPadding}`,
      tablet: `${this.defaultPadding} ${this.styleProvider.percent(15)}`,
      desktop: `${this.defaultPadding} ${this.styleProvider.percent(30)}`,
    });
  }
}

const LoginPage = React.createClass({
  propTypes: {
    switcher: React.PropTypes.instanceOf(PageSwitcher),
    userAgent: React.PropTypes.string,
    t: React.PropTypes.func
  },
  getInitialState: function() {
    this.style = new LoginPageStyle(this.props.styleProvider);
    return {};
  },
  render: function() {
    const t = this.props.t;
    console.log(this.props.styleProvider);
    console.log(this.style.cardPadding);
    return (
      <BaseLayout
        switcher={this.props.switcher}
        layoutName="loginPage"
        userAgent={this.props.userAgent}
        styleProvider={this.props.styleProvider}
        title={t('login:appBarTitle')} >
        <div style={{padding:12}}>
          <LogoName width={'100%'} height={96} />
        </div>
        <div style={{padding:this.style.cardPadding}}>
          <LoginCard
            switcher={this.props.switcher}
            styleProvider={this.props.styleProvider} />
        </div>
      </BaseLayout>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['login'], LoginPage);
